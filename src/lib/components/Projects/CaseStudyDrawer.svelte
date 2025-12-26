<script lang="ts">
  import { tick } from "svelte";
  import { fade, fly } from "svelte/transition";
  import type { Project } from "$lib/content/projects";
  import { onMount } from "svelte";

  export let project: Project | null = null;

  let closeBtn: HTMLButtonElement | null = null;

  const close = () => (project = null);

  $: if (typeof document !== "undefined") {
    document.body.style.overflow = project ? "hidden" : "";
  }

  $: if (project) {
    tick().then(() => closeBtn?.focus());
  }

  onMount(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && project) close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });
</script>

{#if project}
  <div class="fixed inset-0 z-[60]">
    <button
      type="button"
      class="absolute inset-0 bg-black/60"
      aria-label="Close case study"
      on:click={close}
      transition:fade={{ duration: 120 }}
    ></button>

    <div
      class="absolute right-0 top-0 h-full w-full max-w-[560px] bg-white border-l border-black/10 shadow-soft"
      role="dialog"
      aria-modal="true"
      aria-label="Project case study"
      tabindex="-1"
      transition:fly={{ x: 24, duration: 140 }}
    >
      <div class="flex items-center justify-between gap-3 p-4 border-b border-stroke">
        <div>
          <div class="text-xs uppercase tracking-[0.22em] text-muted">Case study</div>
          <div class="mt-1 font-medium">{project.title}</div>
        </div>
        <button bind:this={closeBtn} class="btnGlass btnFloat rounded-lg px-3 py-2" on:click={close}>
          Close
        </button>
      </div>

      <div class="p-5 overflow-auto h-[calc(100%-64px)]">
        <p class="text-muted leading-relaxed">{project.oneLiner}</p>

        {#if project.caseStudy}
          <div class="mt-6 space-y-6">
            <section>
              <h4 class="font-medium">Problem</h4>
              <p class="mt-2 text-muted leading-relaxed">{project.caseStudy.problem}</p>
            </section>

            <section>
              <h4 class="font-medium">Approach</h4>
              <ul class="mt-2 space-y-1 text-muted">
                {#each project.caseStudy.approach as a}
                  <li>• {a}</li>
                {/each}
              </ul>
            </section>

            <section>
              <h4 class="font-medium">Results</h4>
              <ul class="mt-2 space-y-1 text-muted">
                {#each project.caseStudy.results as r}
                  <li>• {r}</li>
                {/each}
              </ul>
            </section>

            <section>
              <h4 class="font-medium">Tech notes</h4>
              <ul class="mt-2 space-y-1 text-muted">
                {#each project.caseStudy.techNotes as n}
                  <li>• {n}</li>
                {/each}
              </ul>
            </section>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}


