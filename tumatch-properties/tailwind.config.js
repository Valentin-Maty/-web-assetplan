const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        tumatch: {
          primary: '#FF6B6B',
          secondary: '#FF1493',
          accent: '#8A2BE2',
          dark: '#1A1F3A',
          darker: '#0F1425'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-tumatch': 'linear-gradient(135deg, #FF6B6B 0%, #FF1493 50%, #8A2BE2 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(255, 20, 147, 0.1) 50%, rgba(138, 43, 226, 0.1) 100%)'
      },
      backdropBlur: {
        xs: '2px',
        xl: '40px'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}