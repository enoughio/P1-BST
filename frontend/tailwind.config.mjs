/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	extend: {
	  colors: {
		background: "rgb(var(--background) / <alpha-value>)",
		foreground: "rgb(var(--foreground) / <alpha-value>)",
		secondary: "rgb(var(--secondary) / <alpha-value>)",
		
		card: "rgb(var(--card) / <alpha-value>)",
		"card-foreground": "rgb(var(--card-foreground) / <alpha-value>)",
		
		primary: "rgb(var(--primary) / <alpha-value>)",
		"primary-foreground": "rgb(var(--primary-foreground) / <alpha-value>)",
		
		secondary: "rgb(var(--secondary) / <alpha-value>)",
		"secondary-foreground": "rgb(var(--secondary-foreground) / <alpha-value>)",
		
		border: "rgb(var(--border) / <alpha-value>)",
		input: "rgb(var(--input) / <alpha-value>)",

	  },
	  borderRadius: {
		DEFAULT: "var(--radius)",
	  },
	},
  },

  plugins: [require("tailwindcss-animate")],
};
