/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3A8600",
        secondary: "#9F9F9F",
        tertiary: "#E8E8E8",
      },
      fontFamily: {
        lato: ["lato", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-children")],
};
