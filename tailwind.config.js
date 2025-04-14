/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'sans': ["ui-sans-serif", "system-ui"]
    },
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1240px',
      'xxl': '1536px',
    },
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md:"1rem",
        lg:"1rem",
        xl: '1rem',
        xxl: '2rem',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
  
}