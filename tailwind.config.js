/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        buttonPrimary: "#4F46E5",
        bgInput: "#262B33",
        buttonSecondary: "rgb(99 102 241 / 1)",
        borderInput: "#282E36",
        borderFocus: "#1E2023",
        secondary: "#374151",
        background: "#1F2937",
        divider: "#303031",
        text: "#D1D5DB",
        error: "#EF4444",
      },
    },
  },
  plugins: [],
};
