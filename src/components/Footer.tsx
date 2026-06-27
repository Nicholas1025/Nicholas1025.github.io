import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";
import { site } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span className="font-mono text-xs">
          // designed &amp; built between commits and summits
        </span>
        <div className="flex items-center gap-4">
          <Link to="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
          <a
            href={site.github}
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
            className="transition-colors hover:text-foreground"
          >
            <Github size={18} />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
            className="transition-colors hover:text-foreground"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
