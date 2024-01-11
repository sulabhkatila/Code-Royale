/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-orange": "#FFA500",
        "dark-green": "#00FF00",
        "dark-orange": "#C17A0F",
        "dark-pink": "#FF375F",
        "dark-2": "#282828",
        "dark-1": "#1A1A1A",
        "dark-yellow": "#FFC01E",
        "dark-gray": "#B3B3B3",
        "light-gray": "#D3d3d3",
        "light-gray-2": "#3a3a3a",
        "light-green": "#00B8A3",
        "gold": "#8A6508",
      }
    },
  },
  plugins: [],
}

