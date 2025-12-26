<script lang="ts">
  import { scrollIn } from "$lib/actions/scroll_in";
  import { experience } from "$lib/content/experience";
</script>

<section id="experience" data-section class="sectionY ambientSection">
  <div class="ambientLayer ambientLayer--soft" aria-hidden="true"></div>
  <div class="containerX">
    <header class="mb-10 max-w-3xl" use:scrollIn>
      <div class="text-xs uppercase tracking-[0.22em] text-muted">Trajectory</div>
      <h2 class="mt-3 font-['Space_Grotesk',ui-sans-serif] text-3xl md:text-4xl font-semibold tracking-tight">
        Experience & leadership
      </h2>
    </header>

    <ol class="space-y-4" use:scrollIn={{ stagger: 0.08 }}>
      {#each experience as e (e.id)}
        <li class="card p-5">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div class="font-medium">{e.org}</div>
              <div class="mt-1 text-sm text-muted">{e.title}</div>
            </div>
            <div class="text-sm text-muted">{e.time}</div>
          </div>

          <ul class="mt-4 space-y-1 text-muted">
            {#each e.bullets as b}
              <li>• {b}</li>
            {/each}
          </ul>

          <div class="mt-4 flex flex-wrap gap-2">
            {#each e.tags as t}
              <span class="rounded-full border border-stroke px-2 py-1 text-xs text-muted">{t}</span>
            {/each}
          </div>
        </li>
      {/each}
    </ol>
  </div>
</section>


