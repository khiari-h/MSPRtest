/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        '1/2-screen': '50vh',
      },

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

