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
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md:"2rem",
        xl: '3rem',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
  
}