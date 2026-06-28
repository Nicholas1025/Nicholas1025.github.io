import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

type DepthItem = {
  src: string;
  title: string;
  note: string;
  collection: string;
};

type PlaneRecord = {
  foreground: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  background: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  baseX: number;
  baseY: number;
  baseScale: number;
  aspect: number;
};

const planePattern = [
  { x: 0.08, y: 0.02, scale: 0.92 },
  { x: -0.06, y: -0.02, scale: 0.88 },
  { x: 0.1, y: 0.04, scale: 0.9 },
  { x: -0.08, y: 0, scale: 0.86 },
  { x: 0.06, y: -0.04, scale: 0.9 },
  { x: -0.1, y: 0.05, scale: 0.88 },
  { x: 0.08, y: 0, scale: 0.86 },
  { x: -0.06, y: -0.03, scale: 0.92 },
];

export default function EyeDepthGallery({ items }: { items: DepthItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const safeItems = useMemo(() => items.slice(0, 8), [items]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!section || !canvas || reduceMotion || safeItems.length === 0) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const textureLoader = new THREE.TextureLoader();
    const planes: PlaneRecord[] = [];
    const zGap = 5.2;
    const state = {
      progress: 0,
      easedProgress: 0,
      pointerX: 0,
      pointerY: 0,
      currentPointerX: 0,
      currentPointerY: 0,
      velocity: 0,
      active: 0,
    };

    const resize = () => {
      const width = section.clientWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      const compact = width < 760;
      planes.forEach((plane) => {
        const spread = compact ? 0.18 : 1;
        const scale = compact ? plane.baseScale * 0.72 : plane.baseScale;
        plane.foreground.scale.set(scale * plane.aspect, scale, 1);
        plane.foreground.position.x = plane.baseX * spread;
        plane.foreground.position.y = plane.baseY;
        plane.background.scale.set(scale * plane.aspect * 4.15, scale * 4.15, 1);
        plane.background.position.x = 0;
        plane.background.position.y = 0;
      });
    };

    safeItems.forEach((item, index) => {
      const pattern = planePattern[index % planePattern.length];
      const foregroundMaterial = new THREE.MeshBasicMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: index === 0 ? 1 : 0,
        depthWrite: false,
        toneMapped: false,
      });
      const backgroundMaterial = new THREE.MeshBasicMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: index === 0 ? 0.55 : 0,
        depthWrite: false,
        toneMapped: false,
      });
      const foreground = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), foregroundMaterial);
      const background = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), backgroundMaterial);
      foreground.position.set(pattern.x, pattern.y, -index * zGap);
      background.position.set(0, 0, -index * zGap - 0.55);
      foreground.renderOrder = safeItems.length * 2 - index;
      background.renderOrder = index;
      scene.add(background, foreground);

      const record: PlaneRecord = {
        foreground,
        background,
        baseX: pattern.x,
        baseY: pattern.y,
        baseScale: pattern.scale,
        aspect: 1,
      };
      planes.push(record);

      textureLoader.load(item.src, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 8;
        foregroundMaterial.map = texture;
        backgroundMaterial.map = texture;
        foregroundMaterial.needsUpdate = true;
        backgroundMaterial.needsUpdate = true;

        const image = texture.image as HTMLImageElement | undefined;
        if (image?.width && image?.height) {
          record.aspect = image.width / image.height;
          resize();
        }
      });
    });

    const onPointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      state.pointerX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      state.pointerY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const onPointerLeave = () => {
      state.pointerX = 0;
      state.pointerY = 0;
    };

    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${Math.max(4200, safeItems.length * 680)}`,
      scrub: 1.1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        state.velocity = gsap.utils.clamp(-1, 1, self.getVelocity() / 2200);
        state.progress = self.progress;
      },
    });

    let animationFrame = 0;
    const render = () => {
      animationFrame = window.requestAnimationFrame(render);

      state.easedProgress = THREE.MathUtils.lerp(state.easedProgress, state.progress, 0.085);
      state.currentPointerX = THREE.MathUtils.lerp(state.currentPointerX, state.pointerX, 0.07);
      state.currentPointerY = THREE.MathUtils.lerp(state.currentPointerY, state.pointerY, 0.07);

      const depth = state.easedProgress * (safeItems.length - 1) * zGap;
      camera.position.z = 5.2 - depth;
      camera.position.x = state.currentPointerX * 0.16;
      camera.position.y = state.currentPointerY * 0.08;

      const sampledIndex = Math.round(THREE.MathUtils.clamp(depth / zGap, 0, safeItems.length - 1));
      if (sampledIndex !== state.active) {
        state.active = sampledIndex;
        setActiveIndex(sampledIndex);
      }

      planes.forEach((plane, index) => {
        const localProgress = depth / zGap - index;
        const sweetDistance = Math.abs(localProgress);
        const foregroundOpacity = THREE.MathUtils.clamp(1 - sweetDistance * 1.45, 0, 1);
        const backgroundOpacity = THREE.MathUtils.clamp(0.62 - sweetDistance * 0.42, 0, 0.62);
        const velocityLift = Math.abs(state.velocity) * foregroundOpacity;
        const compact = section.clientWidth < 760;
        const baseScale = compact ? plane.baseScale * 0.72 : plane.baseScale;
        const passingScale = localProgress > 0 ? localProgress * 0.82 : 0;
        const incomingScale = localProgress < 0 ? -Math.abs(localProgress) * 0.16 : 0;
        const focusedScale = baseScale * (1 + passingScale + incomingScale + velocityLift * 0.035);
        const backgroundScale = baseScale * 4.15 * (1 + Math.max(localProgress, 0) * 0.34);

        plane.foreground.material.opacity = THREE.MathUtils.lerp(
          plane.foreground.material.opacity,
          foregroundOpacity,
          0.16,
        );
        plane.background.material.opacity = THREE.MathUtils.lerp(
          plane.background.material.opacity,
          backgroundOpacity,
          0.1,
        );
        plane.foreground.rotation.x = -state.currentPointerY * 0.045 * foregroundOpacity;
        plane.foreground.rotation.y = state.currentPointerX * 0.06 * foregroundOpacity;
        plane.background.rotation.x = -state.currentPointerY * 0.014 * backgroundOpacity;
        plane.background.rotation.y = state.currentPointerX * 0.018 * backgroundOpacity;
        plane.foreground.position.x = plane.baseX + state.currentPointerX * 0.1 * foregroundOpacity;
        plane.foreground.position.y = plane.baseY + state.velocity * 0.18 * foregroundOpacity;
        plane.background.position.x = -state.currentPointerX * 0.24 * backgroundOpacity;
        plane.background.position.y = state.currentPointerY * 0.12 * backgroundOpacity;
        plane.foreground.scale.set(
          focusedScale * plane.aspect,
          focusedScale,
          1,
        );
        plane.background.scale.set(
          backgroundScale * plane.aspect,
          backgroundScale,
          1,
        );
      });

      renderer.render(scene, camera);
    };

    resize();
    render();
    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
      scrollTrigger.kill();
      planes.forEach((plane) => {
        plane.foreground.geometry.dispose();
        plane.foreground.material.map?.dispose();
        plane.foreground.material.dispose();
        plane.background.geometry.dispose();
        plane.background.material.dispose();
        scene.remove(plane.foreground, plane.background);
      });
      renderer.dispose();
    };
  }, [safeItems]);

  const active = safeItems[activeIndex] ?? safeItems[0];

  return (
    <section ref={sectionRef} className="eye-depth-section" aria-labelledby="eye-depth-title">
      <canvas ref={canvasRef} className="eye-depth-canvas" aria-hidden="true" />
      <div className="eye-depth-vignette" aria-hidden="true" />
      <div className="eye-depth-copy">
        <p>$ depth_gallery --sample=08</p>
        <h2 id="eye-depth-title">A slower way through the first frames.</h2>
      </div>
      <div className="eye-depth-label" aria-live="polite">
        <small>[{String(activeIndex + 1).padStart(2, "0")}]</small>
        <strong>{active?.title}</strong>
        <span>{active?.note}</span>
      </div>
      <div className="eye-depth-progress" aria-hidden="true">
        {safeItems.map((item, index) => (
          <span key={item.src} data-active={index === activeIndex ? "true" : undefined} />
        ))}
      </div>
    </section>
  );
}
