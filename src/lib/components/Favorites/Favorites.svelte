<script lang="ts">
  import { scrollIn } from "$lib/actions/scroll_in";
  import { favorites } from "$lib/content/favorites";
  import Carousel from "$lib/components/Carousel/Carousel.svelte";

  const featured = favorites.slice(0, 3);
  const rest = favorites.slice(3);
</script>

<section id="favorites" data-section class="sectionY ambientSection">
  <div class="ambientLayer ambientLayer--favorites" aria-hidden="true"></div>
  <div class="containerX">
    <header class="mb-10 max-w-3xl" use:scrollIn>
      <div class="text-xs uppercase tracking-[0.22em] text-muted">Library</div>
      <h2 class="mt-3 font-['Space_Grotesk',ui-sans-serif] text-3xl md:text-4xl font-semibold tracking-tight">
        My favorites
      </h2>
    </header>

    <div use:scrollIn>
      <div class="mt-4">
        <Carousel ariaLabel="Featured favorites">
          {#each featured as w (w.id)}
            <div class="embla__slide">
              <a href={w.href} class="card p-5 transition-colors block" target="_blank" rel="noreferrer">
                <div class="text-xs text-muted">{w.kind} • {w.author}</div>
                <div class="mt-2 font-medium leading-snug">{w.title}</div>
                <p class="mt-2 text-muted leading-relaxed">{w.note}</p>
                <div class="mt-4 text-sm text-ink">Open →</div>
              </a>
            </div>
          {/each}
        </Carousel>
      </div>
    </div>

    {#if rest.length}
      <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4" use:scrollIn={{ stagger: 0.06 }}>
        {#each rest as w (w.id)}
          <a href={w.href} class="card p-5 transition-colors" target="_blank" rel="noreferrer">
            <div class="text-xs text-muted">{w.kind} • {w.author}</div>
            <div class="mt-2 font-medium leading-snug">{w.title}</div>
            <p class="mt-2 text-muted leading-relaxed">{w.note}</p>
            <div class="mt-4 text-sm text-ink">Open →</div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</section>


