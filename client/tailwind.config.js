module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.html',
    './src/**/*.tsx'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#F4F5F7'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
