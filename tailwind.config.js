/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}", ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#030014", 
        secondary: "#151312", 
        light :{
          DEFAULT: "#F5F5F5",
          100: "#D6C6FF",
          200: "#AB85DB",
          300: "#9CA4AB",
        },
        dark :{
          DEFAULT: "#1A1A1A",
          100: "#221f3d",
          200: "#0f0d23",
        },
        accent: "#AB8BFF",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      
    },
  },
  plugins: [],
}