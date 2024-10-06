/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure all your .tsx files are included here
  ],
  theme: {
    extend: {
      colors: {
        neonGreen: '#39ff14', // Custom color used in the Footer component
      },
    },
  },
  plugins: [],
};
