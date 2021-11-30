/* eslint-disable global-require */
module.exports = {
  mode: 'jit',
  // important: true,
  purge: {
    enabled: true,
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: ['dark'], // specific classes
    },
  },
  darkMode: 'class',
  theme: {
    typography: () => ({
      dark: {
        css: {
          color: 'white',
        },
      },
    }),
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      screens: {
        xs: '475px',
      },
      colors: {
        primary: '#DC5A5B',
        'primary-light': '#f14445',
        'bg-dark-layer2': '#201E27',
        'bg-dark-layer1': '#16151D',
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
      },
      backgroundImage: {
        'linear-main':
          'linear-gradient(77deg,rgba(0,0,0,.7) 0,rgba(0,0,0,0) 85%)',
        'linear-full':
          'linear-gradient(77deg,rgba(0,0,0,.6) 0,rgba(0,0,0,.5) 85%)',
      },
    },
  },
  variants: {
    typography: ['dark'],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
