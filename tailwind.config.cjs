/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      lineClamp: {
        7: '7',
        8: '8',
      },
    },
  },
  plugins: [require('daisyui')],
};
