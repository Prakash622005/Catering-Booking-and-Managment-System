/** @type {import('tailwindcss').Config} */

export default {

  content: [

    "./index.html",

    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {

    extend: {

      colors: {

        primary: "#facc15",

        dark: "#111827",

        light: "#f3f4f6",
      },

      boxShadow: {

        card:
          "0 10px 25px rgba(0,0,0,0.1)",
      },

      borderRadius: {

        xl2: "1.5rem",
      }
    },
  },

  plugins: [],
};