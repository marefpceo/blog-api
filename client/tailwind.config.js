/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cust-pumpkin': '#ea7317',
        'cust-beige': '#eaf0ce',
        'cust-silver': '#c0c5c1',
        'cust-slate-gray': '#7d8491',
        'cust-english-violet': '#443850',
      },
    },
  },
  plugins: [],
};
