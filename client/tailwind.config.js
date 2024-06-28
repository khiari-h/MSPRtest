/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        '1/2-screen': '50vh',
      },
      colors: {
        'indigo-soft': '#4B0082',
        'light-beige': '#F5F5DC',
        'midnight-blue': '#2C3E50',
        'dark-violet': '#6A1B9A',
        'sapphire-blue': '#0B3D91',
      },
    
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

