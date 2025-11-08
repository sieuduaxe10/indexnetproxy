// GsapMarquee.tsx
import React, {
  FC,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  HTMLAttributes,
  useEffect,
} from "react";
import { gsap } from "gsap";

type Direction = "left" | "right";

type GsapMarqueeProps = {
  children: ReactNode;
  className?: string;
  speed?: number; // px/s
  direction?: Direction; // "left" | "right"
  gap?: number; // gap between *items* inside a segment
  segmentGap?: number; // gap between *segment copies* (the seam)
  hoverTimeScale?: number; // timeScale while hovering an item
  pauseOnHoverTrack?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

export const GsapMarquee: FC<GsapMarqueeProps> = ({
  children,
  className = "",
  speed = 60,
  direction = "left",
  gap = 16,
  segmentGap, // NEW
  hoverTimeScale = 0.35,
  pauseOnHoverTrack = false,
  ...rest
}) => {
  const segGap = segmentGap ?? gap; // default: same as item gap
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Tween | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const baseSpeedRef = useRef(speed);
  const [dupCount, setDupCount] = useState(2);

  const isRight = direction === "right";

  const destroyTimeline = useCallback(() => {
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
  }, []);

  const setup = useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const wraps = Array.from(track.querySelectorAll<HTMLElement>(".gm-wrap"));
    const firstWrap = wraps[0];
    if (!firstWrap) return;

    // Width of ONE segment copy (content) — margin isn't included in width
    const segmentContentW = firstWrap.getBoundingClientRect().width;

    const containerW = container.getBoundingClientRect().width;

    // Animation moves by one full segment + the seam gap
    const segmentWWithGap = segmentContentW + segGap;

    // Ensure enough duplicates to cover > 2× container width
    const minNeeded = Math.max(
      2,
      Math.ceil((containerW * 2) / Math.max(1, segmentWWithGap))
    );
    if (minNeeded !== dupCount) {
      setDupCount(minNeeded);
      return; // re-run after render updates the count
    }

    // Reset transform
    gsap.set(track, { x: 0 });

    // Initial offset for right direction so it scrolls from right to left visually correct
    if (isRight) {
      gsap.set(track, { x: -segmentWWithGap });
    }

    const duration = segmentWWithGap / Math.max(1, baseSpeedRef.current);

    destroyTimeline();
    tlRef.current = gsap.to(track, {
      x: isRight ? 0 : -segmentWWithGap,
      duration,
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        const current = gsap.getProperty(track, "x") as number;
        const next = isRight
          ? current - segmentWWithGap
          : current + segmentWWithGap;
        gsap.set(track, { x: next });
      },
    });
  }, [destroyTimeline, dupCount, isRight, segGap]);

  // Build one segment (items with inner gap)
  const segment = useMemo(() => {
    return (
      <div className="gm-segment" style={{ display: "inline-flex", gap }}>
        {React.Children.map(children, (child, idx) => (
          <div
            key={idx}
            className="gm-item"
            style={{ display: "inline-flex", alignItems: "center" }}
            onMouseEnter={() => {
              if (!tlRef.current) return;
              gsap.to(tlRef.current, {
                timeScale: hoverTimeScale,
                duration: 0.2,
              });
            }}
            onMouseLeave={() => {
              if (!tlRef.current) return;
              gsap.to(tlRef.current, { timeScale: 1, duration: 0.25 });
            }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }, [children, gap, hoverTimeScale]);

  // Render duplicates; add marginRight = segmentGap to each copy
  const segments = useMemo(() => {
    return new Array(dupCount).fill(null).map((_, i) => (
      <div
        key={i}
        className="gm-wrap"
        style={{
          flex: "0 0 auto",
          display: "inline-block",
          marginRight: segGap, // <-- seam gap here
        }}
      >
        {segment}
      </div>
    ));
  }, [dupCount, segGap, segment]);

  // Initial mount & resize handling
  useLayoutEffect(() => {
    baseSpeedRef.current = speed; // base speed locked for duration math
    setup();

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    roRef.current?.disconnect();
    roRef.current = new ResizeObserver(() => {
      destroyTimeline();
      requestAnimationFrame(() => setup());
    });

    roRef.current.observe(container);
    roRef.current.observe(track);

    return () => {
      roRef.current?.disconnect();
      destroyTimeline();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setup, destroyTimeline, dupCount]);

  // If parent changes `speed`, scale time without rebuilding (no snap)
  useEffect(() => {
    if (!tlRef.current || !Number.isFinite(speed) || speed <= 0) return;
    const ratio = speed / baseSpeedRef.current;
    gsap.to(tlRef.current, {
      timeScale: ratio,
      duration: 0.25,
      ease: "power1.out",
    });
  }, [speed]);

  const onTrackEnter = pauseOnHoverTrack
    ? () =>
        tlRef.current &&
        gsap.to(tlRef.current, { timeScale: hoverTimeScale, duration: 0.2 })
    : undefined;
  const onTrackLeave = pauseOnHoverTrack
    ? () =>
        tlRef.current &&
        gsap.to(tlRef.current, { timeScale: 1, duration: 0.25 })
    : undefined;

  return (
    <div
      ref={containerRef}
      className={`gm-container ${className ?? ""}`}
      style={{ overflow: "hidden", width: "100%", position: "relative" }}
      {...rest}
    >
      <div
        ref={trackRef}
        className="gm-track"
        onMouseEnter={onTrackEnter}
        onMouseLeave={onTrackLeave}
        style={{
          display: "inline-flex",
          whiteSpace: "nowrap",
          willChange: "transform",
          alignItems: "center",
        }}
      >
        {segments}
      </div>
    </div>
  );
};

export default GsapMarquee;
