import { useCallback, useEffect, useRef, useState } from "react";
import BorderGlow from "./components/BorderGlow";
import { gsap } from "./lib/gsap";

export default function ProjectAccordion({
  activeProject,
  fallbackImage,
  onHoverSpot,
  onRotationChange,
  onSelectSpot,
  rotation,
  spots
}) {
  const frameRef = useRef(null);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const focusedIndex = ((rotation % spots.length) + spots.length) % spots.length;

  const focusProject = useCallback((index) => {
    const normalized = ((index % spots.length) + spots.length) % spots.length;
    onRotationChange(normalized);
    onHoverSpot(spots[normalized].id);
  }, [onHoverSpot, onRotationChange, spots]);

  useEffect(() => {
    const activeIndex = spots.findIndex((spot) => spot.project.id === activeProject.id);
    if (activeIndex >= 0) onRotationChange(activeIndex);
  }, [activeProject.id, onRotationChange, spots]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      const panels = gsap.utils.toArray(".projectAccordionPanel");
      const cards = gsap.utils.toArray(".projectAccordionCard");
      const activePanel = panels[focusedIndex];
      const activeCard = cards[focusedIndex];

      gsap.to(panels, {
        opacity: 0.72,
        scale: 0.97,
        y: 0,
        duration: reduceMotion ? 0 : 0.55,
        ease: "power2.out",
        overwrite: "auto"
      });
      gsap.to(cards, {
        scale: 1,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: reduceMotion ? 0 : 0.62,
        ease: "power3.out",
        overwrite: "auto"
      });
      if (activePanel) {
        gsap.to(activePanel, {
          opacity: 1,
          scale: 1,
          y: -8,
          duration: reduceMotion ? 0 : 0.58,
          ease: "power3.out",
          overwrite: "auto"
        });
      }
      if (activeCard) {
        gsap.fromTo(activeCard, { rotationX: 2.2, rotationY: -1.4 }, {
          rotationX: 0,
          rotationY: 0,
          scale: 1.012,
          duration: reduceMotion ? 0 : 0.7,
          ease: "expo.out",
          overwrite: "auto"
        });
      }
    }, frame);
    return () => context.revert();
  }, [focusedIndex]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      gsap.to(".tarotCardInner", {
        rotationY: (index) => index === flippedIndex ? 180 : 0,
        duration: reduceMotion ? 0 : 0.82,
        ease: "power3.inOut",
        stagger: 0.025,
        overwrite: "auto"
      });
    }, frame);
    return () => context.revert();
  }, [flippedIndex]);

  return (
    <div className="projectAccordion" ref={frameRef} aria-label="四个项目画廊">
      {spots.map((spot, index) => {
        const isActive = index === focusedIndex;
        return (
          <article
            aria-label={`打开项目：${spot.project.title}`}
            aria-pressed={flippedIndex === index}
            className={`projectAccordionPanel ${isActive ? "active" : ""}`}
            key={spot.id}
            onClick={() => {
              focusProject(index);
              setFlippedIndex((current) => current === index ? null : index);
            }}
            onFocus={() => focusProject(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                focusProject(index);
                setFlippedIndex((current) => current === index ? null : index);
              }
            }}
            onMouseEnter={() => focusProject(index)}
            onMouseLeave={() => onHoverSpot(null)}
            role="button"
            style={{ "--accent": spot.accent }}
            tabIndex={0}
          >
            <BorderGlow
              as="div"
              className="projectAccordionCard"
              backgroundColor="rgba(7, 13, 22, 0.84)"
              borderRadius={18}
              colors={["#b995ff", "#74d8e8", "#d9c6ff"]}
              coneSpread={22}
              edgeSensitivity={26}
              fillOpacity={0.18}
              glowColor="264 74 72"
              glowIntensity={isActive ? 1.15 : 0.46}
              glowRadius={30}
            >
              <div className="tarotCardInner">
                <div className="tarotFace tarotFront">
                  <img src={spot.project.image || fallbackImage} alt="" />
                  <span className="accordionShade" aria-hidden="true" />
                  <span className="accordionIndex">{String(index + 1).padStart(2, "0")}</span>
                  <span className="accordionSeason">{spot.label}</span>
                  <div className="accordionCopy">
                    <strong>{spot.project.title}</strong>
                    <small>{spot.project.type || spot.project.subtitle}</small>
                    <span className="accordionAction">点击翻开</span>
                  </div>
                </div>
                <div className="tarotFace tarotBack">
                  <span className="tarotSigil" aria-hidden="true">✦</span>
                  <small>{String(index + 1).padStart(2, "0")} / {spot.label}</small>
                  <strong>{spot.project.title}</strong>
                  <p>{spot.project.subtitle || spot.project.type}</p>
                  <button type="button" onClick={(event) => {
                    event.stopPropagation();
                    onSelectSpot(spot.id);
                  }}>进入项目 ↗</button>
                </div>
              </div>
            </BorderGlow>
          </article>
        );
      })}
    </div>
  );
}
