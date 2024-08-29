/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins sans-serif"],
    },
    backgroundImage: {
      bannerBg: "url('./assets/Images/Homepage/Banner.png')",
      bannerBg2: "url('./assets/Images/Homepage/Banner2.jpg')",
      aboutBannerBg: "url('./assets/Images/Aboutus/Banner.jpg')",
  },
  screens: {
    'xs': '450px',
  },
    },
  },
  plugins: [],
}

