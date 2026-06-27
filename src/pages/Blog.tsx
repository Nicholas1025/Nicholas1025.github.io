import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import { blogPosts } from "@/data/content";

export default function Blog() {
  return (
    <div className="page-os min-h-screen bg-black px-6 pb-24 pt-32 text-white">
      <div className="relative z-5 mx-auto max-w-3xl">
      <Reveal>
        <p className="eyebrow mb-3">blog</p>
        <h1 className="font-display text-5xl sm:text-6xl">Field notes.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Things I learned building, breaking, and occasionally hiking away from my projects.
          Written for past-me, published for anyone.
        </p>
      </Reveal>

      <div className="mt-12 divide-y divide-border border-y border-border">
        {blogPosts.map((post) => (
          <Reveal key={post.slug}>
            <Link
              to={`/blog/${post.slug}`}
              className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <div className="sm:max-w-xl">
                <span className="font-mono text-xs text-muted-foreground">{post.date}</span>
                <h2 className="mt-1 font-display text-2xl transition-colors group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-1 text-muted-foreground">{post.excerpt}</p>
              </div>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">
                {post.readingTime} →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
      </div>
    </div>
  );
}
