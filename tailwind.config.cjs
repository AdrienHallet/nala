/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			transitionProperty: {
				width: 'width',
        collapse: 'collapse'
			},
			keyframes: {
				pingpong: {
					'0%': { transform: 'translate(0%)' },
					'50%': { transform: 'translate(100%)' },
					'100%': { transform: 'translate(0%)' }
				}
			}
		}
	},
	variants: {
		extend: {
			backgroundColor: ['active']
		},
	},
	plugins: [],
	future: {
		// Disables hover on mobile, so we aren't stuck with hover style on touch
		hoverOnlyWhenSupported: true,
	}
};
