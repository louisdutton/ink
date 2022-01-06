/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	webpack: function (config, options) {
		// config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm';
		// Since Webpack 5 doesn't enable WebAssembly by default, we should do it manually
		config.experiments = { syncWebAssembly: true, topLevelAwait: true };
		return config;
	}
};
