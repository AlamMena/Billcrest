/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      xs: "330px",
      // => @media (min-width: 640px) { ... }
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2x1": "1536px",
    },
  },
  plugins: [],
};
