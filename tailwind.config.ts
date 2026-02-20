import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D4382C',
        secondary: '#2B6CB0',
        background: '#FFF8F0',
        card: '#FFFFFF',
        'text-primary': '#1A1A1A',
        'text-secondary': '#4A4A4A',
        border: '#E2D5C5',
        'gold-accent': '#FFD700',
        'save-green': '#2DB400',
        'kakao-yellow': '#FEE500',
        'background-dark': '#141e16',
        'primary-green': '#2b883d',
      },
      fontSize: {
        'senior-xs': '18px',
        'senior-sm': '20px',
        'senior-base': '20px',
        'senior-lg': '24px',
        'senior-xl': '28px',
        'senior-2xl': '32px',
      },
    },
  },
  plugins: [],
};
export default config;
