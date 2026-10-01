/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: { 400: '#D4AF37', 500: '#C59B27', 600: '#A67C1E' },
        charcoal: { 800: '#1A1D20', 900: '#121416' },
        beige: { 100: '#F9F8F6', 200: '#F2EFE9', 300: '#E6E1D8' }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
