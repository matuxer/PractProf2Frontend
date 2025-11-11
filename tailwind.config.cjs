module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'gray-dark': '#010717',
        'primary': '#e1592c',
        'gray-lighter': '#FAF7F3',
        'gray-light': '#323232',
        'gray-txt': '#4c4d56',
        'gray-line': '#E5E5E5'
      },
      fontFamily: {
        'display': ['Manrope', 'sans-serif']
      }
    }
  },
  plugins: []
}