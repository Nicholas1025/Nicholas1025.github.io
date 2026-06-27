import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "@/data/content";

gsap.registerPlugin(useGSAP);

const metrics = [
  ["distance covered", "2,341 km"],
  ["projects shipped", "12"],
  ["systems trained", "many"],
  ["lessons learned", "daily"],
];

const checkpoints = [
  ["Built ML pipeline to predict demand & optimize routing", "2025-04-21", "09:14"],
  ["Designed event-driven backend for real-time tracking", "2025-03-08", "16:27"],
  ["Reduced latency by 48% through system redesign", "2025-02-11", "11:03"],
  ["Ship small, measure right, iterate", "2025-01-02", "08:52"],
];

const chartPoints = [
  [10, 78],
  [18, 62],
  [25, 68],
  [33, 54],
  [42, 58],
  [52, 55],
  [63, 42],
  [72, 34],
  [82, 39],
  [91, 18],
];

export default function Home() {
  const firstProject = projects[0];
  const consoleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panel = consoleRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!panel || reduceMotion || !finePointer) return;

    const onMove = (event: PointerEvent) => {
      const rect = panel.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(panel, {
        rotationX: y * -5.5,
        rotationY: x * 7,
        x: x * 10,
        y: y * 7,
        "--console-glint-x": `${(x + 0.5) * 100}%`,
        "--console-glint-y": `${(y + 0.5) * 100}%`,
        duration: 0.65,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onLeave = () => {
      gsap.to(panel, {
        rotationX: 0,
        rotationY: 0,
        x: 0,
        y: 0,
        "--console-glint-x": "50%",
        "--console-glint-y": "18%",
        duration: 0.9,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    panel.addEventListener("pointermove", onMove);
    panel.addEventListener("pointerleave", onLeave);

    return () => {
      panel.removeEventListener("pointermove", onMove);
      panel.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="replica-home min-h-screen overflow-x-hidden bg-black text-white">
      <section className="replica-hero relative min-h-[100dvh] overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale"
          autoPlay
          loop
          muted
          playsInline
          src="/hero-cinematic.webm"
        />
        <div className="replica-vignette" />
        <div className="replica-stars" aria-hidden="true" />
        <div className="replica-noise" aria-hidden="true" />

        <header className="replica-topbar">
          <p>ntay@localhost:~$</p>
          <nav aria-label="Home sections">
            <Link to="/">[01] home</Link>
            <Link to="/projects">[02] work</Link>
            <a href="#route">[03] route</a>
            <a href="#systems">[04] notes</a>
            <Link to="/experience">[05] about</Link>
          </nav>
          <div className="replica-window-controls" aria-hidden="true">
            <span>_</span>
            <span>□</span>
            <span>×</span>
          </div>
        </header>

        <div className="replica-shell">
          <div className="replica-copy">
            <p className="replica-role">ML / backend engineer</p>
            <h1>Nicholas Tay</h1>
            <div className="replica-dash" />
            <p className="replica-intro">
              I build systems that learn, adapt, and scale.
              <br />
              From messy data to reliable services-
              <br />I enjoy turning uncertainty into clarity.
            </p>
            <div className="replica-actions">
              <Link to="/projects">
                <span>&gt; view selected work</span>
                <span>-&gt;</span>
              </Link>
              <a href="#route">
                <span>&gt; read route notes</span>
                <span>-&gt;</span>
              </a>
            </div>
            <div className="replica-note-card">
              <p>// based in malaysia</p>
              <p>// open to meaningful work</p>
              <p>// coffee, mountains, quiet terminals</p>
              <span>...</span>
            </div>
          </div>

          <div ref={consoleRef} className="replica-console">
            <div className="replica-console-bar">
              <div aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <p>trail.console</p>
              <button aria-label="Expand console">+</button>
            </div>
            <div className="replica-console-body">
              <div className="replica-command">$ route --summary</div>
              <div className="replica-current">
                <span>current location: between curious and committed</span>
                <span>elev. 1,842m</span>
              </div>
              <div className="replica-summary">
                <dl>
                  {metrics.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="replica-map" aria-hidden="true">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path className="contour contour-a" d="M8 74 C18 28 38 38 45 58 S70 42 88 18" />
                    <path className="contour contour-b" d="M2 82 C18 18 45 22 50 49 S75 55 96 10" />
                    <path className="contour contour-c" d="M14 90 C26 48 38 70 54 52 S78 25 92 30" />
                    <polyline
                      points={chartPoints.map(([x, y]) => `${x},${y}`).join(" ")}
                      className="route-line"
                    />
                    {chartPoints.map(([x, y]) => (
                      <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" className="route-dot" />
                    ))}
                  </svg>
                </div>
              </div>

              <div className="replica-checkpoints">
                <p>latest checkpoints</p>
                {checkpoints.map(([text, date, time]) => (
                  <div key={text}>
                    <span>○ {text}</span>
                    <span>{date}</span>
                    <span>{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="replica-rail" aria-label="Route status">
            <div className="replica-compass">
              <span>N</span>
              <span>E</span>
            </div>
            <dl>
              <div>
                <dt>elevation</dt>
                <dd>1,842m</dd>
              </div>
              <div>
                <dt>grade</dt>
                <dd>12%</dd>
              </div>
              <div>
                <dt>weather</dt>
                <dd>clear</dd>
                <dd>-2°C</dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="replica-status">
          <span>[ systems: online ]</span>
          <span>[ status: exploring ]</span>
          <span>[ focus: building things that ship ]</span>
        </div>
        <div className="replica-scroll">scroll to descend</div>
      </section>

      <section id="systems" className="replica-preview">
        <div>
          <p>// systems_i build</p>
          <h2>From raw data to reliable outcomes.</h2>
        </div>
        <div className="replica-timeline" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n}>0{n}</span>
          ))}
          <div />
        </div>
      </section>

      <section id="route" className="replica-work">
        <div className="replica-work-inner">
          <p className="replica-role">selected checkpoint</p>
          <h2>{firstProject.title}</h2>
          <p>{firstProject.summary}</p>
          <Link to="/projects">open work archive -&gt;</Link>
        </div>
      </section>
    </div>
  );
}
