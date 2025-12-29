<script lang="ts">
  import { scrollIn } from "$lib/actions/scroll_in";
  import { site } from "$lib/content/site";
  const year = new Date().getFullYear();

  let copied = false;
  let copyTimer: number | null = null;

  async function copyEmail() {
    const text = site.email;
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }

    copied = ok;
    if (copyTimer != null) window.clearTimeout(copyTimer);
    copyTimer = window.setTimeout(() => (copied = false), 1400) as unknown as number;
  }
</script>

<section id="contact" data-section class="ambientSection pt-[var(--section-py)] pb-10 md:pb-12">
  <div class="ambientLayer ambientLayer--contact" aria-hidden="true"></div>
  <div class="containerX">
    <div class="card p-6 md:p-10" use:scrollIn>
      <div class="text-xs uppercase tracking-[0.22em] text-muted">Contact</div>
      <h2 class="mt-3 font-['Space_Grotesk',ui-sans-serif] text-3xl md:text-4xl font-semibold tracking-tight">
        Let’s build something together
      </h2>
      <p class="mt-3 max-w-2xl text-muted leading-relaxed">
        If you’re hiring for software roles in applied ML, systems, or quantitative finance, I’d love to talk.
      </p>

      <div class="mt-6 flex flex-wrap gap-3">
        <div class="relative">
          <button
            type="button"
            class="btnGlass btnFloat contactBtn inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold"
            class:isCopied={copied}
            on:click={copyEmail}
            aria-label={"Copy email address " + site.email}
          >
            <span class="copyLabelWrap" aria-hidden="true">
              <span class="copyLabel copyLabelEmail">Email</span>
              <span class="copyLabel copyLabelCopied">Copied</span>
            </span>
            <span class="srOnly">{copied ? "Copied" : "Email"}</span>
          </button>
        </div>
        <a class="btnGlass btnFloat contactBtn inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold" href={site.links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a class="btnGlass btnFloat contactBtn inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold" href={site.links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </div>

    <footer class="mt-8 pb-0 text-sm text-muted">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>© {year} {site.name}</div>
        <div class="opacity-70">Built with SvelteKit</div>
      </div>
    </footer>
  </div>
</section>

<style>
  .contactBtn {
    min-width: clamp(96px, 16vw, 120px);
  }

  @media (max-width: 420px) {
    .contactBtn {
      min-width: 88px;
      padding-left: 12px !important;
      padding-right: 12px !important;
      padding-top: 10px !important;
      padding-bottom: 10px !important;
      font-size: 0.875rem !important; /* ~text-sm */
    }
  }


  .copyLabelWrap {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 6ch;
    height: 1.25rem;
    line-height: 1.25rem;
  }
  .copyLabel {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    line-height: 1.25rem;
    transition: opacity 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .copyLabelEmail {
    opacity: 1;
  }
  .copyLabelCopied {
    opacity: 0;
  }
  button.isCopied .copyLabelEmail {
    opacity: 0;
  }
  button.isCopied .copyLabelCopied {
    opacity: 1;
  }

  .srOnly {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>


