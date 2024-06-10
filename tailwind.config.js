/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#156b75',
        'secondary': '#e5faf9',
        'tertiary': '#d8f8f5',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
