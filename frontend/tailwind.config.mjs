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
  			background: 'rgb(var(--background) / <alpha-value>)',
  			foreground: 'rgb(var(--foreground) / <alpha-value>)',
  			secondary: 'rgb(var(--secondary) / <alpha-value>)',
  			card: 'rgb(var(--card) / <alpha-value>)',
  			'card-foreground': 'rgb(var(--card-foreground) / <alpha-value>)',
  			primary: 'rgb(var(--primary) / <alpha-value>)',
  			'primary-foreground': 'rgb(var(--primary-foreground) / <alpha-value>)',
  			'secondary-foreground': 'rgb(var(--secondary-foreground) / <alpha-value>)',
  			border: 'rgb(var(--border) / <alpha-value>)',
  			input: 'rgb(var(--input) / <alpha-value>)',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			DEFAULT: 'var(--radius)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },

  plugins: [require("tailwindcss-animate")],
};
