/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
        roboto: ["Roboto", "sans-serif"],
        bree: ["Bree Serif", "serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
