/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-yellow": "#D4A82F",
        "primary-green": "#66917C",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
        roboto: ["Roboto", "sans-serif"],
        bree: ["Bree Serif", "serif"],
        opensans: ["Open Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
