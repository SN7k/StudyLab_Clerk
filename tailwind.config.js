/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'shine': 'shine 1.5s ease-in-out',
      },
      keyframes: {
        shine: {
          '100%': { transform: 'skewX(-20deg) translateX(200%)' },
        },
      },
    },
  },
  plugins: [],
};