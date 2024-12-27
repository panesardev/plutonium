/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#156b75',
        'primary-hover': '#15646c',
        'secondary': '#e1f9f8',
        'secondary-hover': '#cff7f3',
      },
    },
  },
  plugins: [],
}
