<script lang="ts">
  import { scrollIn } from "$lib/actions/scroll_in";
  import { skillBuckets } from "$lib/content/skills";
  import { onMount } from "svelte";

  const dirById: Record<string, "left" | "right"> = {
    languages: "right",
    tech_platforms: "left",
    math: "right"
  };

  let fontsReady = false;
  onMount(() => {
    let cleanup = () => {};

    const prefersReduced =
      typeof window !== "undefined"
        ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
        : true;
    if (prefersReduced) return cleanup;

    type State = {
      el: HTMLElement;
      track: HTMLElement;
      first: HTMLElement;
      loop: number;
      pos: number;
      drag: number;
      dragging: boolean;
      hovering: boolean;
      startX: number;
      startDrag: number;
      speed: number;
      dur: number;
      dir: number;
    };

    const parseSeconds = (raw: string) => {
      const v = raw.trim();
      if (!v) return 24;
      if (v.endsWith("ms")) return Number.parseFloat(v) / 1000;
      if (v.endsWith("s")) return Number.parseFloat(v);
      const n = Number.parseFloat(v);
      return Number.isFinite(n) ? n : 24;
    };

    const mod = (n: number, m: number) => ((n % m) + m) % m;

    const readGapPx = (el: HTMLElement) => {
      const cs = getComputedStyle(el);
      const raw = cs.columnGap || (cs as unknown as { gap?: string }).gap || "0px";
      const px = Number.parseFloat(raw);
      return Number.isFinite(px) ? px : 0;
    };

    (async () => {
      try {
        await (document as unknown as { fonts?: { ready?: Promise<unknown> } }).fonts?.ready;
      } catch {
      }
      fontsReady = true;

      const section = document.querySelector<HTMLElement>("#skills");
      const marquees = Array.from(document.querySelectorAll<HTMLElement>(".marquee"));
      const states: State[] = [];

      marquees.forEach((el) => {
        const track = el.querySelector<HTMLElement>(".marquee__track");
        const first = el.querySelector<HTMLElement>(".marquee__content");
        if (!track || !first) return;

        const dur = parseSeconds(getComputedStyle(el).getPropertyValue("--dur")) || 24;
        const dir = el.classList.contains("dirRight") ? -1 : 1;

        const st: State = {
          el,
          track,
          first,
          loop: 0,
          pos: 0,
          drag: 0,
          dragging: false,
          hovering: false,
          startX: 0,
          startDrag: 0,
          speed: 0,
          dur,
          dir
        };
        states.push(st);

        const onEnter = () => {
          el.classList.add("isHovering");
          st.hovering = true;
        };
        const onLeave = () => {
          el.classList.remove("isHovering");
          st.hovering = false;
        };
        const onDown = (e: PointerEvent) => {
          st.dragging = true;
          st.startX = e.clientX;
          st.startDrag = st.drag;
          el.classList.add("isDragging");
          try {
            el.setPointerCapture(e.pointerId);
          } catch {
          }
        };
        const onMove = (e: PointerEvent) => {
          if (!st.dragging) return;
          const dx = e.clientX - st.startX;
          st.drag = st.startDrag + dx;
        };
        const endDrag = (e: PointerEvent) => {
          st.dragging = false;
          el.classList.remove("isDragging");
          try {
            el.releasePointerCapture(e.pointerId);
          } catch {
          }

          if (st.loop > 0) st.pos = mod(st.pos - st.drag, st.loop);
          st.drag = 0;
        };

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        el.addEventListener("pointerdown", onDown);
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerup", endDrag);
        el.addEventListener("pointercancel", endDrag);

        cleanup = ((prev) => () => {
          prev();
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
          el.removeEventListener("pointerdown", onDown);
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerup", endDrag);
          el.removeEventListener("pointercancel", endDrag);
        })(cleanup);
      });

      let measureRaf = 0;
      const measure = () => {
        if (measureRaf) cancelAnimationFrame(measureRaf);
        measureRaf = requestAnimationFrame(() => {
          states.forEach((st) => {
            const w = st.first.scrollWidth;
            const gap = readGapPx(st.track);
            const loop = w + gap;
            st.loop = loop;
            st.speed = loop > 0 ? (st.dir * loop) / st.dur : 0;
            if (loop > 0) st.pos = mod(st.pos, loop);
          });
        });
      };

      measure();

      let ro: ResizeObserver | null = null;
      if (typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(() => measure());
        states.forEach((st) => ro?.observe(st.first));
        cleanup = ((prev) => () => {
          prev();
          ro?.disconnect();
        })(cleanup);
      }

      const onWinResize = () => measure();
      window.addEventListener("resize", onWinResize, { passive: true });
      cleanup = ((prev) => () => {
        prev();
        window.removeEventListener("resize", onWinResize);
      })(cleanup);

      let raf = 0;
      let running = false;
      let last = performance.now();

      const tick = (t: number) => {
        if (!running) return;
        raf = requestAnimationFrame(tick);
        const dt = Math.min(0.05, (t - last) / 1000);
        last = t;

        states.forEach((st) => {
          if (!st.loop) return;
          const paused = st.hovering || st.dragging;
          if (!paused) st.pos = mod(st.pos + st.speed * dt, st.loop);
          const effectiveOffset = mod(st.pos - st.drag, st.loop);
          st.track.style.transform = `translate3d(${-effectiveOffset}px, 0, 0)`;
        });
      };

      const start = () => {
        if (running) return;
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      };
      const stop = () => {
        running = false;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      };

      let io: IntersectionObserver | null = null;
      if (section && typeof IntersectionObserver !== "undefined") {
        io = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (entry?.isIntersecting) start();
            else stop();
          },
          { root: null, threshold: 0.01, rootMargin: "240px 0px" }
        );
        io.observe(section);
        cleanup = ((prev) => () => {
          prev();
          io?.disconnect();
        })(cleanup);
      } else {
        start();
      }

      cleanup = ((prev) => () => {
        prev();
        stop();
        if (measureRaf) cancelAnimationFrame(measureRaf);
      })(cleanup);
    })();

    return () => cleanup();
  });
</script>

<section id="skills" data-section class="sectionY ambientSection">
  <div class="ambientLayer ambientLayer--skills" aria-hidden="true"></div>
  <div class="containerX">
    <header class="mb-10 max-w-3xl" use:scrollIn>
      <div class="text-xs uppercase tracking-[0.22em] text-muted">Toolbox</div>
      <h2 class="mt-3 font-['Space_Grotesk',ui-sans-serif] text-3xl md:text-4xl font-semibold tracking-tight">
        Skills that ship
      </h2>
    </header>

    <div class="space-y-12" use:scrollIn>
      {#each skillBuckets as bucket (bucket.id)}
        <div class="skillBlock">
          <div class="skillHead">
            <div class="skillTitleRow">
              <span class="kicker">{bucket.title}</span>
            </div>
          </div>

          <div class="mt-4">
            <div
              class={"marquee " + (dirById[bucket.id] === "right" ? "dirRight" : "dirLeft")}
              class:ready={fontsReady}
              style={`--dur:${bucket.id === "tech_platforms" ? "28s" : "24s"}`}
              aria-label={bucket.title + " skills"}
            >
              <div class="marquee__inner">
                <div class="marquee__track">
                  <div class="marquee__content">
                    {#each bucket.items as it (bucket.id + "-" + it)}
                      <span class="item">{it}</span>
                    {/each}
                  </div>
                  <div class="marquee__content" aria-hidden="true">
                    {#each bucket.items as it (bucket.id + "-dup-" + it)}
                      <span class="item">{it}</span>
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .skillBlock {
    position: relative;
  }

  .skillHead {
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .skillTitleRow {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.55);
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 12px 28px rgba(10, 12, 16, 0.08);
  }

  .kicker {
    font-size: 0.9rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    font-weight: 750;
    color: rgba(var(--c-ink), 0.96);
  }

  .marquee {
    width: 100%;
    overflow: hidden;
    padding: 0.5rem var(--container-px);
    user-select: none;
    -webkit-user-select: none;
    cursor: grab;

    mask-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 1) 40px,
      rgba(0, 0, 0, 1) calc(100% - 40px),
      rgba(0, 0, 0, 0)
    );
    -webkit-mask-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 1) 40px,
      rgba(0, 0, 0, 1) calc(100% - 40px),
      rgba(0, 0, 0, 0)
    );
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-size: 100% 100%;
    -webkit-mask-size: 100% 100%;
  }
  .marquee.isDragging {
    cursor: grabbing;
  }

  .marquee__inner {
    display: flex;
    width: max-content;
    will-change: transform;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }

  .marquee__track {
    display: flex;
    width: max-content;
    transform: translate3d(var(--dragX, 0px), 0, 0);
    will-change: transform;

    gap: clamp(1.6rem, 3vw, 2.8rem);
  }

  .marquee__content {
    display: flex;
    align-items: center;
    gap: clamp(1.6rem, 3vw, 2.8rem);
    padding: 0;
    flex: 0 0 auto;
  }

  .item {
    font-size: clamp(0.95rem, 1.35vw, 1.08rem);
    color: rgba(var(--c-ink), 0.7);
    letter-spacing: 0.02em;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .marquee__inner {
      animation: none;
    }
  }
</style>
