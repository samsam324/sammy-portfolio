function prefersReducedMotion() {
  return typeof window !== "undefined"
    ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    : true;
}

export type ScrollInOptions = {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
};

export function scrollIn(node: HTMLElement, opts: ScrollInOptions = {}) {
  if (typeof window === "undefined") return {};
  if (prefersReducedMotion()) return {};

  const y = opts.y ?? 14;
  const duration = opts.duration ?? 0.7;
  // Keep API compatibility, but we implement triggering via IntersectionObserver.
  // `start` is ignored here (was a ScrollTrigger string like "top 80%").

  // If you apply this to a container, we’ll stagger its direct children.
  const children = Array.from(node.children) as HTMLElement[];
  const targets = children.length >= 3 ? children : [node];
  const stagger = children.length >= 3 ? opts.stagger ?? 0.06 : 0;

  // Initial state
  for (const t of targets) {
    t.style.opacity = "0";
    t.style.transform = `translate3d(0, ${y}px, 0)`;
    t.style.willChange = "transform, opacity";
    t.style.transitionProperty = "opacity, transform";
    t.style.transitionDuration = `${duration}s`;
    t.style.transitionTimingFunction = "cubic-bezier(0.2, 0.8, 0.2, 1)";
    t.style.transitionDelay = "0s";
  }

  const reveal = () => {
    targets.forEach((t, i) => {
      t.style.transitionDelay = `${i * stagger}s`;
      t.style.opacity = "1";
      t.style.transform = "translate3d(0, 0, 0)";
    });
  };

  // Trigger when the element enters roughly the bottom 80% of the viewport.
  let io: IntersectionObserver | null = null;
  if (typeof IntersectionObserver !== "undefined") {
    io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal();
          io?.disconnect();
          io = null;
        }
      },
      { root: null, rootMargin: "0px 0px -20% 0px", threshold: 0.01 }
    );
    io.observe(node);
  } else {
    // Very old browsers: reveal immediately.
    reveal();
  }

  return {
    destroy() {
      io?.disconnect();
      io = null;
    }
  };
}


