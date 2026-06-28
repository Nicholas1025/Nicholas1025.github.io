import { useRef, Fragment, type CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { experience, facts, site } from "@/data/content";

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

const profileNotes = [
  "I study Computer Science at MMU, but most days feel more like route finding than classroom mode. I like messy data, stubborn bugs, and systems that need more than a pretty demo.",
  "My projects usually start with one annoying question I cannot leave alone: can this model catch bad numbers, can this script find signal, can this tool survive real users?",
  "When I am not coding, I am probably outside somewhere. Mountains, bouldering, slow hikes, campfire nights. Same habit everywhere: read the route, test the hold, move with patience.",
];

const assemblySentence = "I turn uncertain routes into working systems.";
const assemblyCharacters = Array.from(assemblySentence);

const signalRoutes = [
  { index: "01", label: "Github", icon: "/icon/github.svg", href: site.github, x: 13, y: 72 },
  { index: "02", label: "Instagram", icon: "/icon/instagram.png", href: "https://www.instagram.com/nicholas_1025/", x: 30, y: 66 },
  { index: "03", label: "Threads", icon: "/icon/threads.png", href: "https://www.threads.com/@nicholas_1025/", x: 47, y: 58 },
  { index: "04", label: "DouYin", icon: "/icon/tiktok.svg", href: "https://v.douyin.com/tqQRrQPOEvo/?utm_campaign=client_share&app=aweme&utm_medium=ios&tt_from=more&utm_source=more", x: 62, y: 49 },
  { index: "05", label: "Vsco", icon: "/icon/vsco.svg", href: "https://vsco.co/nicholas1025x/gallery", x: 75, y: 55 },
  { index: "06", label: "Email", icon: "/icon/email-fill.png", href: "mailto:nicholastay1025@outlook.com", x: 86, y: 39 },
];

// Split text into per-word spans so they can scatter-assemble like the hero sentence.
function assembleWords(text: string) {
  return text.split(" ").map((word, index) => (
    <Fragment key={index}>
      <span className="about-assemble-word">{word}</span>{" "}
    </Fragment>
  ));
}

export default function Experience() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set(".about-motion-item", { autoAlpha: 1, clearProps: "transform,filter" });
        return;
      }

      gsap.set(
        [
          ".about-kicker",
          ".about-title",
          ".about-lede",
          ".about-letter-scene",
          ".about-portrait",
          ".about-gif-strip",
          ".about-timeline",
          ".about-event",
          ".signal-routes-section",
        ],
        { autoAlpha: 0 }
      );

      const intro = gsap.timeline({
        defaults: { duration: 0.9, ease: "power3.out" },
      });

      intro
        .fromTo(".about-kicker", { y: 16 }, { y: 0, autoAlpha: 1, duration: 0.55 })
        .fromTo(".about-title", { y: 38 }, { y: 0, autoAlpha: 1, duration: 1.05 }, "-=0.25")
        .fromTo(".about-lede", { y: 22 }, { y: 0, autoAlpha: 1, duration: 0.75 }, "-=0.62")
        .fromTo(
          ".about-letter-scene",
          { y: 30, scale: 0.985, filter: "blur(8px)" },
          { y: 0, scale: 1, filter: "blur(0px)", autoAlpha: 1, duration: 1.05 },
          "-=0.78"
        );

      const letterScene = rootRef.current?.querySelector<HTMLElement>(".about-letter-scene");
      const letters = gsap.utils.toArray<HTMLElement>(".about-letter-char");

      if (letterScene && letters.length > 0) {
        const isCompactScene = window.matchMedia("(max-width: 860px)").matches;
        const scatterRangeX = Math.min(window.innerWidth * 0.42, 520);
        const scatterRangeY = Math.min(window.innerHeight * 0.42, 330);

        const assembly = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: letterScene,
            start: isCompactScene ? "top 82%" : "top top",
            end: isCompactScene ? "bottom 45%" : "+=1650",
            scrub: isCompactScene ? 0.8 : 1.05,
            pin: !isCompactScene,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        assembly
          .fromTo(
            ".about-portrait",
            { y: 34, scale: 0.92, autoAlpha: 0.74 },
            { y: -10, scale: 1, autoAlpha: 1, duration: 0.64 },
            0
          )
          .fromTo(
            ".about-assembly-final",
            { autoAlpha: 0.5, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.45 },
            0.48
          )
          .to(".about-bg-word", { xPercent: -8, autoAlpha: 0.18, duration: 0.95 }, 0);

        letters.forEach((letter, index) => {
          const side = index % 2 === 0 ? -1 : 1;
          const columnBias = index % 5 === 0 ? 1.35 : 1;
          const x = side * (scatterRangeX * (0.42 + ((index * 37) % 59) / 100) * columnBias);
          const y = -scatterRangeY * 0.55 + (((index * 53) % 100) / 100) * scatterRangeY * 1.65;
          const rotate = -14 + ((index * 29) % 28);

          assembly.fromTo(
            letter,
            {
              x,
              y,
              rotate,
              autoAlpha: index % 7 === 0 ? 0.58 : 0.86,
              filter: "blur(0.6px)",
            },
            {
              x: 0,
              y: 0,
              rotate: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.42,
            },
            0.1 + index * 0.008
          );
        });

        // Field-notes + facts words assemble the same way as the sentence.
        const words = gsap.utils.toArray<HTMLElement>(".about-assemble-word");
        words.forEach((word, index) => {
          const side = index % 2 === 0 ? -1 : 1;
          const x = side * (10 + ((index * 13) % 18));
          const y = 18 - ((index * 11) % 30);
          const rotate = -3 + ((index * 7) % 6);

          assembly.fromTo(
            word,
            { x, y, rotate, autoAlpha: 0.12, filter: "blur(1px)" },
            { x: 0, y: 0, rotate: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.34 },
            0.18 + index * 0.0045
          );
        });

        assembly.to(".about-scene-stage", { y: -8, duration: 0.12 }, 0.88);
        assembly.to({}, { duration: 0.28 });
      }

      gsap.to(".about-scanline", {
        yPercent: 210,
        duration: 3.8,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.fromTo(
        [".about-gif-strip", ".about-timeline"],
        { y: 42, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".about-grid",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".about-event").forEach((event, index) => {
        gsap.fromTo(
          event,
          { y: 34, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.06,
            overwrite: "auto",
            scrollTrigger: {
              trigger: event,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.fromTo(
        ".signal-routes-section",
        { y: 52, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".signal-routes-section",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".signal-node",
        { y: 18 },
        {
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: ".signal-routes-section",
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(".signal-light", {
        duration: 15,
        ease: "none",
        repeat: -1,
        motionPath: {
          path: "#signal-route-path",
          align: "#signal-route-path",
          alignOrigin: [0.5, 0.5],
        },
      });

      ScrollTrigger.refresh();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="about-os min-h-screen overflow-hidden bg-black text-white">
      <div className="replica-stars" aria-hidden="true" />
      <div className="replica-noise" aria-hidden="true" />

      <main className="about-shell">
        <section className="about-hero">
          <div>
            <p className="replica-role about-kicker about-motion-item">about / route profile</p>
            <h1 className="about-title about-motion-item">The route so far.</h1>
            <p className="about-lede about-motion-item">
              A computer science student moving between ML systems, backend infrastructure, and the
              kind of outdoor patience that makes debugging less dramatic.
            </p>
          </div>
        </section>

        <section className="about-letter-scene about-motion-item" aria-label="Route sentence assembly">
          <div className="about-bg-word about-bg-word-left" aria-hidden="true">
            ROUTE
          </div>
          <div className="about-bg-word about-bg-word-right" aria-hidden="true">
            SIGNAL
          </div>
          <div className="about-scene-stage">
            <figure className="about-portrait about-motion-item">
              <div className="about-scanline" aria-hidden="true" />
              <img src="/me.jpeg" alt="Nicholas Tay portrait" />
              <figcaption>
                <span>portrait feed</span>
                <span>signal stable</span>
              </figcaption>
            </figure>

            <div className="about-scene-panels">
              <div className="about-notes">
                <p className="about-panel-title">$ open field-notes.txt</p>
                <div className="about-notes-body">
                  {profileNotes.map((paragraph, pi) => (
                    <p className="about-notes-line" key={pi}>
                      {assembleWords(paragraph)}
                    </p>
                  ))}
                </div>
              </div>

              <div className="about-notes">
                <p className="about-panel-title">$ inspect facts</p>
                <dl className="about-facts about-facts-open">
                  {facts.map((fact) => (
                    <div key={fact.k}>
                      <dt>{fact.k}</dt>
                      <dd>{assembleWords(fact.v)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <p className="about-assembly-final" aria-label={assemblySentence}>
            {assemblyCharacters.map((char, index) => (
              <span
                key={`${char}-${index}`}
                className="about-letter-char"
                aria-hidden="true"
                data-space={char === " " ? "true" : undefined}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </section>

        <section className="about-grid">
          <div className="about-gif-strip about-motion-item">
            <div>
              <img src="/campfire.gif" alt="" />
              <p>campfire uptime</p>
            </div>
            <div>
              <img src="/cat.gif" alt="" />
              <p>debug companion</p>
            </div>
          </div>
        </section>

        <section className="about-timeline about-motion-item">
          <p className="about-panel-title">$ tail route.log</p>
          {experience.map((item) => (
            <article key={item.title} className="about-event about-motion-item">
              <div>
                <span>{item.when}</span>
                <span>{item.kind}</span>
              </div>
              <div>
                <h2>{item.title}</h2>
                <p>{item.org}</p>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>

        <section className="signal-routes-section about-motion-item" aria-labelledby="signal-routes-title">
          <div className="signal-stars" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="signal-copy">
            <p className="about-panel-title">$ trace public-signals</p>
            <h2 id="signal-routes-title">signal routes</h2>
            <span aria-hidden="true">_</span>
            <p>
              Different platforms, same frequency.
              <br />
              Choose your path, leave a signal.
            </p>
            <p className="signal-status">[ paths open / leave a signal ]</p>
          </div>

          <div className="signal-map" aria-label="Social signal route map">
            <svg className="signal-route-svg" viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <filter id="signalGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                className="signal-contour signal-contour-a"
                d="M0 500 C122 466 180 492 292 448 C386 410 442 410 526 356 C612 300 686 346 760 330 C858 308 906 246 1000 190"
              />
              <path
                className="signal-contour signal-contour-b"
                d="M0 528 C135 488 204 528 324 466 C426 414 490 444 584 382 C674 324 730 382 824 342 C910 306 938 252 1000 220"
              />
              <path
                id="signal-route-path"
                className="signal-route-line"
                d="M130 403 C198 404 226 376 300 370 C386 360 406 332 470 325 C546 316 568 278 620 274 C694 268 700 315 750 308 C822 298 812 226 860 218"
              />
              <path
                className="signal-route-line signal-route-glow"
                d="M130 403 C198 404 226 376 300 370 C386 360 406 332 470 325 C546 316 568 278 620 274 C694 268 700 315 750 308 C822 298 812 226 860 218"
              />
              {signalRoutes.map((route) => (
                <g key={route.index} className="signal-pin" transform={`translate(${route.x * 10} ${route.y * 5.6})`}>
                  <line y1="-92" y2="-8" />
                  <circle r="11" />
                  <circle r="4" />
                </g>
              ))}
              <circle className="signal-light" r="7" filter="url(#signalGlow)" />
            </svg>

            <div className="signal-mountains" aria-hidden="true" />

            {signalRoutes.map((route) => (
              <a
                key={route.index}
                className="signal-node"
                href={route.href}
                target={route.href.startsWith("http") ? "_blank" : undefined}
                rel={route.href.startsWith("http") ? "noreferrer" : undefined}
                style={{ "--signal-x": `${route.x}%`, "--signal-y": `${route.y}%` } as CSSProperties}
              >
                <small>[{route.index}]</small>
                <span aria-hidden="true">
                  <img src={route.icon} alt="" />
                </span>
                <strong>{route.label}</strong>
                <em aria-hidden="true">↗</em>
              </a>
            ))}
          </div>

          <div className="signal-footer" aria-hidden="true">
            <span>status: online</span>
            <span>lat: 3.1390° N&nbsp;&nbsp; long: 101.6869° E&nbsp;&nbsp; alt: 1,842m</span>
          </div>
        </section>
      </main>
    </div>
  );
}
