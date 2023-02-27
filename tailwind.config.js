/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Archivo', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: '#265BFF',
          purple: '##8B9CFF',
          light: '#F5F5FF'
        },
        dark: {
          DEFAULT: '#1E2139',
          less: '#252945',
          heavy: '#141625'
        },
        light: {
          DEFAULT: '#E2E2E2'
        },
        accent: {
          DEFAULT: '#E7943A',
          light: '#FF9797'
        },
        grey: {
          DEFAULT: '#666666',
          light: '#DFE3FA',
          lighter: '##E9EAF1'
        }
      }
    }
  },
  plugins: []
}
