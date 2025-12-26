<script lang="ts">
  import { scrollIn } from "$lib/actions/scroll_in";
  const items = [
    {
      title: "What I build",
      body: "Tools, systems, and ideas that solve problems and actually get used.",
      metric: "practical by default"
    },
    {
      title: "How I work",
      body: "I move fast, but I care a lot about getting things right the first time.",
      metric: "fast and accurate"
    },
    {
      title: "What I focus on",
      body: "Understanding the problem deeply before jumping to solutions.",
      metric: "think first"
    },
    {
      title: "What I'm looking for",
      body: "Hard problems in competitive spaces where performance matters.",
      metric: "high stakes"
    }
  ];
</script>

<section id="about" data-section class="sectionY ambientSection">
  <div class="ambientLayer ambientLayer--soft" aria-hidden="true" />
  <div class="containerX">
    <header class="mb-10 max-w-3xl" use:scrollIn>
      <div class="text-xs uppercase tracking-[0.22em] text-muted">Who</div>
      <h2 class="mt-3 font-['Space_Grotesk',ui-sans-serif] text-3xl md:text-4xl font-semibold tracking-tight">
        About me
      </h2>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4" use:scrollIn={{ stagger: 0.07 }}>
      {#each items as it}
        <div class="card p-5">
          <div class="flex items-start justify-between gap-3">
            <div class="font-medium">{it.title}</div>
            <div class="text-xs text-muted">{it.metric}</div>
          </div>
          <p class="mt-2 text-muted leading-relaxed">{it.body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>


