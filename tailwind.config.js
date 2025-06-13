export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      primary: ["Outfit", "sans-serif"],
      secondary: ["Roboto Condensed", "sans-serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1192px",
    },
    extend: {
      colors: {
        primary: "#0E1112",
        grey: "#484B4B",
        accent: "#EEF7F9",
      },
    },
  },
  plugins: [],
};
