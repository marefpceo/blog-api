/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pumpkin: '#ea7317',
        beige: '#eaf0ce',
        silver: '#c0c5c1',
        'slate-gray': '#7d8491',
        'english-violet': '#443850',
      },
    },
  },
  plugins: [],
};
