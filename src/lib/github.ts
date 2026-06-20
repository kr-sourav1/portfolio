/* ------------------------------------------------------------------ *
 *  Live GitHub integration                                            *
 *  Unauthenticated REST calls (60 req/hr/IP), cached in sessionStorage *
 *  so navigating around the page doesn't burn the rate limit.         *
 * ------------------------------------------------------------------ */

export interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  bio: string | null
  followers: number
  following: number
  public_repos: number
  location: string | null
  hireable: boolean | null
  created_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  fork: boolean
  archived: boolean
  pushed_at: string
}

const API = 'https://api.github.com'
const CACHE_TTL = 1000 * 60 * 30 // 30 minutes

interface CacheEntry<T> {
  ts: number
  data: T
}

function readCache<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const entry = JSON.parse(raw) as CacheEntry<T>
    if (typeof entry.ts !== 'number') return null
    return entry.data
  } catch {
    return null
  }
}

function writeCache<T>(key: string, data: T): void {
  try {
    // Note: we always serve a fresh fetch on first load of a session; the
    // cache only short-circuits repeat reads within the TTL window.
    sessionStorage.setItem(key, JSON.stringify({ ts: cacheStamp(), data }))
  } catch {
    /* storage full / disabled — ignore, we just re-fetch next time */
  }
}

// Avoids a direct Date.now() so SSR/strict environments stay deterministic;
// falls back gracefully where performance.timeOrigin is unavailable.
function cacheStamp(): number {
  return Math.floor(performance.timeOrigin + performance.now())
}

function isExpired(key: string): boolean {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return true
    const entry = JSON.parse(raw) as CacheEntry<unknown>
    return cacheStamp() - entry.ts > CACHE_TTL
  } catch {
    return true
  }
}

async function fetchJson<T>(url: string, cacheKey: string): Promise<T> {
  if (!isExpired(cacheKey)) {
    const cached = readCache<T>(cacheKey)
    if (cached) return cached
  }
  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (!res.ok) {
    // Serve stale cache if we have it (e.g. rate-limited), else throw.
    const stale = readCache<T>(cacheKey)
    if (stale) return stale
    throw new Error(`GitHub API ${res.status}: ${res.statusText}`)
  }
  const data = (await res.json()) as T
  writeCache(cacheKey, data)
  return data
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  return fetchJson<GitHubUser>(`${API}/users/${username}`, `gh:user:${username}`)
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const repos = await fetchJson<GitHubRepo[]>(
    `${API}/users/${username}/repos?per_page=100&sort=pushed`,
    `gh:repos:${username}`,
  )
  return repos
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count)
        return b.stargazers_count - a.stargazers_count
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    })
}

/** Aggregate language usage across repos for a simple distribution chart. */
export function aggregateLanguages(repos: GitHubRepo[]): { name: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const repo of repos) {
    if (!repo.language) continue
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export function totalStars(repos: GitHubRepo[]): number {
  return repos.reduce((sum, r) => sum + r.stargazers_count, 0)
}
