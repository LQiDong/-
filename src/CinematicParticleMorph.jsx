import { useEffect, useRef } from "react";
import dongtingUrl from "../背景图/洞庭.png";
import koiUrl from "../背景图/游鱼.png";
import { gsap, ScrollTrigger } from "./lib/gsap";
import "./particle-morph.css";

const TAU = Math.PI * 2;

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function drawCover(context, image, width, height) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  context.clearRect(0, 0, width, height);
  context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
}

function sampleImage(image, width, height, targetCount) {
  const offscreen = document.createElement("canvas");
  offscreen.width = width;
  offscreen.height = height;
  const context = offscreen.getContext("2d", { willReadFrequently: true });
  drawCover(context, image, width, height);
  const pixels = context.getImageData(0, 0, width, height).data;
  const step = Math.max(3, Math.sqrt((width * height) / targetCount));
  const points = [];

  for (let y = step / 2; y < height; y += step) {
    for (let x = step / 2; x < width; x += step) {
      const jitterX = Math.min(width - 1, Math.max(0, Math.floor(x + (Math.random() - 0.5) * step * 0.55)));
      const jitterY = Math.min(height - 1, Math.max(0, Math.floor(y + (Math.random() - 0.5) * step * 0.55)));
      const index = (jitterY * width + jitterX) * 4;
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];
      const luminance = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255;
      const keep = 0.5 + luminance * 0.5;
      if (Math.random() <= keep) points.push({ x: jitterX, y: jitterY, r, g, b, luminance });
    }
  }

  return points;
}

function easeInOut(value) {
  return value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;
}

export default function CinematicParticleMorph() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return undefined;

    const context = canvas.getContext("2d", { alpha: true });
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phase = { value: 0 };
    const pointer = { x: 0, y: 0, active: false };
    let width = 0;
    let height = 0;
    let frameId = 0;
    let timeline;
    let sceneXTo;
    let sceneYTo;
    let sceneRotateXTo;
    let sceneRotateYTo;
    let particles = [];
    let disposed = false;

    const resize = async () => {
      const rect = root.getBoundingClientRect();
      const nextWidth = Math.max(320, Math.round(rect.width));
      const nextHeight = Math.max(560, Math.round(rect.height));
      if (nextWidth === width && nextHeight === height && particles.length) return;

      width = nextWidth;
      height = nextHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.65);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const [startImage, endImage] = await Promise.all([loadImage(dongtingUrl), loadImage(koiUrl)]);
      if (disposed) return;
      const targetCount = width < 720 ? 2600 : 6200;
      const start = sampleImage(startImage, width, height, targetCount);
      const end = sampleImage(endImage, width, height, targetCount);
      const count = Math.min(start.length, end.length);
      particles = Array.from({ length: count }, (_, index) => {
        const a = start[index];
        const b = end[(index * 37) % end.length];
        const angle = Math.atan2(a.y - height / 2, a.x - width / 2) + (index % 31) * 0.045;
        const radius = Math.hypot(a.x - width / 2, a.y - height / 2);
        return {
          a,
          b,
          angle,
          radius,
          seed: (index * 0.61803398875) % 1,
          size: 0.55 + Math.random() * 1.55
        };
      });
    };

    const render = (time) => {
      frameId = requestAnimationFrame(render);
      context.clearRect(0, 0, width, height);
      if (!particles.length || reducedMotion) return;

      const p = phase.value;
      const outward = Math.sin(Math.PI * p);
      const split = p < 0.5 ? p * 2 : (p - 0.5) * 2;
      const local = easeInOut(split);
      const centerX = width / 2;
      const centerY = height / 2;
      const driftTime = time * 0.00016;
      context.globalCompositeOperation = "lighter";

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        const from = p < 0.5 ? particle.a : {
          x: centerX + Math.cos(particle.angle + 2.1) * (particle.radius + width * 0.38),
          y: centerY + Math.sin(particle.angle + 2.1) * (particle.radius * 0.5 + height * 0.18)
        };
        const to = p < 0.5 ? {
          x: centerX + Math.cos(particle.angle + 2.1) * (particle.radius + width * 0.38),
          y: centerY + Math.sin(particle.angle + 2.1) * (particle.radius * 0.5 + height * 0.18)
        } : particle.b;
        const wave = Math.sin(particle.seed * 18 + driftTime * 18 + p * 9);
        const curl = outward * (70 + particle.seed * 150);
        let x = from.x + (to.x - from.x) * local + Math.cos(particle.angle + p * 8) * curl * wave;
        let y = from.y + (to.y - from.y) * local + Math.sin(particle.angle + p * 7) * curl * wave * 0.58;

        if (pointer.active) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 130 && distance > 0) {
            const force = (1 - distance / 130) * 24;
            x += (dx / distance) * force;
            y += (dy / distance) * force;
          }
        }

        const source = p < 0.5 ? particle.a : particle.b;
        const shimmer = 0.52 + 0.46 * Math.sin(time * 0.003 + particle.seed * 43);
        const alpha = Math.min(0.96, 0.26 + shimmer * 0.54 + outward * 0.16);
        const tail = 1 + outward * (7 + particle.seed * 15);
        const tailAngle = particle.angle + p * 4.5;

        context.strokeStyle = `rgba(${source.r}, ${source.g}, ${source.b}, ${alpha * 0.25})`;
        context.lineWidth = Math.max(0.45, particle.size * 0.62);
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x - Math.cos(tailAngle) * tail, y - Math.sin(tailAngle) * tail);
        context.stroke();

        context.fillStyle = `rgba(${Math.min(255, source.r + 26)}, ${Math.min(255, source.g + 32)}, ${Math.min(255, source.b + 38)}, ${alpha})`;
        context.beginPath();
        context.arc(x, y, particle.size * (0.78 + shimmer * 0.38), 0, TAU);
        context.fill();
      }

      context.globalCompositeOperation = "source-over";
    };

    const buildTimeline = () => {
      if (reducedMotion) {
        gsap.set(root.querySelector(".morphStartFrame"), { autoAlpha: 1 });
        gsap.set(root.querySelector(".morphEndFrame"), { autoAlpha: 0 });
        return;
      }

      const startFrame = root.querySelector(".morphStartFrame");
      const endFrame = root.querySelector(".morphEndFrame");
      const ink = root.querySelector(".morphInkWash");
      const scene = root.querySelector(".morphScene");
      sceneXTo = gsap.quickTo(scene, "x", { duration: 0.9, ease: "power3.out" });
      sceneYTo = gsap.quickTo(scene, "y", { duration: 0.9, ease: "power3.out" });
      sceneRotateXTo = gsap.quickTo(scene, "rotationX", { duration: 1.1, ease: "power3.out" });
      sceneRotateYTo = gsap.quickTo(scene, "rotationY", { duration: 1.1, ease: "power3.out" });

      timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "portfolio-particle-story",
          trigger: "#top",
          start: "top top",
          endTrigger: ".dimensionGrid",
          end: "bottom bottom",
          scrub: 0.85,
          invalidateOnRefresh: true
        }
      });
      timeline
        .addLabel("dongting")
        .set(phase, { value: 0 })
        .set(startFrame, { autoAlpha: 1, scale: 1.015 })
        .set(endFrame, { autoAlpha: 0, scale: 1.06 })
        .to(startFrame, { scale: 1.045, duration: 1.6, ease: "sine.inOut" })
        .addLabel("about")
        .to(startFrame, { autoAlpha: 0, filter: "blur(9px) saturate(1.2)", duration: 1.15 })
        .to(phase, { value: 0.52, duration: 3.5, ease: "power2.inOut" }, "<")
        .addLabel("map")
        .fromTo(ink, { autoAlpha: 0, scale: 0.48, rotation: -10 }, { autoAlpha: 0.76, scale: 1.58, rotation: 10, duration: 2.2, ease: "expo.out" })
        .to(phase, { value: 0.82, duration: 2.2, ease: "power2.inOut" }, "<")
        .to(ink, { autoAlpha: 0, scale: 1.95, duration: 1.45, ease: "power2.in" }, ">-0.7")
        .addLabel("projects")
        .to(phase, { value: 1, duration: 2.2, ease: "power3.out" }, "<0.1")
        .to(endFrame, { autoAlpha: 1, scale: 1.015, filter: "blur(0px) saturate(1.08)", duration: 1.55, ease: "power3.out" }, "<0.35")
        .to(endFrame, { scale: 1.045, duration: 1.6, ease: "sine.inOut" });

      ScrollTrigger.refresh();
    };

    const onPointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      const normalizedX = event.clientX / Math.max(1, window.innerWidth) - 0.5;
      const normalizedY = event.clientY / Math.max(1, window.innerHeight) - 0.5;
      sceneXTo?.(normalizedX * -22);
      sceneYTo?.(normalizedY * -18);
      sceneRotateXTo?.(normalizedY * -2.6);
      sceneRotateYTo?.(normalizedX * 3.4);
    };
    const onPointerLeave = () => {
      pointer.active = false;
      sceneXTo?.(0);
      sceneYTo?.(0);
      sceneRotateXTo?.(0);
      sceneRotateYTo?.(0);
    };

    resize().then(() => {
      if (disposed) return;
      buildTimeline();
      render(performance.now());
    });
    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
      ScrollTrigger.getById("portfolio-particle-story")?.kill();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="cinematicParticleMorph" ref={rootRef} aria-hidden="true">
      <div className="morphScene">
        <img className="morphFrame morphStartFrame" src={dongtingUrl} alt="" />
        <img className="morphFrame morphEndFrame" src={koiUrl} alt="" />
        <canvas className="morphCanvas" ref={canvasRef} />
        <div className="morphInkWash" />
        <div className="morphStarField" />
      </div>
      <div className="morphVignette" />
    </div>
  );
}
