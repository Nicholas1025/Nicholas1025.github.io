import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/content";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-6 pb-24 pt-32 text-center">
        <h1 className="font-display text-4xl">Post not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-accent">
          ← Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-2xl px-6 pb-24 pt-32">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} /> all field notes
      </Link>
      <p className="eyebrow mt-8">
        {post.date} · {post.readingTime}
      </p>
      <h1 className="mt-2 font-display text-4xl sm:text-5xl">{post.title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
      <div className="mt-6 space-y-5 leading-relaxed text-muted-foreground">
        <p>
          Full write-up coming soon — this one's still in drafts. In the meantime, the TL;DR is
          above. Ping me if you'd like to hear more about it.
        </p>
      </div>
    </article>
  );
}
