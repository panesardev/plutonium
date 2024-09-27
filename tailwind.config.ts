/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#156b75',
        'secondary-1': '#e5faf9',
        'secondary-2': '#d8f8f5',
        'surface': '#ffffff',
        'text': '#134e4a',
      },
    },
  },
  plugins: [],
}
