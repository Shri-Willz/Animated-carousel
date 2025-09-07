import type { Config } from "tailwindcss";
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
   theme: {
    extend: {
      translate: {
        '120': '30rem', // For -translate-x-120 (-480px)
      }
    }
  },
  plugins: [],
}