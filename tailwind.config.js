/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      outfit: ['Outfit', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#3D5A80',
        accent: '#F9C74F',
      },
    },
  },
  plugins: [],
};
