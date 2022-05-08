module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			screens: {
				sm: '520px',
				md: '768px',
				lg: '976px',
				xl: '1440px',
				xxl: '1536px',
			},
		},
		fontFamily: {
			sans: [
				'Montserrat',
				'Graphik',
				'sans-serif',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'BlinkMacSystemFont',
				'Segoe UI',
				'Roboto',
				'Helvetica Neue',
				'Arial',
				'Noto Sans',
				'sans-serif',
				'Apple Color Emoji',
				'Segoe UI Emoji',
				'Segoe UI Symbol',
				'Noto Color Emoji',
			],
			serif: ['Merriweather', 'serif'],
		},
	},
	plugins: [],
}
