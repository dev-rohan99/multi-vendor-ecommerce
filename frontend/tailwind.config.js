/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B74E4",
        secondary: "#2b2b2b",
        lightGray: "#9e9e9e",
        bgPrimary: "#f5f5f5",
        light_gray: "#5b626b",
        light_white: "#e6e6e6",
        light_bg: "#f0f3fb",
        danger: "#dc3545",
        success: "#198754",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
