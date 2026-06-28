import { useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import EyeDepthGallery from "@/components/EyeDepthGallery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type EyeMedia = {
  file: string;
  kind: "image" | "video";
  collection: "camp" | "cat" | "flower" | "hiking";
  title: string;
  note: string;
  frame: "feature" | "wide" | "tall" | "square";
};

const media: EyeMedia[] = [
  {
    file: "Hiking/20250822_111546136_iOS.jpg",
    kind: "image",
    collection: "hiking",
    title: "Last light over water",
    note: "route marker / sunset",
    frame: "feature",
  },
  {
    file: "Flower/20260530_153130000_iOS.jpg",
    kind: "image",
    collection: "flower",
    title: "Red against glare",
    note: "waterline / bloom",
    frame: "wide",
  },
  {
    file: "Camp/20250601_042106991_iOS.jpg",
    kind: "image",
    collection: "camp",
    title: "Temple roof geometry",
    note: "camp day / upward look",
    frame: "tall",
  },
  {
    file: "Cat/20260613_083712000_iOS.jpg",
    kind: "image",
    collection: "cat",
    title: "Stairwell witness",
    note: "indoor / soft noise",
    frame: "tall",
  },
  {
    file: "Flower/20260314_001529000_iOS.mp4",
    kind: "video",
    collection: "flower",
    title: "Moving petals",
    note: "mp4 clip / field motion",
    frame: "square",
  },
  {
    file: "Hiking/20250822_092410194_iOS.jpg",
    kind: "image",
    collection: "hiking",
    title: "First ascent frame",
    note: "trail / morning",
    frame: "tall",
  },
  {
    file: "Camp/20250531_122512000_iOS.jpg",
    kind: "image",
    collection: "camp",
    title: "Camp vertical",
    note: "shelter / shadow",
    frame: "tall",
  },
  {
    file: "Flower/20260530_153841000_iOS.mp4",
    kind: "video",
    collection: "flower",
    title: "Small weather moving",
    note: "mp4 clip / color kept",
    frame: "wide",
  },
  {
    file: "Camp/20250531_112314986_iOS.jpg",
    kind: "image",
    collection: "camp",
    title: "Camp arrival",
    note: "first frame / shelter",
    frame: "square",
  },
  {
    file: "Cat/20260203_111125490_iOS.jpg",
    kind: "image",
    collection: "cat",
    title: "Quiet room signal",
    note: "cat log / interior",
    frame: "tall",
  },
  {
    file: "Hiking/20250822_101842710_iOS.jpg",
    kind: "image",
    collection: "hiking",
    title: "Route texture",
    note: "terrain / climb",
    frame: "square",
  },
  {
    file: "Cat/20260330_061510912_iOS.jpg",
    kind: "image",
    collection: "cat",
    title: "Low light companion",
    note: "cat log / close orbit",
    frame: "square",
  },
  {
    file: "Camp/20250531_113913597_iOS.jpg",
    kind: "image",
    collection: "camp",
    title: "Camp color study",
    note: "detail / daylight",
    frame: "tall",
  },
  {
    file: "Flower/20260313_185037814_iOS.jpg",
    kind: "image",
    collection: "flower",
    title: "After rain red",
    note: "flower / late light",
    frame: "tall",
  },
  {
    file: "Cat/20260330_061547017_iOS.jpg",
    kind: "image",
    collection: "cat",
    title: "Near the edge",
    note: "cat log / watchful",
    frame: "square",
  },
  {
    file: "Cat/20260622_082946230_iOS.jpg",
    kind: "image",
    collection: "cat",
    title: "Window patrol",
    note: "cat log / morning",
    frame: "tall",
  },
  {
    file: "Hiking/20250822_103600049_iOS.jpg",
    kind: "image",
    collection: "hiking",
    title: "Between checkpoints",
    note: "hiking / pause",
    frame: "tall",
  },
  {
    file: "Camp/20250601_064752000_iOS.jpg",
    kind: "image",
    collection: "camp",
    title: "Morning edge",
    note: "camp / early light",
    frame: "square",
  },
  {
    file: "Flower/20260313_092118000_iOS.jpg",
    kind: "image",
    collection: "flower",
    title: "Small bloom index",
    note: "flower / close read",
    frame: "square",
  },
  {
    file: "Flower/20260313_094821000_iOS.jpg",
    kind: "image",
    collection: "flower",
    title: "Petal note",
    note: "flower / quick study",
    frame: "square",
  },
  {
    file: "Cat/20260529_142926801_iOS.jpg",
    kind: "image",
    collection: "cat",
    title: "Soft stare",
    note: "cat log / warm interior",
    frame: "tall",
  },
  {
    file: "Hiking/20250822_111558000_iOS.jpg",
    kind: "image",
    collection: "hiking",
    title: "Route afterglow",
    note: "coast / descent",
    frame: "tall",
  },
];

const srcFor = (file: string) => `/Photography/${file.split("/").map(encodeURIComponent).join("/")}`;

function MediaFrame({ item, priority = false }: { item: EyeMedia; priority?: boolean }) {
  const src = srcFor(item.file);

  return (
    <figure className={`eye-frame eye-frame-${item.frame} eye-motion-item`}>
      <div className="eye-media-shell">
        {item.kind === "video" ? (
          <video
            className="eye-frame-media"
            src={src}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
          />
        ) : (
          <img className="eye-frame-media" src={src} alt={item.title} loading={priority ? "eager" : "lazy"} />
        )}
        <span className="eye-media-type">{item.kind === "video" ? "MP4" : item.collection}</span>
      </div>
      <figcaption>
        <span>{item.title}</span>
        <small>{item.note}</small>
      </figcaption>
    </figure>
  );
}

export default function Eye() {
  const rootRef = useRef<HTMLDivElement>(null);
  const hero = media[0];
  const depthGallery = useMemo(() => media.filter((item) => item.kind === "image").slice(0, 8), []);
  const gallery = useMemo(() => media.slice(1).filter((item) => item.kind === "image"), []);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          ".eye-kicker, .eye-title, .eye-copy, .eye-actions, .eye-index",
          { y: 28 },
          {
            y: 0,
            duration: 1.1,
            stagger: 0.08,
            clearProps: "transform",
          },
        )
        .fromTo(
          ".eye-hero-frame",
          { y: 34, rotateX: 5, scale: 0.96 },
          {
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.25,
            clearProps: "transform",
          },
          "-=0.78",
        );

      ScrollTrigger.batch(".eye-frame", {
        start: "top 86%",
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 48, scale: 0.96 },
            { y: 0, scale: 1, duration: 1.1, stagger: 0.08, ease: "power4.out", overwrite: true },
          );
        },
      });

      gsap.utils.toArray<HTMLElement>(".eye-media-shell").forEach((shell, index) => {
        const mediaEl = shell.querySelector<HTMLElement>(".eye-frame-media");

        if (!mediaEl) {
          return;
        }

        gsap.to(mediaEl, {
          yPercent: index % 2 === 0 ? -7 : -4,
          scale: 1.045,
          ease: "none",
          scrollTrigger: {
            trigger: shell,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.75,
          },
        });
      });

      ScrollTrigger.refresh();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="eye-page page-os min-h-screen overflow-x-hidden bg-black text-white">
      <main className="eye-shell">
        <section className="eye-hero" aria-labelledby="eye-title">
          <div className="eye-hero-copy">
            <p className="eye-kicker eye-motion-item">eye / photo field archive</p>
            <h1 id="eye-title" className="eye-title eye-motion-item">
              Color kept. Noise welcome.
            </h1>
            <p className="eye-copy eye-motion-item">
              A small visual log for route light, camp fragments, flowers, and the quiet strange things that make me
              stop walking for a second.
            </p>

            <div className="eye-actions eye-motion-item" aria-label="Photography collections">
              <a href="http://vs.co/tvytte7b" target="_blank" rel="noreferrer">
                More and more...
              </a>
            </div>

            <dl className="eye-index eye-motion-item">
              <div>
                <dt>files</dt>
                <dd>22</dd>
              </div>
              <div>
                <dt>video</dt>
                <dd>2 mp4</dd>
              </div>
              <div>
                <dt>sets</dt>
                <dd>camp / cat / flower / hiking</dd>
              </div>
            </dl>
          </div>

          <figure className="eye-hero-frame eye-motion-item">
            <div className="eye-hero-media">
              <img src={srcFor(hero.file)} alt={hero.title} />
              <svg viewBox="0 0 480 320" aria-hidden="true" className="eye-route-map">
                <path d="M34 245 C 98 194, 116 212, 158 164 S 246 140, 288 116 S 357 86, 442 54" />
                <circle cx="34" cy="245" r="4" />
                <circle cx="158" cy="164" r="4" />
                <circle cx="288" cy="116" r="4" />
                <circle cx="442" cy="54" r="4" />
              </svg>
            </div>
            <figcaption>
              <span>{hero.title}</span>
              <small>{hero.note}</small>
            </figcaption>
          </figure>
        </section>

        <EyeDepthGallery
          items={depthGallery.map((item) => ({
            src: srcFor(item.file),
            title: item.title,
            note: item.note,
            collection: item.collection,
          }))}
        />

        <section id="eye-gallery" className="eye-gallery-section" aria-label="Photography archive">
          <div className="eye-section-head eye-motion-item">
            <p>cat archive --list --color=true</p>
            <h2>Small proofs that I was looking.</h2>
          </div>

          <div className="eye-gallery">
            {gallery.map((item, index) => (
              <MediaFrame key={item.file} item={item} priority={index < 3} />
            ))}
          </div>
        </section>

        <section id="eye-motion" className="eye-motion-log eye-motion-item" aria-label="Motion clips">
          <div>
            <p>motion queue</p>
            <h2>Two moving notes, left in color.</h2>
          </div>
          <div className="eye-video-row">
            {media
              .filter((item) => item.kind === "video")
              .map((item) => (
                <MediaFrame key={`motion-${item.file}`} item={item} />
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
