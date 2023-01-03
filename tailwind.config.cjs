/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			keyframes: {
				pingpong: {
					'0%': { transform: 'translate(0%)' },
					'50%': { transform: 'translate(100%)' },
					'100%': { transform: 'translate(0%)' }
				}
			}
		}
	},
	plugins: []
};
