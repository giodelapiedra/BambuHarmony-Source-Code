/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F0',
        cream: '#E8DDC8',
        forest: '#1F3D2B',
        bamboo: '#6F8F5F',
        gold: '#C8A96A',
        charcoal: '#2E2E2E',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Lora', 'serif'],
        sans: ['Inter', 'Manrope', 'Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
