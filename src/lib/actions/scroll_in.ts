import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
let defaultsSet = false;
function ensure() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

function resolveScroller(): Window | HTMLElement {
  if (typeof window === "undefined") return window as unknown as Window;
  try {
    const html = document.documentElement;
    const body = document.body;
    const htmlOv = getComputedStyle(html).overflowY;
    const bodyOv = getComputedStyle(body).overflowY;

    // This project scrolls on <body> (html overflow hidden, body overflow auto).
    if (htmlOv === "hidden" && (bodyOv === "auto" || bodyOv === "scroll")) return body;
  } catch {
    // ignore
  }
  // Default: page scroll uses the window (ScrollTrigger's natural mode).
  return window;
}

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
  ensure();

  const scroller = resolveScroller();
  if (!defaultsSet) {
    defaultsSet = true;
    if (scroller !== window) ScrollTrigger.defaults({ scroller });
  }

  const y = opts.y ?? 14;
  const duration = opts.duration ?? 0.7;
  const start = opts.start ?? "top 80%";

  // If you apply this to a container, we’ll stagger its direct children.
  const children = Array.from(node.children) as HTMLElement[];
  const targets = children.length >= 3 ? children : [node];

  gsap.set(targets, { opacity: 0, y });

  const tween = gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration,
    ease: "power3.out",
    stagger: children.length >= 3 ? opts.stagger ?? 0.06 : 0,
    scrollTrigger: {
      trigger: node,
      start,
      once: true,
      scroller: scroller === window ? undefined : scroller
    }
  });

  // Some browser/layout features can delay trigger calculations until the next frame.
  // A one-time refresh avoids “stuck invisible until resize” edge cases.
  requestAnimationFrame(() => ScrollTrigger.refresh());

  return {
    destroy() {
      tween.scrollTrigger?.kill();
      tween.kill();
    }
  };
}


