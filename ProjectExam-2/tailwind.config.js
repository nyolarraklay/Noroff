/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'background-home': "url(/src/assets/beach-bg.avif)",
        'background-home-lg': "url(/src/assets/beachcover.webp)",
        'background-color-navigation': "linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)",
        'background-destinations': "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        'background-button': "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        'background-venue': "linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)",
      }),
    },
  },
  plugins: [],
}

