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
      backgroundImage: {
        'custom-image': "url('https://res.cloudinary.com/dwxhfdats/image/upload/v1722627006/bghs4xecy6mkqzfn9bc4.jpg')"
      },
      backgroundSize: {
        'cover': 'cover',
      },
      backgroundRepeat: {
        'no-repeat': 'no-repeat',
      },
    },
  },
  plugins: [],
}

