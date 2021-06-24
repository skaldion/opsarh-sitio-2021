'use strict';

module.exports = () => ({
	map:
		process.env.NODE_ENV === 'DEV'
			? false
			: {
					inline: false,
					annotation: true,
					sourcesContent: true,
			  },
	plugins: {
		autoprefixer: {
			cascade: false,
		},
	},
});
