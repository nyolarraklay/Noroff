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
        'background-home-lg': "url(/src/assets/beachcover.webp)",

      }
    },
  },
  plugins: [],
}

