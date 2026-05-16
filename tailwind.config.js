/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // LOCKED PALETTE — only these four
        lime: '#9ccc65',
        'lime-dark': '#7ed957',
        white: '#FFFFFF',
        black: '#000000',
        // Functional grayscale derived from black at varying opacity (no separate colors)
        ink: {
          DEFAULT: '#000000',
          90: 'rgba(0,0,0,0.9)',
          80: 'rgba(0,0,0,0.8)',
          70: 'rgba(0,0,0,0.7)',
          60: 'rgba(0,0,0,0.6)',
          50: 'rgba(0,0,0,0.5)',
          40: 'rgba(0,0,0,0.4)',
          30: 'rgba(0,0,0,0.3)',
          20: 'rgba(0,0,0,0.2)',
          10: 'rgba(0,0,0,0.1)',
          5: 'rgba(0,0,0,0.05)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
};
