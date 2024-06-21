/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        bgBlue: '#0A2647',
        bgBlueDark: '#2e5caf',
        textColor1: '#FFFFFF',
        cardColor: '#c8d2e0',
        textGray: '#5d6169',
        button: '#2e5caf',
        hoverButton: '#5d6169',
        textColor:'#0A2647'
      },
    },
  },
  corePlugins: {
    // ...
    variants: {},
  },
  plugins: [],
});

