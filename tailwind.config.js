module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      typography: {
        invert: {
          css: {
            '--tw-prose-body': '#d1d5db',
            '--tw-prose-headings': '#f9fafb',
            '--tw-prose-links': '#60a5fa',
            '--tw-prose-bold': '#f9fafb',
            '--tw-prose-counters': '#9ca3af',
            '--tw-prose-bullets': '#6b7280',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
