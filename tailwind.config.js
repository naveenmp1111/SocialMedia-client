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
        'custom-image': "url('https://gallery.yopriceville.com/var/albums/Space/Dark_Blue_Space_Wallpaper_HD.jpg?m=1629823241')",
        // 'custom-image': "url('https://cdn.wallpapersafari.com/21/7/pHK2e6.jpg')",
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

