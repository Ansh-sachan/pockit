/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        background: "#F7F7F5",
        foreground: "#242424",
        muted: "#737373",
        border: "#E5E5E5",

        privacy: "#E3E9DF",
        privacyText: "#66705F",
      },
    },
  },

  plugins: [],
};