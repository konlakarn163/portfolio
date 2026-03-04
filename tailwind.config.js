/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          dark: "var(--dark-theme)",
          orange: "var(--orange-color)",
          white: "var(--white-color)",
          violet: "var(--violet-color)",
          yellow: "var(--yellow-color)",
        },
      },
      fontFamily: {
        header: ["Michroma", "sans-serif"],
        body: ['"IBM Plex Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
