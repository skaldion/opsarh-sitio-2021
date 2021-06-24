module.exports = {
	environment: process.env.NODE_ENV,
	cssAssetURL: process.env.NODE_ENV === 'DEV' ? '/assets/styles.css' : '/assets/styles.min.css',
	jsAssetURL: process.env.NODE_ENV === 'DEV' ? '/assets/main.js' : '/assets/main.min.js',
	siteURL: '/',
};
