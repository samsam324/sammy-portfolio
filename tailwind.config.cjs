/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        paper: 'rgb(var(--c-paper) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        stroke: 'rgb(var(--c-stroke) / <alpha-value>)',
        accentA: 'rgb(var(--c-accent-a) / <alpha-value>)',
        accentB: 'rgb(var(--c-accent-b) / <alpha-value>)'
      },
      borderRadius: {
        xl: '1.25rem'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0, 0, 0, 0.35)'
      }
    }
  },
  plugins: []
};


