<script lang="ts">
  export let id: string;
  export let eyebrow: string | undefined = undefined;
  export let title: string | undefined = undefined;
  export let subtitle: string | undefined = undefined;
  export let className: string = "";
</script>

<section id={id} data-section class={"sectionY " + className}>
  <div class="containerX">
    {#if title || eyebrow || subtitle}
      <header class="mb-10 max-w-3xl">
        {#if eyebrow}
          <div class="text-xs uppercase tracking-[0.22em] text-muted">
            {eyebrow}
          </div>
        {/if}
        {#if title}
          <h2 class="mt-3 font-['Space_Grotesk',ui-sans-serif] text-3xl md:text-4xl font-semibold tracking-tight">
            {title}
          </h2>
        {/if}
        {#if subtitle}
          <p class="mt-3 text-muted leading-relaxed">
            {subtitle}
          </p>
        {/if}
      </header>
    {/if}

    <slot />
  </div>
</section>


