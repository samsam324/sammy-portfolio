<script lang="ts">
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { onMount } from "svelte";
  import { navSections, site } from "$lib/content/site";

  let isOpen = false;
  let activeId: string = "home";
  let menuButton: HTMLButtonElement | null = null;
  let isHidden = false;
  let navScrollLockUntil = 0;
  let navScrollLockActive = false;

  const resolveScroller = () => {
    const se = document.scrollingElement as HTMLElement | null;
    const html = document.documentElement;
    const body = document.body;
    try {
      const htmlOv = getComputedStyle(html).overflowY;
      const bodyOv = getComputedStyle(body).overflowY;
      if (htmlOv === "hidden" && (bodyOv === "auto" || bodyOv === "scroll")) return body;
    } catch {
    }
    return window;
  };

  const getScrollerY = (scroller: Window | HTMLElement) =>
    scroller === window ? window.scrollY ?? 0 : scroller.scrollTop ?? 0;

  function goTo(id: string) {
    const el = document.getElementById(id);
    navScrollLockUntil = Date.now() + 2200;
    navScrollLockActive = true;
    isHidden = false;

    if (el) {
      const scroller = resolveScroller();
      const currentY = getScrollerY(scroller);
      const targetY = currentY + el.getBoundingClientRect().top - 92;

      // iOS Safari can ignore smooth scroll calls in some cases. Use a safe fallback.
      try {
        scroller.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
        // If it didn't move, fall back to hash + instant scroll.
        window.setTimeout(() => {
          const after = getScrollerY(scroller);
          if (Math.abs(after - currentY) < 2) {
            history.replaceState(null, "", `#${id}`);
            el.scrollIntoView({ block: "start" });
            window.scrollTo({ top: Math.max(0, window.scrollY - 92), behavior: "auto" });
          }
        }, 50);
      } catch {
        history.replaceState(null, "", `#${id}`);
        el.scrollIntoView({ block: "start" });
        window.scrollTo({ top: Math.max(0, window.scrollY - 92), behavior: "auto" });
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
      window.setTimeout(() => ScrollTrigger.refresh(), 250);
      window.setTimeout(() => ScrollTrigger.refresh(), 700);
    }
    isOpen = false;
  }

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    const getScrollY = () => getScrollerY(resolveScroller());

    let lastY = getScrollY();
    let ticking = false;
    const scrollerEl = resolveScroller();

    const cancelNavLock = () => {
      navScrollLockUntil = 0;
      navScrollLockActive = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = getScrollY();
        const dy = y - lastY;

        if (y < 24 || isOpen) {
          isHidden = false;
          lastY = y;
          return;
        }

        if (navScrollLockActive && Date.now() < navScrollLockUntil) {
          isHidden = false;
          lastY = y;
          return;
        }
        navScrollLockActive = false;

        if (dy > 8) isHidden = true;
        if (dy < -8) isHidden = false;

        lastY = y;
      });
    };

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        isOpen = false;
        menuButton?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    scrollerEl.addEventListener("scroll", onScroll, { passive: true });

    window.addEventListener("wheel", cancelNavLock, { passive: true });
    window.addEventListener("touchstart", cancelNavLock, { passive: true });
    window.addEventListener("pointerdown", cancelNavLock, { passive: true });
    window.addEventListener("keydown", cancelNavLock);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        const id = visible?.target?.id;
        if (id) activeId = id;
      },
      { rootMargin: "-30% 0px -65% 0px", threshold: [0, 0.2, 0.6, 1] }
    );

    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      scrollerEl.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", cancelNavLock);
      window.removeEventListener("touchstart", cancelNavLock);
      window.removeEventListener("pointerdown", cancelNavLock);
      window.removeEventListener("keydown", cancelNavLock);
      io.disconnect();
    };
  });
</script>

<header class="fixed top-0 left-0 right-0 z-50 navShell" class:navHidden={isHidden}>
  <div class="mx-auto max-w-[1180px] px-[var(--container-px)] pt-4">
    <div class="glass flex items-center justify-between px-4 py-3 shadow-soft">
      <a href="#home" class="font-semibold tracking-tight" on:click|preventDefault={() => goTo("home")}>
        <span class="textGradient font-['Space_Grotesk',ui-sans-serif]">{site.name}</span>
      </a>

      <nav class="hidden md:flex items-center gap-6 text-sm text-muted">
        {#each navSections as s}
          <a
            href={"#" + s.id}
            class="navLink transition-colors hover:text-ink {activeId === s.id ? 'text-ink navActive' : ''}"
            on:click|preventDefault={() => goTo(s.id)}
          >
            {s.label}
          </a>
        {/each}
      </nav>

      <button
        class="btnGlass btnFloat md:hidden inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobileNav"
        bind:this={menuButton}
        on:click={() => (isOpen = !isOpen)}
      >
        {isOpen ? "Close" : "Menu"}
      </button>
    </div>

    {#if isOpen}
      <div class="mt-2 glass px-4 py-3 md:hidden">
        <nav id="mobileNav" class="flex flex-col gap-2 text-sm text-muted">
          {#each navSections as s}
            <a
              href={"#" + s.id}
              class="rounded-md px-2 py-2 hover:bg-black/5 {activeId === s.id ? 'text-ink font-semibold' : ''}"
              on:click|preventDefault={() => goTo(s.id)}
            >
              {s.label}
            </a>
          {/each}
        </nav>
      </div>
    {/if}
  </div>
</header>

<style>
  .navShell {
    transition: transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
    will-change: transform;
  }
  .navHidden {
    transform: translateY(calc(-100% - 10px));
  }

  .navLink {
    position: relative;
  }
  .navLink::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -10px;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, rgb(var(--c-accent-a)), rgb(var(--c-accent-b)));
    opacity: 0;
    transform: translateY(2px);
    transition: opacity 160ms ease, transform 160ms ease;
  }
  .navActive::after {
    opacity: 1;
    transform: translateY(0);
  }
</style>


