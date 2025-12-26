<script lang="ts">
  import { site } from "$lib/content/site";
</script>

<section id="home" data-section class="pt-28 md:pt-32 pb-14 md:pb-20">
  <div class="containerX">
    <div class="relative overflow-hidden heroShell p-6 md:p-10 shadow-soft">
      <div class="relative heroRow">
        <div class="heroLeft">
          <div class="text-xs uppercase tracking-[0.22em] text-muted">
            {site.roleLine}
          </div>

          <h1
            class="mt-4 font-['Space_Grotesk',ui-sans-serif] text-4xl md:text-6xl font-semibold tracking-tight"
          >
            Hi, I’m <span class="textGradient">{site.name}</span>.
          </h1>

          <p class="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {site.pitch}
          </p>

          <div class="mt-6 text-xs text-muted">{site.locationLine}</div>
        </div>

        <div class="heroRight" aria-hidden="true">
          <div class="heroPortraitShell">
            <img
              class="heroPortraitImg"
              src="/images/professional_headshot.png"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .heroShell {
    border-radius: var(--radius);
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: rgba(255, 255, 255, 0.92);
    position: relative;
    box-shadow:
      0 22px 50px rgba(10, 12, 16, 0.12),
      0 0 60px rgba(255, 255, 255, 0.65);
  }

  @supports ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) {
    .heroShell {
      -webkit-backdrop-filter: blur(8px);
      backdrop-filter: blur(8px);
    }
  }

  .heroRow {
    display: flex;
    align-items: center;
    gap: clamp(24px, 3vw, 40px);
  }
  .heroLeft {
    flex: 0 1 auto;
    max-width: 42rem;
    min-width: 0;
  }
  .heroRight {
    flex: 0 0 auto;
  }
  .heroPortraitShell {
    width: clamp(170px, 24vw, 270px);
    aspect-ratio: 4 / 5;
    border-radius: 18px;
    box-shadow: 0 18px 44px rgba(10, 12, 16, 0.12);
    overflow: hidden;
    background: rgba(235, 244, 255, 0.95);
    border: 1px solid rgba(0, 102, 255, 0.12);
  }

  .heroPortraitImg {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center;
    user-select: none;
    -webkit-user-select: none;
    pointer-events: none;
  }

  @media (max-width: 860px) {
    .heroRow {
      flex-direction: column;
      align-items: stretch;
    }
    .heroRight {
      margin-top: 1.25rem;
      display: flex;
      justify-content: center;
    }
    .heroPortraitShell {
      width: min(360px, 86vw);
    }
  }
</style>


