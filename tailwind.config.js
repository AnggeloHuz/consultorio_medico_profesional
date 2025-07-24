const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        'Montserrat': ["Montserrat", "serif"]
      },
      colors: {
        'Azul-Oscuro': '#2c5282',
        'Azul-claro': '#89CFF0',
        'Verde-claro': '#66CC99',
        'Naranja-claro': '#FFAA33',
        'Rojo-claro': '#FF6666',
        'Blanco': '#FFFFFF',
        'Negro': '#000000',
        'Gris-claro': '#ECECEC'
      },
      backgroundImage: {
        'Consultorio': "url('assets/consultorioMedico.jpg')",
        'LoginFondo': "url('assets/Login.jpg')"
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

