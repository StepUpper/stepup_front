/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'red': '#EF4444',
        'red-300': '#F87171',
        'blue-50': '#EFF6FF',
        'blue-400': '#60A5FA',
        'blue-700': '#1D42D8',
        'yellow-400': '#FBBF24',
        'grey-50': '#F5F5F5',
        'grey-400': '#808080',
        'grey-500': '#A1A1AA',
        'grey-600': '#71717A',
      },
      fontSize: {
        'heading': '20px',
        'body1': '18px',
        'body2': '16px',
        'body3': '14px',
        'caption1': '12px',
        'caption2': '10px',
      },
      fontWeight: {
        'paragraph': '400',
        'label': '600',
        'bold':'800'
      }
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};