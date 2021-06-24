const fs = require('fs');
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
	eleventyConfig.setTemplateFormats(['ejs', 'md', 'html', 'txt']);

	eleventyConfig.setUseGitIgnore(false);

	eleventyConfig.addPassthroughCopy('images/');
	eleventyConfig.addPassthroughCopy({'js/app': 'assets/app'});
	eleventyConfig.addPassthroughCopy({ 'site/_processed': 'assets/' });

	eleventyConfig.setEjsOptions({
		rmWhitespace: true,
	});

	/* Markdown Overrides */
	let markdownLibrary = markdownIt({
		html: true,
		breaks: true,
		linkify: true
	});

	eleventyConfig.setLibrary("md", markdownLibrary);

	eleventyConfig.addCollection("latestPosts", function(collectionApi) {
		return collectionApi.getFilteredByTag('blog')
			.filter((item, index) => index < 6 )
			.sort((a, b) => b.date - a.date);
	});

	eleventyConfig.addCollection("sortedServices", function(collectionApi) {
		return collectionApi.getFilteredByTag('servicios').sort((a, b) => {
			return a.data.order - b.data.order;
		});
	});

	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: function (err, bs) {
				bs.addMiddleware('*', (req, res) => {
					const content_404 = fs.readFileSync('dist/404.html');
					// Provides the 404 content without redirect.
					res.write(content_404);
					// Add 404 http status code in request header.
					// res.writeHead(404, { "Content-Type": "text/html" });
					res.writeHead(404);
					res.end();
				});
			},
		},
	});

	return {
		dir: {
			input: 'site',
			output: 'dist',
			includes: '_includes',
			layouts: '_layouts',
			data: '_data',
			markdownTemplateEngine: 'ejs',
		},
	};
};
