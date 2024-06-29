// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        '1/2-screen': '50vh',
      },
      colors: {
        'soft-beige': '#FAF0E6',
        'deep-purple': '#4C1D95',
        'vibrant-blue': '#1E3A8A',
        'charcoal': '#36454F',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
