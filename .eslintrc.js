module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: ['airbnb-base', 'prettier'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		// quotes: ['error', 'single', { 'avoidEscape': true }],
		// 'no-mixed-spaces-and-tabs': "error",
		// indent: ["error", 'tab'],
		// 'no-floating-decimal': "error",
		// 'semi': ['error', 'always']
	},
};
