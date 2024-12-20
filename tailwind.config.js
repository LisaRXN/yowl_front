/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Inclut les fichiers React
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        poppins: ["Poppins", "sans-serif"], // Police pour titres ou autres
        montserrat: ["Montserrat", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        jost: ["Jost", "sans-serif"],
        montUnderline: ["Montserrat Underline", "sans-serif"],
      },
      colors: {
        mygreen: "#00FECA",
        myyellow: "#FDF200",
        mypink: "#FF85EA",
        myviolet: "#7B61F8",
        myviolet_shade: "#f1effe",

        mygreen2: "#8AF7EA",
        mypink2: "#FDCBFC",
        myviolet2: "#C6BDEA",
        myblue2: "#48ADF1",
      },
      keyframes: {
        expand: {
          '0%': { content: '"YOWL"' },
          '33%': { content: '"Yo Op We Lo"' },
          '66%': { content: '"You Opin We Love"' },
          '100%': { content: '"Your Opinion We Love"' },
        },
      },
      animation: {
        expand: 'expand 3s steps(4, end) forwards',
      },
    },
  },
  plugins: [],
};
