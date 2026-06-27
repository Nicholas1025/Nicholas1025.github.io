import { Github, ArrowUpRight, Lock } from "lucide-react";
import Reveal from "@/components/Reveal";
import { projects, type Project } from "@/data/content";

function ProjectCard({ p }: { p: Project }) {
  return (
    <Reveal className={p.featured ? "md:col-span-2" : ""}>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow duration-300 hover:shadow-xl">
        {p.image && (
          <div className="overflow-hidden border-b border-border bg-muted">
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          {p.status && <span className="eyebrow mb-2">{p.status}</span>}
          <h3 className="font-display text-2xl">{p.title}</h3>
          <p className="mt-2 text-muted-foreground">{p.summary}</p>

          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-mono text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                Problem
              </dt>
              <dd className="text-muted-foreground">{p.problem}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                Approach
              </dt>
              <dd className="text-muted-foreground">{p.approach}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                Result
              </dt>
              <dd className="font-medium text-foreground">{p.result}</dd>
            </div>
          </dl>

          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-5 pt-2">
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-accent"
              >
                <Github size={16} /> GitHub
              </a>
            )}
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-accent"
              >
                <ArrowUpRight size={16} /> Demo
              </a>
            )}
            {p.privateNote && (
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Lock size={14} /> {p.privateNote}
              </span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <div className="page-os min-h-screen bg-black px-6 pb-24 pt-32 text-white">
      <div className="relative z-5 mx-auto max-w-6xl">
      <Reveal>
        <p className="eyebrow mb-3">projects</p>
        <h1 className="font-display text-5xl sm:text-6xl">Things I've shipped.</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Each one went from question → model or system → measured result.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
      </div>
    </div>
  );
}
