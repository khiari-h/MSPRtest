// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'concert-title': ['Oswald', 'sans-serif'],
        'concert-body': ['Roboto', 'sans-serif'],
        'concert-description': ['Lora', 'serif'],
        'concert-subtitle': ['Montserrat', 'sans-serif'],
      },
      height: {
        '1/2-screen': '50vh',
      },
      colors: {
        'soft-beige': '#FAF0E6',
        'deep-purple': '#4C1D95',
        'vibrant-blue': '#1E3A8A',
        'charcoal': '#36454F',
        'concert-bg': '#1a1a2e',
        'concert-text': '#e94560',
        'concert-accent': '#0f3460',
        'concert-muted': '#f0e5cf',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
