<script lang="ts">
  import { scrollIn } from "$lib/actions/scroll_in";
  import { projects, type Project } from "$lib/content/projects";
  import ProjectCard from "./ProjectCard.svelte";
  import CaseStudyDrawer from "./CaseStudyDrawer.svelte";
  import Carousel from "$lib/components/Carousel/Carousel.svelte";

  let active: Project | null = null;
</script>

<section id="projects" data-section class="sectionY ambientSection">
  <div class="ambientLayer ambientLayer--projects" aria-hidden="true"></div>
  <div class="containerX">
    <header class="mb-10 max-w-3xl" use:scrollIn>
      <div class="text-xs uppercase tracking-[0.22em] text-muted">Work</div>
      <h2 class="mt-3 font-['Space_Grotesk',ui-sans-serif] text-3xl md:text-4xl font-semibold tracking-tight">
        Projects with real impact
      </h2>
    </header>

    <div class="mt-4" use:scrollIn>
      <Carousel ariaLabel="Projects carousel">
        {#each projects as p (p.id)}
          <div class="embla__slide">
            <ProjectCard project={p} variant={p.featured ? "featured" : "grid"} onOpenCaseStudy={(proj) => (active = proj)} />
          </div>
        {/each}
      </Carousel>
    </div>
  </div>
</section>

<CaseStudyDrawer bind:project={active} />


