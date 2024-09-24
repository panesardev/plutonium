/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#f2f9f9',
          '100': '#ddeff0',
          '200': '#bfe0e2',
          '300': '#93cacd',
          '400': '#5fabb1',
          '500': '#459198',
          '600': '#3b767f',
          '700': '#356169',
          '800': '#325158',
          '900': '#2d454c',
          '950': '#1a2c32',
          // '50': '#f1f8fa',
          // '100': '#ddedf0',
          // '200': '#bedbe3',
          // '300': '#91c1cf',
          // '400': '#70a9bc',
          // '500': '#428298',
          // '600': '#396b81',
          // '700': '#34596a',
          // '800': '#314b59',
          // '900': '#2c404d',
          // '950': '#192833',
        },
      },
    },
  },
  plugins: [],
}
