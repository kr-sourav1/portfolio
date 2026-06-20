import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  GitFork,
  Github,
  Star,
  Calendar,
  Code2,
  Sparkles,
  FolderGit2,
  CircleDot,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { githubHiddenRepos, githubRepoBlurbs, profile } from '@/data/content'
import {
  aggregateLanguages,
  fetchGitHubRepos,
  fetchGitHubUser,
  type GitHubRepo,
  type GitHubUser,
} from '@/lib/github'
import { cn, formatCompact } from '@/lib/utils'

const LANG_COLORS: Record<string, string> = {
  Java: '#b07219',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  'Jupyter Notebook': '#DA5B0B',
}

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; user: GitHubUser; repos: GitHubRepo[] }

export function GitHubSection() {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    Promise.all([
      fetchGitHubUser(profile.githubUsername),
      fetchGitHubRepos(profile.githubUsername),
    ])
      .then(([user, repos]) => {
        if (!cancelled) setState({ status: 'ready', user, repos })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' })
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Section
      id="github"
      eyebrow="Open Source"
      title="Building in the open"
      description="Live from my GitHub — recent repositories, languages, and activity, fetched in real time."
      className="bg-surface-muted/30"
    >
      {state.status === 'loading' && <GitHubSkeleton />}
      {state.status === 'error' && <GitHubFallback />}
      {state.status === 'ready' && <GitHubContent user={state.user} repos={state.repos} />}
    </Section>
  )
}

function GitHubContent({ user, repos }: { user: GitHubUser; repos: GitHubRepo[] }) {
  // Curate: hide early / low-signal repos from the public showcase.
  const shown = repos.filter((r) => !githubHiddenRepos.includes(r.name))
  const allLangs = aggregateLanguages(shown)
  const langs = allLangs.slice(0, 6)
  const langTotal = langs.reduce((s, l) => s + l.count, 0) || 1
  const topRepos = shown.slice(0, 6)
  const sinceYear = new Date(user.created_at).getFullYear()

  const summary = [
    { icon: FolderGit2, label: 'Repositories', value: formatCompact(user.public_repos) },
    { icon: Code2, label: 'Languages', value: String(allLangs.length) },
    { icon: Calendar, label: 'Building since', value: String(sinceYear) },
    { icon: Sparkles, label: 'Top language', value: allLangs[0]?.name ?? '—' },
  ]

  return (
    <div className="space-y-8">
      {/* Profile + stats banner */}
      <Reveal>
        <div className="card overflow-hidden">
          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar_url}
                alt={user.name ?? user.login}
                width={64}
                height={64}
                loading="lazy"
                className="size-16 rounded-2xl object-cover ring-1 ring-border"
              />
              <div>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 text-lg font-semibold tracking-tight text-foreground"
                >
                  {user.name ?? user.login}
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <p className="font-mono text-sm text-muted-foreground">@{user.login}</p>
                {user.bio && (
                  <p className="mt-1 max-w-md text-sm text-muted-foreground">{user.bio}</p>
                )}
              </div>
            </div>

            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 self-start rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:self-auto"
            >
              <Github className="size-4" />
              Follow on GitHub
            </a>
          </div>

          <div className="grid grid-cols-2 gap-px border-t border-border bg-border sm:grid-cols-4">
            {summary.map((s) => (
              <div key={s.label} className="flex items-center gap-3 bg-surface px-5 py-4">
                <s.icon className="size-4 text-brand-500" />
                <div>
                  <div className="text-lg font-bold leading-none text-foreground">{s.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Languages */}
      {langs.length > 0 && (
        <Reveal delay={0.05}>
          <div className="card p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Most-used languages</h3>
            <div className="flex h-2.5 overflow-hidden rounded-full">
              {langs.map((l) => (
                <div
                  key={l.name}
                  title={`${l.name} · ${l.count}`}
                  style={{
                    width: `${(l.count / langTotal) * 100}%`,
                    backgroundColor: LANG_COLORS[l.name] ?? 'hsl(var(--brand-500))',
                  }}
                />
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {langs.map((l) => (
                <div key={l.name} className="flex items-center gap-2 text-sm">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: LANG_COLORS[l.name] ?? 'hsl(var(--brand-500))' }}
                  />
                  <span className="text-foreground/80">{l.name}</span>
                  <span className="text-muted-foreground">{l.count}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* Repo grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {topRepos.map((repo, i) => (
          <Reveal key={repo.id} delay={i * 0.05}>
            <RepoCard repo={repo} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="card group flex h-full flex-col p-6 transition-all hover:-translate-y-0.5 hover:border-brand-400/40"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <FolderGit2 className="size-4" />
          <span className="font-mono text-sm font-medium text-foreground group-hover:text-brand-600">
            {repo.name}
          </span>
        </div>
        <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {githubRepoBlurbs[repo.name] ?? repo.description ?? 'Personal engineering project.'}
      </p>

      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span
              className="size-2.5 rounded-full"
              style={{
                backgroundColor: LANG_COLORS[repo.language] ?? 'hsl(var(--brand-500))',
              }}
            />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="inline-flex items-center gap-1">
            <Star className="size-3.5" />
            {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="inline-flex items-center gap-1">
            <GitFork className="size-3.5" />
            {repo.forks_count}
          </span>
        )}
        {repo.homepage && (
          <span className="ml-auto inline-flex items-center gap-1 font-medium text-brand-600">
            <CircleDot className="size-3" />
            Live
          </span>
        )}
      </div>
    </a>
  )
}

function GitHubSkeleton() {
  return (
    <div className="space-y-8">
      <div className="card h-[180px] animate-pulse" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card h-[150px] animate-pulse" />
        ))}
      </div>
    </div>
  )
}

function GitHubFallback() {
  return (
    <div className="card mx-auto max-w-md p-8 text-center">
      <Github className="mx-auto size-8 text-muted-foreground" />
      <p className="mt-3 text-sm text-muted-foreground">
        Couldn't load live GitHub data right now (rate limit or network).
      </p>
      <a
        href={`https://github.com/${profile.githubUsername}`}
        target="_blank"
        rel="noreferrer"
        className={cn(
          'mt-4 inline-flex h-10 items-center gap-2 rounded-xl bg-foreground px-4 text-sm font-medium text-background',
        )}
      >
        <Github className="size-4" />
        Visit my GitHub
      </a>
    </div>
  )
}
