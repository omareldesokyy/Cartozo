/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-.8rem)' },
        },
        slideX: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(.8rem)' },
        },
      },
      animation: {
        bounce: 'bounce 1s infinite',
        slideX: 'slideX 1s infinite',
      },
    },
  },
  plugins: [
  ],
}