<script lang="ts">
  import { onMount } from "svelte";

  export let query: string;

  let mql: MediaQueryList | null = null;
  let mqlListener: ((ev: MediaQueryListEvent) => void) | null = null;
  let wasMounted = false;
  let matches = false;

  onMount(() => {
    wasMounted = true;
    addNewListener(query);
    return () => removeActiveListener();
  });

  $: if (wasMounted) {
      removeActiveListener();
      addNewListener(query);
    }

  function addNewListener(q: string) {
    mql = window.matchMedia(q);
    mqlListener = (ev: MediaQueryListEvent) => (matches = ev.matches);

    mql.addEventListener("change", mqlListener);

    matches = mql.matches;
  }

  function removeActiveListener() {
    if (!mql || !mqlListener) return;
    mql.removeEventListener("change", mqlListener);
    mql = null;
    mqlListener = null;
  }
</script>

<slot {matches} />
