/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic colors driven by CSS variables
        background: 'hsl(var(--bg))',
        surface: 'hsl(var(--surface))',
        muted: 'hsl(var(--muted))',
        border: 'hsl(var(--border))',
        primary: 'hsl(var(--primary))',
        primaryFg: 'hsl(var(--primary-fg))',
        secondary: 'hsl(var(--secondary))',
        secondaryFg: 'hsl(var(--secondary-fg))',
        accent: 'hsl(var(--accent))',
        accentFg: 'hsl(var(--accent-fg))',
      },
      borderRadius: {
        xl: '1.25rem',
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}