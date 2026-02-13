module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eaf6ff',
          100: '#d6f0ff',
          200: '#bfe6ff',
          300: '#99d9ff',
          400: '#66c0ff',
          500: '#1e90ff',
          600: '#1577e6',
          700: '#0f57b3',
          800: '#063480',
          900: '#021a40'
        },
        background: '#000000'
      }
    }
  },
  plugins: [],
}
