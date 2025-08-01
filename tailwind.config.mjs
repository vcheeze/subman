/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [require('tailwindcss-animate')],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },
        orange: {
          1: 'oklch(0.9923 0.0025 48.72)',
          2: 'oklch(0.9796 0.0158 73.68)',
          3: 'oklch(0.9583 0.0371 79.11)',
          4: 'oklch(0.92 0.0651 74.37)',
          5: 'oklch(0.8879 0.0875 71.31)',
          6: 'oklch(0.8537 0.1068 66.02)',
          7: 'oklch(0.8059 0.1123 59.96)',
          8: 'oklch(0.745 0.1322 54.68)',
          9: 'oklch(0.6908 0.1909 45.02)',
          10: 'oklch(0.6624 0.194559 43.4582)',
          11: 'oklch(0.5855 0.174261 42.7357)',
          12: 'oklch(0.3499 0.0685 40.83)',
        },
      },
    },
  },
}
