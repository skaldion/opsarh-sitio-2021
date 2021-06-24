'use strict';

const path = require('path');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');

const fileDest = 'main.js';

const plugins = [
	babel({
		// Only transpile our source code
		exclude: 'node_modules/**',
		// Include the helpers in the bundle, at most one copy of each
		babelHelpers: 'bundled',
	}),
	nodeResolve(),
];
const external = ['jquery', 'popper'];
const globals = {
	jquery: 'jQuery', // Ensure we use jQuery which is always available even in noConflict mode
	popper: 'Popper'
};

module.exports = {
	input: path.resolve(__dirname, 'js/index.js'),
	output: {
		file: path.resolve(__dirname, `site/_processed/${fileDest}`),
		format: 'umd',
		globals,
		name: 'skaldion',
	},
	external,
	plugins,
};
