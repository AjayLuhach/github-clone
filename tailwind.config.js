/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--bgColor-default)',
        subtle: 'var(--bgColor-muted)',
        insetBg: 'var(--bgColor-inset)',
        line: 'var(--borderColor-default)',
        emphasis: 'var(--borderColor-emphasis)',
        fg: 'var(--fgColor-default)',
        muted: 'var(--fgColor-muted)',
        accent: 'var(--fgColor-accent)',
        danger: 'var(--fgColor-danger)',
        btn: 'var(--button-default-bgColor-rest)',
        btnHover: 'var(--button-default-bgColor-hover)',
        counter: 'var(--bgColor-neutral-muted)',
        accentEmphasis: 'var(--bgColor-accent-emphasis)',
        tabActive: 'var(--underlineNav-borderColor-active)',
      },
      keyframes: {
        'slide-in-top': {
          '0%': { transform: 'translateY(-1rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'toast-progress': {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      animation: {
        'slide-in-top': 'slide-in-top 0.3s ease-out',
        'toast-progress': 'toast-progress linear',
      },
    },
  },
  plugins: [],
}
