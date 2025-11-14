/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Brand Primary - Professional Blue (#3C8BDA)
        // Conveys: Trust, professionalism, reliability, competence
        primary: {
          DEFAULT: '#3C8BDA',
          50: '#E8F2FA',
          100: '#D1E6F5',
          200: '#A3D0EB',
          300: '#75BAE1',
          400: '#5CA2DC',
          500: '#3C8BDA',
          600: '#2D6BB0',
          700: '#205086',
          800: '#13355C',
          900: '#0A1E36',
          950: '#050F1B',
        },
        // Brand Secondary - Growth Green (#3EB875)
        // Conveys: Growth, prosperity, stability, harmony, success
        secondary: {
          DEFAULT: '#3EB875',
          50: '#E8F7F0',
          100: '#D1EFE1',
          200: '#A3E7C3',
          300: '#75DFA5',
          400: '#56D08D',
          500: '#3EB875',
          600: '#2F8B5A',
          700: '#20663F',
          800: '#134429',
          900: '#0A2214',
          950: '#05110A',
        },
        // Brand Accent - Innovation Orange (#FFA708)
        // Conveys: Energy, enthusiasm, creativity, confidence, action
        accent: {
          DEFAULT: '#FFA708',
          50: '#FFF8E6',
          100: '#FFF0CC',
          200: '#FFE199',
          300: '#FFD266',
          400: '#FFC233',
          500: '#FFA708',
          600: '#CC8606',
          700: '#996504',
          800: '#664403',
          900: '#332202',
          950: '#1A1101',
        },
        // Brand Neutral - Professional Gray (#767676)
        // Conveys: Sophistication, professionalism, balance, maturity
        neutral: {
          DEFAULT: '#767676',
          50: '#F5F5F5',
          100: '#E0E0E0',
          200: '#C2C2C2',
          300: '#A3A3A3',
          400: '#8C8C8C',
          500: '#767676',
          600: '#5E5E5E',
          700: '#464646',
          800: '#2E2E2E',
          900: '#1A1A1A',
          950: '#0D0D0D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', { lineHeight: '1.5' }],
        sm: ['clamp(0.875rem, 0.8rem + 0.35vw, 1rem)', { lineHeight: '1.5' }],
        base: ['clamp(1rem, 0.95rem + 0.25vw, 1.125rem)', { lineHeight: '1.5' }],
        lg: ['clamp(1.125rem, 1rem + 0.5vw, 1.25rem)', { lineHeight: '1.5' }],
        xl: ['clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)', { lineHeight: '1.4' }],
        '2xl': ['clamp(1.5rem, 1.3rem + 1vw, 2rem)', { lineHeight: '1.3' }],
        '3xl': ['clamp(1.875rem, 1.5rem + 1.5vw, 2.5rem)', { lineHeight: '1.2' }],
        '4xl': ['clamp(2.25rem, 1.8rem + 2vw, 3rem)', { lineHeight: '1.1' }],
        '5xl': ['clamp(3rem, 2.5rem + 2.5vw, 4rem)', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '120': '30rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'scroll-up': 'scrollUp 40s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scrollUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
