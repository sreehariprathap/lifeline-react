/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["light"],
  },
  theme: {
    extend: {
      screens: {
        xsm: "0px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1836px",
        "4xl": "2236px",
      },
      colors: {
        "primary-color": "#3A8EF6",
        "dark-blue": "#1678F2",
        "secondary-color": "#6F3AFA",
        "primary-green": "#00BFA5",
        "primary-white": "#F2F7FF",
        "primary-black": "#0B132B",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui"),require('tailwind-scrollbar-hide')],
};
