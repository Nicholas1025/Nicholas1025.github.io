import { Mail, Github, Linkedin } from "lucide-react";
import Reveal from "@/components/Reveal";
import { site } from "@/data/content";

export default function Contact() {
  return (
    <div className="page-os min-h-screen bg-black px-6 pb-28 pt-32 text-center text-white">
      <div className="relative z-5 mx-auto max-w-3xl">
      <Reveal>
        <p className="eyebrow mb-3">contact</p>
        <h1 className="font-display text-5xl sm:text-6xl">Let's build something.</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          If you're hiring interns, building something interesting, or just know a good trail near
          KL — my inbox is open.
        </p>

        <div className="mt-10 flex flex-col items-center gap-5">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            <Mail size={18} /> {site.email}
          </a>
          <div className="flex gap-3">
            <a
              href={site.github}
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
              className="rounded-full border border-border p-3 transition-colors hover:border-foreground"
            >
              <Github size={20} />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
              className="rounded-full border border-border p-3 transition-colors hover:border-foreground"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-16 flex items-end justify-center gap-3 opacity-90">
        <img src="/cat.gif" alt="" className="h-16 w-auto" />
        <img src="/campfire.gif" alt="" className="h-20 w-auto" />
      </Reveal>
      </div>
    </div>
  );
}
