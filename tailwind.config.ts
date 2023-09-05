import { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import typo from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';
import daisyui from 'daisyui';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'plugins/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neutral: colors.neutral,
      },
    },
  },
  plugins: [
    typo,
    forms,
    aspectRatio,
    daisyui,
  ],
} satisfies Config;
