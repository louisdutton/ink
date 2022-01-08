/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	webpack: function (config, { isServer, dev }) {
		// Since Webpack 5 doesn't enable WebAssembly by default, we should do it manually
		config.experiments = { syncWebAssembly: true, topLevelAwait: true };

		// In prod mode and in the server bundle (the place where this "chunks" bug
		// appears), use the client static directory for the same .wasm bundle
		config.output.webassemblyModuleFilename =
			isServer && !dev ? '../static/wasm/[id].wasm' : 'static/wasm/[id].wasm';

		// Ensure the filename for the .wasm bundle is the same on both the client
		// and the server (as in any other mode the ID's won't match)
		config.optimization.moduleIds = 'named';

		return config;
	}
};
