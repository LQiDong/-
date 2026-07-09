import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { metrics, projects, siteContent, strengths } from "./content";

function Header() {
  const { header } = siteContent;

  return (
    <header className="siteHeader">
      <a className="logo" href="#top" aria-label={header.homeAriaLabel}>
        <span>{header.logoPrefix}</span>{header.logoText}<span>{header.logoSuffix}</span>
      </a>
      <nav aria-label={header.navAriaLabel}>
        {header.nav.map((item) => (
          <a href={item.href} key={item.href}>
            <span className="navRoll" data-copy={item.label}>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="headerTools">
        {header.badges.map((badge) => <span className="pill" key={badge}>{badge}</span>)}
        <a className="emailButton" href={`mailto:${header.email}`}>{header.email}</a>
      </div>
    </header>
  );
}

function RobotHeroLayer() {
  return (
    <div className="robotHeroLayer" aria-hidden="true">
      <div className="robotGrid" />
      <div className="robotAura" />
      <div className="robotFigure">
        <span className="robotAntenna" />
        <span className="robotHead">
          <i />
          <i />
        </span>
        <span className="robotNeck" />
        <span className="robotBody">
          <b />
          <b />
          <b />
        </span>
      </div>
      <span className="robotOrb robotOrbOne" />
      <span className="robotOrb robotOrbTwo" />
      <span className="robotSignal robotSignalOne" />
      <span className="robotSignal robotSignalTwo" />
    </div>
  );
}

function ParticleHeroTitle() {
  const canvasRef = useRef(null);
  const audioRef = useRef({ context: null, delay: null, gain: null, lastNote: 0, step: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    const particles = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let frameId = 0;
    let width = 0;
    let height = 0;

    const createParticles = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(320, rect.width);
      height = Math.max(220, rect.height);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#ffffff";
      context.textAlign = "center";
      context.textBaseline = "middle";

      const topSize = Math.min(width * 0.16, 148);
      const bottomSize = Math.min(width * 0.135, 126);
      context.font = `900 ${topSize}px Inter, Arial, sans-serif`;
      context.fillText("AI PRODUCT", width / 2, height * 0.38);
      context.font = `900 ${bottomSize}px Inter, Arial, sans-serif`;
      context.fillText("MANAGER", width / 2, height * 0.66);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
      context.clearRect(0, 0, width, height);
      particles.length = 0;

      const gap = width > 1200 ? 7 : 8;
      for (let y = 0; y < canvas.height; y += gap * dpr) {
        for (let x = 0; x < canvas.width; x += gap * dpr) {
          const index = (y * canvas.width + x) * 4 + 3;
          if (imageData[index] > 90) {
            const targetX = x / dpr;
            const targetY = y / dpr;
            particles.push({
              x: targetX + (Math.random() - 0.5) * width * 0.24,
              y: targetY + (Math.random() - 0.5) * height * 0.24,
              targetX,
              targetY,
              vx: 0,
              vy: 0,
              size: Math.random() * 1.35 + 0.65,
              alpha: Math.random() * 0.32 + 0.42
            });
          }
        }
      }
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      particles.forEach((particle) => {
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const radius = mouse.active ? 118 : 0;

        if (distance < radius) {
          const force = (1 - distance / radius) * 2.2;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force;
          particle.vy += Math.sin(angle) * force;
        }

        particle.vx += (particle.targetX - particle.x) * 0.018;
        particle.vy += (particle.targetY - particle.y) * 0.018;
        particle.vx *= 0.9;
        particle.vy *= 0.9;
        particle.x += particle.vx;
        particle.y += particle.vy;

        context.beginPath();
        context.fillStyle = `rgba(213, 246, 255, ${particle.alpha})`;
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      });

      context.globalCompositeOperation = "source-over";
    };

    const moveMouse = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    };

    const leaveMouse = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    createParticles();
    animate();
    canvas.addEventListener("pointermove", moveMouse);
    canvas.addEventListener("pointerleave", leaveMouse);
    window.addEventListener("resize", createParticles);

    return () => {
      cancelAnimationFrame(frameId);
      canvas.removeEventListener("pointermove", moveMouse);
      canvas.removeEventListener("pointerleave", leaveMouse);
      window.removeEventListener("resize", createParticles);
    };
  }, []);

  const playMusicBox = (event) => {
    const nowMs = performance.now();
    const audio = audioRef.current;
    if (nowMs - audio.lastNote < 420) return;
    audio.lastNote = nowMs;

    if (!audio.context) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      audio.context = new AudioContext();
      audio.gain = audio.context.createGain();
      audio.gain.gain.value = 0.18;
      audio.delay = audio.context.createDelay(1.2);
      audio.delay.delayTime.value = 0.24;
      const feedback = audio.context.createGain();
      feedback.gain.value = 0.18;
      audio.delay.connect(feedback);
      feedback.connect(audio.delay);
      audio.gain.connect(audio.delay);
      audio.gain.connect(audio.context.destination);
      audio.delay.connect(audio.context.destination);
    }

    if (audio.context.state === "suspended") {
      audio.context.resume();
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const sequence = [523.25, 659.25, 783.99, 987.77, 880, 739.99, 587.33, 698.46];
    const base = sequence[(audio.step + Math.floor(normalizedX * 3)) % sequence.length];
    audio.step += 1;

    const start = audio.context.currentTime;
    const osc = audio.context.createOscillator();
    const gain = audio.context.createGain();
    const filter = audio.context.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(base, start);
    osc.frequency.exponentialRampToValueAtTime(base * 2.01, start + 0.018);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(3600, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.07, start + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.35);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audio.gain);
    osc.start(start);
    osc.stop(start + 1.42);
  };

  return (
    <div className="particleTitle" onPointerMove={playMusicBox}>
      <canvas ref={canvasRef} aria-label={siteContent.hero.particleTitleAriaLabel} />
      <h1 className="visuallyHidden">AI PRODUCT MANAGER</h1>
    </div>
  );
}

function Hero() {
  const { hero } = siteContent;

  return (
    <section className="hero" id="top">
      <RobotHeroLayer />
      <div className="heroSpace" aria-hidden="true">
        <span className="orbit orbitOne" />
        <span className="orbit orbitTwo" />
        <span className="drift driftOne" />
        <span className="drift driftTwo" />
        <span className="drift driftThree" />
      </div>
      <div className="systemTags" aria-hidden="true">
        {hero.systemTags.map((tag, index) => (
          <span className={`systemTag ${["tagOne", "tagTwo", "tagThree", "tagFour"][index]}`} key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <div className="heroIntro">
        <span>{hero.introEyebrow}</span>
        <strong>{hero.introName}</strong>
      </div>
      <ParticleHeroTitle />
      <div className="heroMeta heroMetaLeft">
        <span>{hero.leftLabel}</span>
        <strong>{hero.leftText}</strong>
      </div>
      <div className="heroMeta heroMetaRight">
        <span>{hero.rightLabel}</span>
        <strong>{hero.rightText}</strong>
      </div>
      <div className="heroActions">
        {hero.actions.map((action) => (
          <a href={action.href} key={action.href}>{action.label}</a>
        ))}
      </div>
    </section>
  );
}

function About() {
  const { about } = siteContent;

  return (
    <section className="aboutSection" id="about">
      <div className="container aboutGrid">
        <aside className="idCard">
          <div className="idClamp" />
          <div className="idPhoto">
            <span>{about.cardName}</span>
          </div>
          <div className="idBody">
            <small>{about.cardMeta}</small>
            <h2>{about.cardName}</h2>
            <p>{about.cardRole}</p>
            <div className="idTags">
              {about.cardTags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>
        </aside>

        <div className="aboutCopy">
          <p className="sectionKicker">{about.kicker}</p>
          <h2>{about.title}</h2>
          {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="metricStrip">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const seasonSpots = [
  {
    id: "stock",
    season: siteContent.map.seasons.stock,
    label: "Spring",
    project: projects[0],
    accent: "#b9ffcf",
    gradient: "mint"
  },
  {
    id: "ad",
    season: siteContent.map.seasons.ad,
    label: "Summer",
    project: projects[1],
    accent: "#ffdf86",
    gradient: "gold"
  },
  {
    id: "agent",
    season: siteContent.map.seasons.agent,
    label: "Autumn",
    project: projects[2],
    accent: "#ffb36d",
    gradient: "ember"
  },
  {
    id: "winter",
    season: siteContent.map.seasons.winter,
    label: "Winter",
    project: siteContent.map.futureProject,
    accent: "#b7e8ff",
    gradient: "ice"
  }
];

const detailTabs = [
  { key: "vision", label: "项目愿景", en: "Vision" },
  { key: "intro", label: "项目介绍", en: "Brief" },
  { key: "ui", label: "UI 页面", en: "Interface" },
  { key: "eval", label: "效果评测", en: "Evaluation" }
];

function getProjectDetail(project) {
  const details = project.details?.length ? project.details : [project.subtitle, "这里预留项目建设过程、交付边界与下一阶段方向。"];

  return {
    vision: {
      title: "把真实业务问题，压缩成可验证的 AI 产品闭环",
      body: `${project.title} 的目标不是做一个展示型 demo，而是定义清楚用户任务、输入质量、判断标准与结果反馈，让每次交互都能被复盘。`,
      points: ["明确目标用户与高频场景", "建立从输入到评测的闭环", "把 AI 能力落到业务动作"]
    },
    intro: {
      title: project.subtitle,
      body: details[0],
      points: details
    },
    ui: {
      title: "从任务入口到结果解释，保持一条清晰路径",
      body: "页面结构按工作流拆分为输入、分析、建议与复盘。视觉上保留高级感，但优先让招聘/合作方一眼看懂产品判断。",
      points: ["任务输入区：约束用户目标和材料", "分析过程区：展示 AI 链路与置信度", "结果复盘区：沉淀指标、badcase 与下一步"]
    },
    eval: {
      title: "用样本、规则和复测，而不是主观体感证明效果",
      body: "评测围绕准确性、稳定性、解释性和业务可用性展开，保留样本来源、评分标准和失败案例。",
      points: ["核心指标：任务完成率 / 有效建议率 / 一致性", "评测方法：baseline 对比 + badcase 归因", "迭代方向：扩展样本、收敛提示词、补齐边界"]
    }
  };
}

function getProjectFromHash(hash) {
  const match = hash.match(/^#project\/(.+)$/);
  if (!match) return null;
  const id = decodeURIComponent(match[1]);
  return seasonSpots.find((spot) => spot.project.id === id)?.project || null;
}

function ProjectMap3D({ activeProject, hoverSpot, onHoverSpot, onSelectSpot }) {
  const mountRef = useRef(null);
  const activeRef = useRef(activeProject);
  const hoverRef = useRef(hoverSpot);

  useEffect(() => {
    activeRef.current = activeProject;
  }, [activeProject]);

  useEffect(() => {
    hoverRef.current = hoverSpot;
  }, [hoverSpot]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    scene.background = null;

    const aspect = mount.clientWidth / mount.clientHeight;
    const frustum = 7.8;
    const camera = new THREE.OrthographicCamera(
      (-frustum * aspect) / 2,
      (frustum * aspect) / 2,
      frustum / 2,
      -frustum / 2,
      0.1,
      100
    );
    camera.position.set(0, 8.8, 8.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const ambient = new THREE.AmbientLight(0x9fdfff, 1.7);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xfff2d4, 3.2);
    key.position.set(-3, 9, 4);
    key.castShadow = true;
    scene.add(key);

    const moon = new THREE.PointLight(0xbfefff, 4.2, 18);
    moon.position.set(4, 5, -4);
    scene.add(moon);

    const base = new THREE.Mesh(
      new THREE.BoxGeometry(11.4, 0.32, 6.2),
      new THREE.MeshToonMaterial({ color: 0x426b5c, transparent: true, opacity: 0.18 })
    );
    base.position.y = -0.04;
    base.receiveShadow = true;
    group.add(base);

    const meadow = new THREE.Mesh(
      new THREE.PlaneGeometry(10.8, 5.7, 32, 18),
      new THREE.MeshToonMaterial({ color: 0x5f8f6b, transparent: true, opacity: 0.2 })
    );
    meadow.rotation.x = -Math.PI / 2;
    meadow.position.y = 0.135;
    meadow.receiveShadow = true;
    group.add(meadow);

    const seasonalPatchMaterial = (color) =>
      new THREE.MeshToonMaterial({
        color,
        transparent: true,
        opacity: 0.24
      });

    [
      [-3.7, 1.45, 1.85, 1.28, 0xb7e8b1],
      [-1.08, -1.42, 1.95, 1.22, 0xd8b95d],
      [1.75, 0.92, 1.75, 1.18, 0xb8794d],
      [4.05, -1.28, 1.65, 1.12, 0xbaddec]
    ].forEach(([x, z, sx, sz, color]) => {
      const patch = new THREE.Mesh(
        new THREE.CircleGeometry(1, 64),
        seasonalPatchMaterial(color)
      );
      patch.scale.set(sx, sz, 1);
      patch.rotation.x = -Math.PI / 2;
      patch.position.set(x, 0.155, z);
      group.add(patch);
    });

    const floorGlow = new THREE.Mesh(
      new THREE.CircleGeometry(2.4, 96),
      new THREE.MeshBasicMaterial({ color: 0xfff0bd, transparent: true, opacity: 0.22, depthWrite: false })
    );
    floorGlow.rotation.x = -Math.PI / 2;
    floorGlow.position.set(0, 0.13, 0);
    group.add(floorGlow);

    const sigil = new THREE.Group();
    [0.7, 1.15, 1.62].forEach((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.01, 8, 96),
        new THREE.MeshBasicMaterial({
          color: index === 1 ? 0xffffff : 0xfff0bd,
          transparent: true,
          opacity: 0.28 - index * 0.04
        })
      );
      ring.rotation.x = Math.PI / 2;
      sigil.add(ring);
    });
    for (let i = 0; i < 8; i += 1) {
      const ray = new THREE.Mesh(
        new THREE.BoxGeometry(1.55, 0.012, 0.035),
        new THREE.MeshBasicMaterial({ color: 0xfff4c7, transparent: true, opacity: 0.2 })
      );
      ray.position.y = 0.16;
      ray.rotation.y = (Math.PI / 4) * i;
      sigil.add(ray);
    }
    sigil.position.y = 0.18;
    group.add(sigil);

    const pillarMaterial = new THREE.MeshToonMaterial({ color: 0x1d3845 });
    const flameMaterial = new THREE.MeshBasicMaterial({ color: 0xfff0bc, transparent: true, opacity: 0.88 });
    [
      [-4.95, -2.35],
      [-4.6, 2.42],
      [4.85, -2.16],
      [4.55, 2.25]
    ].forEach(([x, z], index) => {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.8 + index * 0.18, 0.24), pillarMaterial);
      pillar.position.set(x, 0.92, z);
      pillar.rotation.y = index * 0.36;
      pillar.castShadow = true;
      group.add(pillar);

      const flame = new THREE.Mesh(new THREE.SphereGeometry(0.13, 18, 18), flameMaterial);
      flame.position.set(x, 1.9 + index * 0.18, z);
      group.add(flame);

      const flameLight = new THREE.PointLight(0xffd99a, 1.2, 3.2);
      flameLight.position.copy(flame.position);
      scene.add(flameLight);
    });

    const cliffMaterial = new THREE.MeshToonMaterial({ color: 0x203f4d });
    [
      [-5.3, 0.9, 1.4, 0.45],
      [5.25, 0.55, 1.25, 0.36],
      [-1.8, 2.85, 1.1, 0.24],
      [2.6, -2.75, 1.5, 0.3]
    ].forEach(([x, z, radius, height]) => {
      const cliff = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.72, radius, height, 7), cliffMaterial);
      cliff.position.set(x, 0.1, z);
      cliff.castShadow = true;
      cliff.receiveShadow = true;
      group.add(cliff);
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-2, -2);
    const spotMeshes = [];
    const glows = new Map();

    const createPetal = (x, z, rotation, scale, color) => {
      const petal = new THREE.Mesh(
        new THREE.ConeGeometry(0.06 * scale, 0.34 * scale, 4),
        new THREE.MeshStandardMaterial({ color, roughness: 0.65 })
      );
      petal.position.set(x, 0.2, z);
      petal.rotation.set(Math.PI / 2, 0, rotation);
      group.add(petal);
    };

    seasonSpots.forEach((spot, index) => {
      const island = new THREE.Group();
      const pad = new THREE.Mesh(
        new THREE.CylinderGeometry(0.78, 0.92, 0.22, 56),
        new THREE.MeshToonMaterial({ color: spot.color })
      );
      pad.position.set(0, 0, 0);
      pad.castShadow = true;
      pad.userData.spotId = spot.id;
      spotMeshes.push(pad);
      island.add(pad);

      const glow = new THREE.Mesh(
        new THREE.CircleGeometry(1.1, 64),
        new THREE.MeshBasicMaterial({ color: spot.color, transparent: true, opacity: 0.08, depthWrite: false })
      );
      glow.rotation.x = -Math.PI / 2;
      glow.position.y = 0.14;
      island.add(glow);
      glows.set(spot.id, glow);

      if (spot.id === "stock") {
        for (let i = 0; i < 10; i += 1) {
          createPetal((Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 1.1, Math.random() * Math.PI, 1, 0xe8ffd8);
        }
      }

      if (spot.id === "ad") {
        const sun = new THREE.Mesh(
          new THREE.SphereGeometry(0.22, 24, 24),
          new THREE.MeshBasicMaterial({ color: 0xfff0a5 })
        );
        sun.position.set(0.2, 0.56, -0.12);
        island.add(sun);
      }

      if (spot.id === "agent") {
        const tree = new THREE.Mesh(
          new THREE.ConeGeometry(0.42, 0.92, 7),
          new THREE.MeshToonMaterial({ color: 0xb36d45 })
        );
        tree.position.set(0.05, 0.62, -0.08);
        tree.castShadow = true;
        island.add(tree);
      }

      if (spot.id === "winter") {
        const shard = new THREE.Mesh(
          new THREE.ConeGeometry(0.36, 1.02, 5),
          new THREE.MeshToonMaterial({ color: 0xd9f6ff })
        );
        shard.position.set(0, 0.62, 0);
        shard.castShadow = true;
        island.add(shard);
      }

      island.position.copy(spot.position);
      island.rotation.y = index * 0.24;
      group.add(island);
    });

    const routePoints = [
      new THREE.Vector3(-3.6, 0.34, 1.35),
      new THREE.Vector3(-2.8, 0.34, 0.25),
      new THREE.Vector3(-0.9, 0.34, -1.35),
      new THREE.Vector3(0.45, 0.34, -0.18),
      new THREE.Vector3(1.75, 0.34, 0.85),
      new THREE.Vector3(2.75, 0.34, -0.1),
      new THREE.Vector3(4, 0.34, -1.15)
    ];
    const routeCurve = new THREE.CatmullRomCurve3(routePoints, false, "catmullrom", 0.35);
    const routeTarget = {
      stock: 0,
      ad: 0.34,
      agent: 0.68,
      winter: 1
    };

    const pathGlow = new THREE.Mesh(
      new THREE.TubeGeometry(routeCurve, 160, 0.055, 10, false),
      new THREE.MeshBasicMaterial({ color: 0xfff0bd, transparent: true, opacity: 0.38 })
    );
    group.add(pathGlow);

    const pathStoneMaterial = new THREE.MeshToonMaterial({ color: 0xd8c8a7 });
    for (let i = 0; i <= 44; i += 1) {
      const t = i / 44;
      const point = routeCurve.getPointAt(t);
      const next = routeCurve.getPointAt(Math.min(1, t + 0.012));
      const stone = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.035, 0.34), pathStoneMaterial);
      stone.position.set(point.x, 0.26, point.z);
      stone.rotation.y = Math.atan2(next.x - point.x, next.z - point.z);
      stone.castShadow = true;
      stone.receiveShadow = true;
      group.add(stone);
    }

    const walker = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.14, 0.42, 8, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    body.position.y = 0.55;
    walker.add(body);
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xffffd8, transparent: true, opacity: 0.18, depthWrite: false })
    );
    halo.position.y = 0.58;
    walker.add(halo);
    group.add(walker);

    const fireflyMat = new THREE.MeshBasicMaterial({ color: 0xfff5cf, transparent: true, opacity: 0.72 });
    const fireflies = Array.from({ length: 34 }, () => {
      const fly = new THREE.Mesh(new THREE.SphereGeometry(Math.random() * 0.02 + 0.012, 8, 8), fireflyMat);
      fly.position.set((Math.random() - 0.5) * 10, Math.random() * 2.1 + 0.5, (Math.random() - 0.5) * 5.4);
      group.add(fly);
      return fly;
    });

    const mouse = { x: 0, y: 0 };
    const onPointerMove = (event) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(spotMeshes)[0];
      onHoverSpot(hit?.object.userData.spotId || null);
      mount.style.cursor = hit ? "pointer" : "grab";
    };
    mount.addEventListener("pointermove", onPointerMove);
    const onPointerLeave = () => onHoverSpot(null);
    const onClick = () => {
      if (hoverRef.current) {
        onSelectSpot(hoverRef.current);
      }
    };
    mount.addEventListener("pointerleave", onPointerLeave);
    mount.addEventListener("click", onClick);

    const onResize = () => {
      const nextAspect = mount.clientWidth / mount.clientHeight;
      camera.left = (-frustum * nextAspect) / 2;
      camera.right = (frustum * nextAspect) / 2;
      camera.top = frustum / 2;
      camera.bottom = -frustum / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let frameId = 0;
    let routeProgress = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;
      const hoverMoveSpot = seasonSpots.find((spot) => spot.id === hoverRef.current);
      const activeSpot = hoverMoveSpot || seasonSpots.find((spot) => spot.id === activeRef.current.id) || seasonSpots[0];
      const targetProgress = routeTarget[activeSpot.id] ?? 0;
      routeProgress += (targetProgress - routeProgress) * 0.018;
      const walkerPoint = routeCurve.getPointAt(THREE.MathUtils.clamp(routeProgress, 0, 1));
      const nextPoint = routeCurve.getPointAt(THREE.MathUtils.clamp(routeProgress + 0.01, 0, 1));
      walker.position.set(walkerPoint.x, 0.34 + Math.sin(time * 3.2) * 0.045, walkerPoint.z);
      walker.rotation.y = Math.atan2(nextPoint.x - walkerPoint.x, nextPoint.z - walkerPoint.z);
      floorGlow.material.opacity = 0.16 + Math.sin(time * 1.2) * 0.04;
      pathGlow.material.opacity = 0.28 + Math.sin(time * 1.1) * 0.08;

      glows.forEach((glow, id) => {
        const isLit = id === activeRef.current.id || id === hoverRef.current;
        glow.material.opacity += ((isLit ? 0.42 : 0.08) - glow.material.opacity) * 0.08;
        glow.scale.setScalar(glow.scale.x + ((isLit ? 1.38 : 1) - glow.scale.x) * 0.08);
      });

      fireflies.forEach((fly, index) => {
        fly.position.y += Math.sin(time + index) * 0.0015;
        fly.material.opacity = 0.42 + Math.sin(time * 1.4 + index) * 0.28;
      });

      group.rotation.y += (mouse.x * 0.11 - group.rotation.y) * 0.035;
      group.rotation.x += (-mouse.y * 0.055 - group.rotation.x) * 0.035;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerleave", onPointerLeave);
      mount.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [onHoverSpot, onSelectSpot]);

  return <div className="projectMapCanvas" ref={mountRef} aria-label={siteContent.map.canvasAriaLabel} />;
}

function ProjectCardOrbit({ activeProject, hoverSpotId, onHoverSpot, onSelectSpot }) {
  const [rotation, setRotation] = useState(0);
  const dragRef = useRef({ active: false, moved: false, startX: 0, startRotation: 0 });
  const activeSpot = seasonSpots.find((spot) => spot.project.id === activeProject.id) || seasonSpots[0];
  const focusedIndex = ((rotation % seasonSpots.length) + seasonSpots.length) % seasonSpots.length;
  const focusedSpot = seasonSpots[focusedIndex];
  const focusSpot = seasonSpots.find((spot) => spot.id === hoverSpotId) || focusedSpot || activeSpot;
  const rotateTo = useCallback((nextRotation) => {
    const normalized = ((nextRotation % seasonSpots.length) + seasonSpots.length) % seasonSpots.length;
    setRotation(normalized);
    onHoverSpot(seasonSpots[normalized].id);
  }, [onHoverSpot]);

  const handleWheel = useCallback((event) => {
    event.preventDefault();
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 8) return;
    rotateTo(rotation + (delta > 0 ? 1 : -1));
  }, [rotateTo, rotation]);

  const handlePointerDown = useCallback((event) => {
    dragRef.current = { active: true, moved: false, startX: event.clientX, startRotation: rotation };
    event.currentTarget.setPointerCapture(event.pointerId);
  }, [rotation]);

  const handlePointerMove = useCallback((event) => {
    if (!dragRef.current.active) return;
    const distance = event.clientX - dragRef.current.startX;
    if (Math.abs(distance) > 8) dragRef.current.moved = true;
    const nextRotation = dragRef.current.startRotation - Math.round(distance / 120);
    rotateTo(nextRotation);
  }, [rotateTo]);

  const stopDrag = useCallback((event) => {
    dragRef.current.active = false;
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  useEffect(() => {
    const activeIndex = seasonSpots.findIndex((spot) => spot.project.id === activeProject.id);
    if (activeIndex >= 0) setRotation(activeIndex);
  }, [activeProject.id]);

  return (
    <div
      className={`cardOrbitFrame theme-${focusSpot.gradient}`}
      aria-label={siteContent.map.canvasAriaLabel}
      onPointerCancel={stopDrag}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDrag}
      onWheel={handleWheel}
    >
      <div className="gradientField" aria-hidden="true" />
      <div className="orbitRail" aria-hidden="true" />
      <div className="rotatingCards" style={{ "--carousel-rotation": `${rotation * -90}deg` }}>
        {seasonSpots.map((spot, index) => {
          const isActive = activeProject.id === spot.project.id;
          const isHovered = hoverSpotId === spot.id;
          const cardRotation = index * 90;

          return (
            <a
              className={`orbitCard ${isActive ? "active" : ""} ${isHovered ? "hovered" : ""}`}
              href={`#project/${spot.project.id}`}
              key={spot.id}
              onClick={(event) => {
                if (dragRef.current.moved) {
                  event.preventDefault();
                  return;
                }
                rotateTo(index);
                onSelectSpot(spot.id);
              }}
              onMouseEnter={() => onHoverSpot(spot.id)}
              onMouseLeave={() => onHoverSpot(null)}
              style={{
                "--accent": spot.accent,
                "--card-rotation": `${cardRotation}deg`,
                "--delay": `${index * -1.7}s`
              }}
            >
              <img src={spot.project.image || projects[0].image} alt="" />
              <span className="orbitIndex">{spot.season}</span>
              <span className="orbitLabel">{spot.label}</span>
              <strong>{spot.project.title}</strong>
              <small>{spot.project.type || spot.project.subtitle}</small>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function ProjectMap() {
  const { map } = siteContent;
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [hoverSpotId, setHoverSpotId] = useState(null);
  const activeDetails = useMemo(() => activeProject.details, [activeProject]);
  const hoverSpot = seasonSpots.find((spot) => spot.id === hoverSpotId);
  const previewProject = hoverSpot?.project || activeProject;

  const openProjectPage = useCallback((spotId) => {
    const spot = seasonSpots.find((item) => item.id === spotId);
    if (!spot) return;

    setActiveProject(spot.project);
    window.location.hash = `project/${spot.project.id}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="mapSection" id="map">
      <div className="container">
        <div className="mapTitle">
          <p>{map.kicker}</p>
          <h2>{map.title}</h2>
          <span>{map.description}</span>
        </div>

        <div className="seasonFrame">
          <div className="mapContent">
            <ProjectCardOrbit
              activeProject={activeProject}
              hoverSpotId={hoverSpotId}
              onHoverSpot={setHoverSpotId}
              onSelectSpot={openProjectPage}
            />
            <aside className={`seasonPreview ${hoverSpot ? "isVisible" : ""}`} aria-hidden={!hoverSpot}>
              <small>{hoverSpot ? `${hoverSpot.season} · ${hoverSpot.label}` : ""}</small>
              <h3>{hoverSpot ? previewProject.title : ""}</h3>
              <p>{hoverSpot ? previewProject.subtitle : ""}</p>
              <button type="button" onClick={() => openProjectPage(previewProject.id)}>
                {map.enterButton}
              </button>
            </aside>
            <div className="seasonLegend">
              {seasonSpots.map((spot) => (
                <button
                  className={activeProject.id === spot.project.id ? "active" : ""}
                  key={spot.id}
                  onClick={() => openProjectPage(spot.id)}
                  onMouseEnter={() => setHoverSpotId(spot.id)}
                  onMouseLeave={() => setHoverSpotId(null)}
                  type="button"
                >
                  <span>{spot.season}</span>
                  {spot.project.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mapDetails">
          {activeDetails.map((detail) => <p key={detail}>{detail}</p>)}
        </div>
      </div>
    </section>
  );
}

function ProjectGallery() {
  const { gallery } = siteContent;

  return (
    <section className="gallerySection" id="projects">
      <div className="container">
        <div className="galleryTop">
          <h2>{gallery.title}</h2>
          <div className="galleryArrows" aria-hidden="true">
            <span>←</span>
            <span>→</span>
          </div>
        </div>
        <div className="projectScroller">
          {projects.map((project) => (
            <article className="galleryCard" id={`project-${project.id}`} key={project.id}>
              <img src={project.image} alt={`${project.title} ${gallery.imageAltSuffix}`} />
              <div>
                <h3>{project.title}</h3>
                <p>{project.type}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Strengths() {
  const { strengths: strengthsContent } = siteContent;

  return (
    <section className="strengthSection">
      <div className="container">
        <p className="sectionKicker">{strengthsContent.kicker}</p>
        <h2>{strengthsContent.title}</h2>
        <div className="strengthGrid">
          {strengths.map(([title, desc], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { contact } = siteContent;

  return (
    <section className="contactSection" id="contact">
      <div className="container contactGrid">
        <div className="contactImage">
          <div className="portraitBlack">
            <span>{contact.portraitLabel}</span>
            <strong>{contact.portraitName}</strong>
          </div>
        </div>
        <div className="contactCopy">
          <p className="sectionKicker">{contact.kicker}</p>
          <h2>{contact.title}</h2>
          <p>{contact.description}</p>
          <div className="contactLinks">
            {contact.links.map((link) => (
              link.type === "email"
                ? <a href={`mailto:${link.value}`} key={link.label}>{link.label}</a>
                : <span key={link.label}>{link.label}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DepthProjectPage({ project }) {
  const [activeTab, setActiveTab] = useState(0);
  const content = useMemo(() => getProjectDetail(project), [project]);
  const activeKey = detailTabs[activeTab].key;
  const activePanel = content[activeKey];

  const moveTab = useCallback((direction) => {
    setActiveTab((current) => (current + direction + detailTabs.length) % detailTabs.length);
  }, []);

  const handleWheel = useCallback((event) => {
    event.preventDefault();
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 8) return;
    moveTab(delta > 0 ? 1 : -1);
  }, [moveTab]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [project.id]);

  return (
    <main className="projectPage">
      <div className="projectPageBg" aria-hidden="true" />
      <div className="projectPageShell">
        <a className="projectBack" href="#map">← Back to Portfolio</a>

        <section className="projectHeroDetail">
          <p>{project.index || project.season} / AI Product Case</p>
          <h1>{project.title}</h1>
          <span>{project.subtitle}</span>
        </section>

        <section className="depthGallery" onWheel={handleWheel} aria-label={`${project.title} 项目详情`}>
          <div className="depthStage">
            {detailTabs.map((tab, index) => {
              const distance = index - activeTab;
              const absDistance = Math.abs(distance);
              const panel = content[tab.key];

              return (
                <article
                  className={`depthPanel ${index === activeTab ? "active" : ""}`}
                  key={tab.key}
                  style={{
                    "--depth-x": `${distance * 72}px`,
                    "--depth-z": `${-absDistance * 180}px`,
                    "--depth-rotate": `${distance * -8}deg`,
                    "--depth-opacity": index === activeTab ? 1 : Math.max(0.16, 0.5 - absDistance * 0.12),
                    "--depth-blur": `${Math.min(absDistance * 2, 6)}px`
                  }}
                >
                  <img src={project.image || projects[0].image} alt="" />
                  <div>
                    <small>{tab.en}</small>
                    <h2>{panel.title}</h2>
                    <p>{panel.body}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="depthCopy">
            <p className="sectionKicker">/ {detailTabs[activeTab].label}</p>
            <h2>{activePanel.title}</h2>
            <p>{activePanel.body}</p>
            <div className="detailPointGrid">
              {activePanel.points.map((point, index) => (
                <div key={point}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="depthControls">
            <button type="button" onClick={() => moveTab(-1)} aria-label="上一项">←</button>
            <div className="depthTabs">
              {detailTabs.map((tab, index) => (
                <button
                  className={index === activeTab ? "active" : ""}
                  key={tab.key}
                  onClick={() => setActiveTab(index)}
                  type="button"
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {tab.label}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => moveTab(1)} aria-label="下一项">→</button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function App() {
  const [routeProject, setRouteProject] = useState(() => getProjectFromHash(window.location.hash));

  useEffect(() => {
    const updateRoute = () => setRouteProject(getProjectFromHash(window.location.hash));
    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  if (routeProject) {
    return <DepthProjectPage project={routeProject} />;
  }

  return (
    <>
      <Header />
      <Hero />
      <About />
      <ProjectMap />
      <ProjectGallery />
      <Strengths />
      <Contact />
    </>
  );
}
