/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
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
        "dark-3": "#3A3A3A",
        "dark-1.5": "#222222",
        "dark": "#000000",
        "dark-yellow": "#FFC01E",
        "dark-gray": "#B3B3B3",
        "light-gray": "#D3d3d3",
        "light-gray-2": "#3a3a3a",
        "light-green": "#00B8A3",
        "gold": "#FFC01E",
        "deep-gray": "rgba(49,49,49,0.8)",
      }
    },
  },
  plugins: [],
}

