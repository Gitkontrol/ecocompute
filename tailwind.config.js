/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Comic Sans MS"', "cursive", "sans-serif"],
        shadows: [ "var(--font-shadows)", "cursive"],
        roboto: [ "var(--font-roboto)", "monospace" ],

      },
    },
  },
  plugins: [],
}