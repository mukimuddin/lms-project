/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // <- Important! Watch these files for tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
