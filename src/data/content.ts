/* ------------------------------------------------------------------ *
 *  CONTENT LAYER                                                       *
 *                                                                     *
 *  Everything recruiter-facing lives here. The components read from   *
 *  this single, typed source so you can update your portfolio without *
 *  touching any UI code. Edit the values below and the whole site     *
 *  re-flows automatically.                                            *
 * ------------------------------------------------------------------ */

import type { LucideIcon } from 'lucide-react'
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code2,
  Server,
  Cloud,
  Wrench,
  Brain,
  Trophy,
  Award,
} from 'lucide-react'

export interface SocialLink {
  label: string
  href: string
  handle: string
  icon: LucideIcon
}

export interface Stat {
  label: string
  value: string
  detail?: string
}

export interface SkillGroup {
  title: string
  icon: LucideIcon
  /** Confident one-line descriptor of what this group represents. */
  blurb: string
  skills: string[]
}

export type ProjectCategory = 'Full-Stack' | 'AI / ML' | 'Backend' | 'Frontend' | 'Cloud'

export interface Project {
  title: string
  tagline: string
  description: string
  highlights: string[]
  tech: string[]
  category: ProjectCategory
  repo?: string
  /** GitHub repo name — used to enrich the card with live stars / language. */
  repoName?: string
  live?: string
  featured: boolean
  year: string
}

export interface ExperienceItem {
  role: string
  company: string
  location: string
  start: string
  end: string | null
  type: string
  summary: string
  highlights: string[]
  tech: string[]
}

export interface EducationItem {
  institution: string
  credential: string
  field: string
  location: string
  period: string
  /** Optional — only shown when it strengthens the profile. */
  score?: string
}

export interface Achievement {
  title: string
  detail: string
  icon: LucideIcon
  href?: string
}

/* ------------------------------------------------------------------ */

export const profile = {
  name: 'Sourav Kumar Verma',
  firstName: 'Sourav',
  title: 'Full-Stack Software Engineer',
  /** Rotating roles for the animated hero subtitle (kept short so they fit
   *  one line on mobile, where the rotate animation clips overflow). */
  roles: [
    'Full-Stack Software Engineer',
    'Backend Systems Engineer',
    'Spring Boot Developer',
    'AI-Driven Product Builder',
  ],
  location: 'Bengaluru, Karnataka, India',
  email: 'skverma10401@gmail.com',
  phone: '+91 91224 43457',
  /** GitHub username — powers the live GitHub integration section. */
  githubUsername: 'kr-sourav1',
  avatar: 'https://avatars.githubusercontent.com/u/122258356?v=4',
  available: true,
  resumeUrl: '/resume.pdf',
  tagline: 'I build scalable backend systems and AI-driven products.',
  summary:
    'Full-Stack Software Engineer specializing in scalable backend systems and AI-driven products. I design clean APIs and Spring Boot microservices, cut latency on high-traffic services, and own features end-to-end — from schema to production.',
  /** Longer narrative for the About section. */
  about: [
    "I'm a Full-Stack Software Engineer who turns ambiguous product ideas into reliable, well-architected systems. My core strength is backend engineering — designing clean APIs, modeling data, and building Spring Boot microservices that perform under real production load.",
    'At Prepisely Edutech I own backend services end-to-end — from the first schema sketch through testing, deployment, and iteration. I focus on the metrics that move the product: I cut API latency by ~25% on high-traffic modules and shipped two production microservices from scratch, partnering closely with product and frontend to deliver features people use every day.',
    "I'm increasingly drawn to the frontier where strong engineering meets AI — building grounded, context-aware features with OpenAI and the Model Context Protocol, including an AI Q&A assistant and an autonomous claims-processing agent. I move fast, sweat the fundamentals, and care about shipping software that's genuinely useful.",
  ],
}

export const socials: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/kr-sourav1',
    handle: '@kr-sourav1',
    icon: Github,
  },
  {
    // TODO: replace with your exact LinkedIn URL.
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sourav-kumar-verma',
    handle: 'Sourav Kumar Verma',
    icon: Linkedin,
  },
  {
    label: 'Email',
    href: 'mailto:skverma10401@gmail.com',
    handle: 'skverma10401@gmail.com',
    icon: Mail,
  },
  {
    label: 'Phone',
    href: 'tel:+919122443457',
    handle: '+91 91224 43457',
    icon: Phone,
  },
]

export const contactDetails = [
  { label: 'Location', value: 'Bengaluru, Karnataka, India', icon: MapPin },
  { label: 'Email', value: 'skverma10401@gmail.com', icon: Mail, href: 'mailto:skverma10401@gmail.com' },
  { label: 'Phone', value: '+91 91224 43457', icon: Phone, href: 'tel:+919122443457' },
]

export const stats: Stat[] = [
  { label: 'DSA problems solved', value: '400+', detail: 'across LeetCode & more' },
  { label: 'LeetCode rating', value: '1713', detail: 'Top 12% globally' },
  { label: 'Production microservices', value: '2', detail: 'shipped end-to-end' },
  { label: 'Latency reduced', value: '~25%', detail: 'on high-traffic APIs' },
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Backend & APIs',
    icon: Server,
    blurb: 'My core craft — production-grade REST APIs and microservices.',
    skills: ['Spring Boot', 'Microservices', 'REST APIs', 'Node.js', 'Spring Data JPA', 'Spring AI'],
  },
  {
    title: 'Languages & Core',
    icon: Code2,
    blurb: 'The languages and fundamentals behind everything I ship.',
    skills: ['Java', 'JavaScript', 'SQL', 'Python', 'Data Structures & Algorithms', 'OOP'],
  },
  {
    title: 'AI & Integrations',
    icon: Brain,
    blurb: 'Grounded, context-aware product features with LLMs.',
    skills: ['OpenAI Integration', 'Model Context Protocol (MCP)', 'Spring AI', 'AI Agents'],
  },
  {
    title: 'Frontend',
    icon: Code2,
    blurb: 'Responsive, polished interfaces that feel effortless.',
    skills: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Responsive UI'],
  },
  {
    title: 'Cloud & Databases',
    icon: Cloud,
    blurb: 'Modeling data and shipping to the cloud.',
    skills: ['AWS', 'AWS S3', 'MySQL', 'Database Design'],
  },
  {
    title: 'Tooling',
    icon: Wrench,
    blurb: 'The everyday workflow that keeps me shipping fast.',
    skills: ['Git', 'GitHub', 'Postman', 'IntelliJ IDEA', 'VS Code', 'GitHub Copilot'],
  },
]

/** Flat marquee list of headline technologies. */
export const techMarquee = [
  'Java',
  'Spring Boot',
  'Microservices',
  'React',
  'Node.js',
  'REST APIs',
  'MySQL',
  'AWS',
  'OpenAI',
  'MCP',
  'Spring AI',
  'Git',
  'JavaScript',
  'Python',
]

export const projects: Project[] = [
  {
    title: 'AI-Powered Stack Overflow',
    tagline: 'Context-aware Q&A platform with an MCP-grounded chatbot',
    description:
      'A Stack Overflow–style platform with user registration, Q&A posting, tagging, and voting — backed by a normalized relational schema and secure authentication. An AI chatbot built on OpenAI + the Model Context Protocol retrieves relevant system data to deliver grounded, context-aware answers.',
    highlights: [
      'Designed the relational schema and REST API for questions, answers, tags, and votes',
      'Implemented secure authentication and role-based access',
      'Integrated an OpenAI + MCP chatbot that grounds responses in real platform data',
    ],
    tech: ['Java', 'Spring Boot', 'MySQL', 'React', 'OpenAI', 'MCP', 'AWS S3'],
    category: 'AI / ML',
    repo: 'https://github.com/kr-sourav1/Stackoverflow',
    repoName: 'Stackoverflow',
    featured: true,
    year: '2026',
  },
  {
    title: 'Autonomous FNOL Claims Agent',
    tagline: 'Agentic AI that automates First Notice of Loss insurance claims',
    description:
      'An agentic AI system that automates the First Notice of Loss (FNOL) insurance workflow — intake, classification, and triage — using LLM-driven reasoning and tool calling through Spring AI and MCP.',
    highlights: [
      'Orchestrated an autonomous agent loop for claim intake and triage',
      'Used Spring AI + MCP for tool calling and structured reasoning',
      'Modeled a real-world insurance workflow end-to-end in Java',
    ],
    tech: ['Java', 'Spring Boot', 'Spring AI', 'MCP', 'OpenAI'],
    category: 'AI / ML',
    repo: 'https://github.com/kr-sourav1/autonomous-fnol-claims-agent',
    repoName: 'autonomous-fnol-claims-agent',
    featured: true,
    year: '2026',
  },
  {
    title: 'TinyLink — URL Shortener',
    tagline: 'Fast, deployed URL shortener with custom short codes',
    description:
      'A production URL shortener that generates compact short codes, handles redirects, and tracks usage — wrapped in a clean, responsive UI and deployed live.',
    highlights: [
      'Generates unique short codes with collision-safe encoding',
      'Handles redirects with a lightweight Node.js service',
      'Live in production with a polished, responsive interface',
    ],
    tech: ['JavaScript', 'Node.js', 'Express', 'REST APIs'],
    category: 'Full-Stack',
    repo: 'https://github.com/kr-sourav1/TinyLink',
    repoName: 'TinyLink',
    live: 'https://tiny-link-6t0d.onrender.com/',
    featured: true,
    year: '2026',
  },
  {
    title: 'Online Medical Appointment System',
    tagline: 'Doctor–patient scheduling with secure prescription management',
    description:
      'A healthcare platform with core modules for patient registration, appointment scheduling, and prescription management — including secure PDF upload and download. Backend services drive secure user access and seamless data flow across the platform.',
    highlights: [
      'Built patient registration and appointment scheduling modules',
      'Implemented prescription management with secure PDF upload/download',
      'Designed backend services for secure user access and data flow',
    ],
    tech: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'Spring Data JPA'],
    category: 'Full-Stack',
    repo: 'https://github.com/kr-sourav1/Doctor-Appointment-System',
    repoName: 'Doctor-Appointment-System',
    featured: true,
    year: '2025',
  },
  {
    title: 'Challenge Application',
    tagline: 'Coding-challenge platform shipped end-to-end on AWS',
    description:
      'A coding-challenge platform deployed end-to-end on AWS — a Java backend serving challenge data with S3 static hosting and a public live URL.',
    highlights: [
      'Shipped to production on AWS with a public live URL',
      'Java backend serving challenge data and submissions',
    ],
    tech: ['Java', 'Spring Boot', 'AWS S3'],
    category: 'Cloud',
    repo: 'https://github.com/kr-sourav1/Challenge_Application',
    repoName: 'Challenge_Application',
    live: 'http://challenge-application-live.s3-website.eu-north-1.amazonaws.com/',
    featured: true,
    year: '2025',
  },
  {
    title: 'Movie Recommender System',
    tagline: 'Content-based movie recommendations in Python',
    description:
      'A content-based movie recommendation engine built in a Jupyter workflow — vectorizing movie metadata and ranking similarity to suggest titles a user is likely to enjoy.',
    highlights: [
      'Content-based filtering over movie metadata',
      'Similarity ranking with a clean, reproducible notebook',
    ],
    tech: ['Python', 'Jupyter', 'Pandas', 'scikit-learn'],
    category: 'AI / ML',
    repo: 'https://github.com/kr-sourav1/movie_recommender_system',
    repoName: 'movie_recommender_system',
    featured: false,
    year: '2025',
  },
]

export const experience: ExperienceItem[] = [
  {
    role: 'Software Development Engineer',
    company: 'Prepisely Edutech Private Limited',
    location: 'Bengaluru, India',
    start: 'Aug 2025',
    end: null,
    type: 'Full-time',
    summary:
      'Own backend services end-to-end for high-traffic learning modules — driving performance, reliability, and maintainability.',
    highlights: [
      'Own backend services end-to-end with Java (Spring Boot) and Node.js for high-traffic modules — quizzes, content, and users.',
      'Designed, built, and shipped two production microservices end-to-end, from architecture through deployment.',
      'Cut API latency by ~25% on high-traffic endpoints by optimizing database queries and response paths.',
      'Drove modernization of legacy modules across teams, improving maintainability and raising engineering standards.',
    ],
    tech: ['Java', 'Spring Boot', 'Node.js', 'Microservices', 'MySQL', 'REST APIs'],
  },
  {
    role: 'Software Development Intern',
    company: 'Prepisely Edutech Private Limited',
    location: 'Bengaluru, India',
    start: 'Jul 2024',
    end: 'Dec 2024',
    type: 'Internship',
    summary:
      'Delivered production backend services and core features alongside senior engineers — earning a full-time engineering role.',
    highlights: [
      'Delivered backend services and core features for production applications.',
      'Improved performance through API response optimization and faster UI rendering.',
      'Partnered with senior engineers on system architecture and scalability decisions.',
    ],
    tech: ['Java', 'Spring Boot', 'React', 'REST APIs'],
  },
]

export const education: EducationItem[] = [
  {
    institution: 'C-DAC Advanced Computing Training School',
    credential: 'PG Diploma in Advanced Computing (DAC)',
    field: 'Advanced Computing — Java, Microservices & Cloud',
    location: 'Bengaluru, Karnataka',
    period: 'Feb 2025 — Aug 2025',
  },
  {
    institution: 'Haldia Institute of Technology',
    credential: 'B.Tech',
    field: 'Computer Science and Engineering',
    location: 'Haldia, West Bengal',
    period: '2020 — 2024',
    score: 'CGPA 8.56 / 10',
  },
]

export const achievements: Achievement[] = [
  {
    title: 'Ranked 32 / 1500+',
    detail: 'Codequezt by Naukri Campus — placed in the top 2% of 1500+ participants.',
    icon: Trophy,
  },
  {
    title: 'Top 12% on LeetCode',
    detail: '400+ problems solved with a contest rating of 1713 (top 12.02% globally).',
    icon: Award,
  },
]

/* ------------------------------------------------------------------ *
 *  Live GitHub curation — keeps the "Building in the open" section     *
 *  showing only strong, well-described work.                           *
 * ------------------------------------------------------------------ */

/** Early / low-signal repos hidden from the live GitHub grid. */
export const githubHiddenRepos = ['kohli_performance', 'kohli_performance_analysis', 'CODSOFT']

/** Confident one-line descriptions used when a repo has none on GitHub. */
export const githubRepoBlurbs: Record<string, string> = {
  TinyLink: 'Production URL shortener with custom short codes and redirect tracking — deployed live.',
  'autonomous-fnol-claims-agent':
    'Agentic AI that automates First Notice of Loss insurance claims with Spring AI + MCP.',
  Stackoverflow: 'Stack Overflow–style Q&A platform with an OpenAI + MCP grounded chatbot.',
  'Doctor-Appointment-System':
    'Healthcare platform for appointments, prescriptions, and secure PDF records.',
  Challenge_Application: 'Coding-challenge platform shipped end-to-end on AWS.',
  Taskify: 'Task-management service with clean Java domain modeling.',
  Employee_Management_System: 'Employee records and admin workflows behind a REST API.',
  Magical_Arena_Game: 'Turn-based arena battle simulation engine in Java.',
  movie_recommender_system: 'Content-based movie recommendation engine in Python.',
}

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'github', label: 'GitHub' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const
