import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F2F8F8',
          100: '#E1EFEF',
          200: '#C2DFDF',
          300: '#94C7C8',
          400: '#5BA7AA',
          500: '#1A535C', // Primary Deep Forest Green
          600: '#15444C',
          700: '#11363D',
          800: '#0C262C',
          900: '#081A1E',
          deep: '#0F382C',
        },
        gold: {
          50: '#FBF8EF',
          100: '#F5EDD7',
          200: '#EBDAAF',
          300: '#DFC281',
          400: '#D4AA57',
          500: '#C8A35F', // Antique Gold
          600: '#B88E3E',
          700: '#9E7C3B',
          800: '#7C612E',
          900: '#5B4722',
        },
        ivory: {
          DEFAULT: '#FAF8F5',
          dark: '#F3EFEA',
          card: '#FFFFFF',
          border: '#E8E2D8',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(26, 83, 92, 0.08)',
        'card': '0 4px 20px -2px rgba(15, 56, 44, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'hover': '0 20px 40px -15px rgba(200, 163, 95, 0.15)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
