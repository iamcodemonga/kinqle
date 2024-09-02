/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./navigations/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#141414",
        "secondary": "#202124",
        "tertiary": "#A5A6A7",
        "inverse": "#ffffff",
        "accent": "#22B8BD",
      },
      fontFamily: {
        sansbold: ["Sans-bold"],
        sansmedium: ["Sans-medium"],
        sansregular: ["Sans-regular"]
      },
    },
  },
  plugins: [],
}

