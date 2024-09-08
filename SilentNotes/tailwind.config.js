/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:'#568203',
        secondary:'#FFFDD0',
        accent:'#E07A5F',
        textcolor:'#4B2E2E',
      }
    },
  },
  plugins: [],
};
