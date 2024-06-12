/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom-size': '1405px',
        'right-nav-size':'1296px'
         // Define your custom size here
      },
    },
  },
  plugins: [],
}

