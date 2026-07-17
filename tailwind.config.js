/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // One constant brand color used everywhere (buttons, borders,
        // glows, text accents) instead of the old 3-color cyan/pink/blue
        // scheme. `success` stays a distinct green since that's a
        // conventional status color (online/success), not a theme color.
        primary: '#38C0E4',
        secondary: '#38C0E4',
        accent: '#38C0E4',
        success: '#22c55e',
      },
    },
  },
  plugins: [],
}