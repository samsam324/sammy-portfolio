<script lang="ts">
  import "../app.css";
  import Nav from "$lib/components/Nav/Nav.svelte";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="appShell">
  <div class="pageAmbient" aria-hidden="true" />
  <div class="pageCornerAmbient" aria-hidden="true" />
  <div class="appContent">
    <Nav />
    <slot />
  </div>
</div>
