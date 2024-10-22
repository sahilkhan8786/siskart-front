/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1650px',
        '4xl': '1860px',
        '5xl': '2475px',
        '6xl': '3400px',
      },
      fontFamily: {
        'poppin': 'Poppins'
      }
    },
  },
  plugins: [],
}