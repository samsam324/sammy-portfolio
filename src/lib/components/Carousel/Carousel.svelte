<script lang="ts">
  import EmblaCarousel from "embla-carousel";
  import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
  import { onMount } from "svelte";

  type CarouselVariant = "focus" | "strip";
  type AutoScrollDir = "off" | "left" | "right";

  export let options: EmblaOptionsType = {
    align: "center",
    loop: false,
    skipSnaps: false,
    dragFree: false,
    startIndex: 1,
    watchDrag: false,
    containScroll: false
  };
  export let ariaLabel = "Carousel";
  export let showArrows = true;
  export let showDots = true;
  export let variant: CarouselVariant = "focus";
  export let autoScroll: AutoScrollDir = "off";
  export let autoScrollStepMs = 1400;
  export let autoScrollResumeMs = 3000;
  export let visibleNeighbors = 1;
  export let focusSlideWidth = "clamp(320px, 36vw, 520px)";
  export let unfocusedScale = 0.78;
  export let farScale = 0.7;

  let rootEl: HTMLDivElement | null = null;
  let viewport: HTMLDivElement | null = null;
  let embla: EmblaCarouselType | null = null;
  let selectedIndex = 0;
  let snapCount = 0;
  let canPrev = false;
  let canNext = false;
  let slideCleanup: Array<() => void> = [];
  let autoTimer: number | null = null;
  let resumeTimer: number | null = null;

  function updateSelection() {
    if (!embla || !viewport) return;
    selectedIndex = embla.selectedScrollSnap();
    snapCount = embla.scrollSnapList().length;
    canPrev = embla.canScrollPrev();
    canNext = embla.canScrollNext();

    if (variant !== "focus") return;
    if (!rootEl) return;

    const slides = embla.slideNodes() as HTMLElement[];
    slides.forEach((s, i) => {
      const abs = Math.abs(i - selectedIndex);
      s.classList.toggle("is-selected", abs === 0);
      s.classList.toggle("is-neighbor", abs > 0 && abs <= visibleNeighbors);
      s.classList.toggle("is-far", abs > visibleNeighbors);
    });

    const selected = slides[selectedIndex] ?? null;
    if (selected) {
      const slideRect = selected.getBoundingClientRect();
      const rootRect = rootEl.getBoundingClientRect();
      const y = slideRect.top - rootRect.top + slideRect.height / 2;
      rootEl.style.setProperty("--arrowY", `${Math.round(y)}px`);
    }
  }

  function prefersReducedMotion() {
    return typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
      : true;
  }

  function clearAutoTimer() {
    if (autoTimer != null) window.clearInterval(autoTimer);
    autoTimer = null;
  }

  function clearResumeTimer() {
    if (resumeTimer != null) window.clearTimeout(resumeTimer);
    resumeTimer = null;
  }

  function stopAutoScroll() {
    clearAutoTimer();
    clearResumeTimer();
  }

  function startAutoScroll() {
    if (!embla) return;
    if (autoScroll === "off") return;
    if (prefersReducedMotion()) return;
    clearAutoTimer();

    autoTimer = window.setInterval(() => {
      if (!embla) return;
      if (autoScroll === "left") {
        if (!embla.canScrollNext() && !options.loop) return;
        embla.scrollNext();
      } else if (autoScroll === "right") {
        if (!embla.canScrollPrev() && !options.loop) return;
        embla.scrollPrev();
      }
    }, autoScrollStepMs) as unknown as number;
  }

  function scheduleAutoResume() {
    if (autoScroll === "off") return;
    if (prefersReducedMotion()) return;
    clearResumeTimer();
    resumeTimer = window.setTimeout(() => startAutoScroll(), autoScrollResumeMs) as unknown as number;
  }

  function pauseAutoForInteraction() {
    if (autoScroll === "off") return;
    clearAutoTimer();
    scheduleAutoResume();
  }

  function wireSlideClicks() {
    slideCleanup.forEach((fn) => fn());
    slideCleanup = [];
    if (!embla || !viewport) return;

    const slides = Array.from(viewport.querySelectorAll(".embla__slide")) as HTMLElement[];
    slides.forEach((slide, i) => {
      const onClick = () => {
        pauseAutoForInteraction();
        embla?.scrollTo(i);
      };
      slide.addEventListener("click", onClick);
      slideCleanup.push(() => slide.removeEventListener("click", onClick));
    });
  }

  function scrollTo(i: number) {
    pauseAutoForInteraction();
    embla?.scrollTo(i);
  }

  function prev() {
    pauseAutoForInteraction();
    embla?.scrollPrev();
  }

  function next() {
    pauseAutoForInteraction();
    embla?.scrollNext();
  }

  onMount(() => {
    if (!viewport) return;
    embla = EmblaCarousel(viewport, options);
    embla.on("select", updateSelection);
    embla.on("reInit", updateSelection);
    embla.on("reInit", wireSlideClicks);
    updateSelection();
    wireSlideClicks();

    if (rootEl) {
      const onEnter = () => stopAutoScroll();
      const onLeave = () => scheduleAutoResume();
      rootEl.addEventListener("mouseenter", onEnter);
      rootEl.addEventListener("mouseleave", onLeave);
      slideCleanup.push(() => rootEl?.removeEventListener("mouseenter", onEnter));
      slideCleanup.push(() => rootEl?.removeEventListener("mouseleave", onLeave));
    }

    startAutoScroll();
    return () => {
      stopAutoScroll();
      slideCleanup.forEach((fn) => fn());
      slideCleanup = [];
      embla?.destroy();
    };
  });
</script>

<div
  class={"relative root " + (variant === "strip" ? "variantStrip" : "variantFocus")}
  bind:this={rootEl}
  style={`--slideW:${focusSlideWidth}; --unfocusedScale:${unfocusedScale}; --farScale:${farScale};`}
>
  <div class="embla" aria-label={ariaLabel}>
    <div class="embla__viewport" bind:this={viewport}>
      <div class="embla__container">
        <slot />
      </div>
    </div>
  </div>

  {#if showArrows}
    <button class="arrow arrowLeft" class:isDisabled={!canPrev} aria-label="Previous" on:click={prev} disabled={!canPrev}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15.5 5L8.5 12L15.5 19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <button class="arrow arrowRight" class:isDisabled={!canNext} aria-label="Next" on:click={next} disabled={!canNext}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.5 5L15.5 12L8.5 19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  {/if}

  {#if showDots && snapCount > 1}
    <div class="dots" aria-hidden="true">
      {#each Array(snapCount) as _, i (i)}
        <button
          class="dot {i === selectedIndex ? 'dotActive' : ''}"
          on:click={() => scrollTo(i)}
          aria-label={"Go to slide " + (i + 1)}
        />
      {/each}
    </div>
  {/if}
</div>

<style>
  .root {
    position: relative;
  }
  .embla {
    overflow: visible;
  }
  .variantFocus .embla__viewport {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);

    overflow: hidden;
    padding: 14px clamp(18px, 6vw, 96px) 120px;
    margin-bottom: -120px;
    position: relative;
  }
  .variantFocus .embla__container {
    display: flex;
    gap: 1.25rem;
    padding: 0;
    touch-action: pan-y;
    align-items: center;
  }
  .variantFocus :global(.embla__slide) {
    flex: 0 0 auto;
    width: var(--slideW);
    transform: scale(var(--unfocusedScale));
    opacity: 0.50;
    will-change: transform, opacity;
    transition: transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1),
      opacity 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .variantFocus :global(.embla__slide.is-selected) {
    transform: scale(1);
    opacity: 1;
  }

  .variantFocus :global(.embla__slide.is-far) {
    opacity: 0;
    pointer-events: none;
    transform: scale(var(--farScale));
  }

  .variantFocus :global(.embla__slide:not(.is-selected)) {
    cursor: pointer;
  }
  .variantFocus :global(.embla__slide:not(.is-selected) *) {
    pointer-events: none;
  }
  .variantFocus :global(.embla__slide.is-selected) {
    cursor: default;
  }

  .variantStrip .embla__viewport {
    overflow: hidden;
    padding: 10px 0 42px;
  }
  .variantStrip .embla__container {
    display: flex;
    gap: 0.75rem;
    padding: 0;
    align-items: center;
    touch-action: pan-y;
  }
  .variantStrip :global(.embla__slide) {
    flex: 0 0 auto;
    width: auto;
    transform: none;
    opacity: 1;
    filter: none;
    transition: none;
    cursor: pointer;
  }

  .arrow {
    position: absolute;
    top: var(--arrowY, 50%);
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    border-radius: 999px;
    border: 1px solid rgba(0, 0, 0, 0.10);
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(10px);
    box-shadow: 0 14px 34px rgba(10, 12, 16, 0.10);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: rgba(10, 12, 16, 0.75);
    transition: transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
    cursor: pointer;
    z-index: 2;
  }
  .arrow:hover {
    transform: translateY(calc(-50% - 2px));
    box-shadow: 0 18px 44px rgba(10, 12, 16, 0.14);
  }
  button.arrow:disabled,
  .isDisabled {
    opacity: 0.35;
    cursor: default;
    pointer-events: none;
    transform: translateY(-50%) !important;
    box-shadow: 0 14px 34px rgba(10, 12, 16, 0.08);
  }
  .arrow svg {
    width: 22px;
    height: 22px;
  }
  .arrowLeft {
    left: 10px;
  }
  .arrowRight {
    right: 10px;
  }

  .dots {
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 2;
  }
  .dot {
    width: 26px;
    height: 4px;
    border-radius: 999px;
    background: rgba(10, 12, 16, 0.16);
    border: none;
    padding: 0;
    cursor: pointer;
    transition: background 180ms ease, width 180ms ease;
  }
  .dotActive {
    width: 40px;
    background: rgba(10, 12, 16, 0.45);
  }

  @media (max-width: 520px) {
    .variantFocus :global(.embla__slide) {
      width: 86vw;
    }
    .arrow {
      width: 40px;
      height: 40px;
    }
    .arrowLeft {
      left: 6px;
    }
    .arrowRight {
      right: 6px;
    }
  }

  @media (max-width: 860px) {
    .variantFocus :global(.embla__slide) {
      width: 86vw;
    }
  }
</style>


