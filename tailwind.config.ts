/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#156b75',
        'secondary-1': '#e1f9f8',
        'secondary-2': '#cff7f3',
        'surface': '#ffffff',
        'text': '#134e4a',
      },
    },
  },
  plugins: [],
}
