/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'spacing': 'margin, padding',
      },
      colors: {
        'base-100': 'hsl(175, 70%, 97%)',
        'base-200': 'hsl(175, 70%, 94%)',
        'base-300': 'hsl(175, 70%, 91%)',
        'neutral': 'hsl(0, 0%, 100%)',
        'primary': 'hsl(186, 70%, 27%)',
        'secondary': 'hsl(194, 70%, 95%)',
        'info': 'hsl(213, 97%, 87%)',
        'success': 'hsl(156, 68%, 45%)',
        'warning': 'hsl(48, 97%, 77%)',
        'error': 'hsl(351, 93%, 59%)',
      },
    },
  },
  plugins: [],
}
