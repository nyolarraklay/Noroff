/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background-home': "url(/src/assets/beach-bg.avif)",
      }
    },
  },
  plugins: [],
}

