/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#653E42',
        onprimary: '#FCFCFC',
        secondary: '#DF5386',
        onsecondary: '#F6CBDB',
        tertiary: '#E5F1EB',
        ontertiary: '#498467',
        tertiarydark: '#498467',
        ontertiarydark: '#FFFFFF',
        surface: '#F7F2F3',
        onsurface: '#261719',
        background: '#FEF2C3',
      },
    },
  },
  plugins: [],
}
