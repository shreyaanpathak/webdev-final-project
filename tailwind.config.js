/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'gradient-shift': 'gradient-shift 15s ease infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      colors: {
        'app-black': '#111111',
        'app-dark': '#1A1A1A',
        'app-gold': '#FFB800',
        'app-gold-dark': '#CC9400'
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "cupcake", "luxury"],
  },
};
