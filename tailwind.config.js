/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./<custom directory>/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        shape: "0 4px 6px rgba(0, 0, 0, 0.1)", // exemplo simplificado
      }
    },
  },
  plugins: [],
}

