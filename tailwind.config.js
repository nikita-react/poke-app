/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      "2xl": { max: "1535px" },

      xl: { max: "1280px" },

      lg: { max: "1024px" },

      md: { max: "768px" },

      sm: { max: "480px" },
    },
    container: {
      screens: {
        desktop: "1280px",
        laptop: "1024px",
        tablet: "768px",
        mobile: "480px",
        smallMobile: "375px",
      },
    },
  },
  plugins: [],
};
