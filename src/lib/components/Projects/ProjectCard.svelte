<script lang="ts">
  import type { Project } from "$lib/content/projects";

  export let project: Project;
  export let onOpenCaseStudy: ((project: Project) => void) | undefined = undefined;
  export let variant: "featured" | "grid" = "grid";
</script>

<article class="card overflow-hidden">
  <div class="aspect-[16/9] w-full overflow-hidden border-b border-white/10">
    <img
      src={project.image.src}
      alt={project.image.alt}
      class="h-full w-full object-cover"
      loading="lazy"
      decoding="async"
    />
  </div>
  <div class="p-5">
    <div class="flex items-start justify-between gap-3">
      <h3 class="font-medium">{project.title}</h3>
      {#if project.featured}
        <span class="text-xs text-muted">Featured</span>
      {/if}
    </div>
    <p class="mt-2 text-muted leading-relaxed">{project.oneLiner}</p>

    <div class="mt-3 flex flex-wrap gap-2">
      {#each project.stack.slice(0, variant === "featured" ? 6 : 4) as t}
        <span class="rounded-full border border-stroke px-2 py-1 text-xs text-muted">
          {t}
        </span>
      {/each}
    </div>

    {#if project.metrics?.length}
      <ul class="mt-4 space-y-1 text-sm text-muted">
        {#each project.metrics.slice(0, 2) as m}
          <li>• {m}</li>
        {/each}
      </ul>
    {/if}

    <div class="mt-4 flex flex-wrap items-center gap-3 text-sm">
      {#if project.caseStudy && onOpenCaseStudy}
        <button class="btnGlass btnFloat rounded-lg px-3 py-1.5" on:click={() => onOpenCaseStudy?.(project)}>
          Case study
        </button>
      {/if}

      <div class="ml-auto flex flex-wrap gap-3">
        {#each project.links as l}
          <a
            class="btnGlass btnFloat rounded-lg px-3 py-1.5"
            href={l.href}
            target="_blank"
            rel="noreferrer"
          >
            {l.label}
          </a>
        {/each}
      </div>
    </div>
  </div>
</article>


