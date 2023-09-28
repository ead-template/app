// const runtimeCaching = require("next-pwa/cache");
// const withPWA = require("next-pwa");
// const withTM = require("next-transpile-modules")(["moment"]);
//
// const isProduction = process.env.NODE_ENV === "production";
// /** @type {import('next').NextConfig} */
//
// const nextConfig = module.exports = withTM(
//     withPWA({
//         pwa: {
//             dest: "public",
//             register: true,
//             skipWaiting: true,
//             runtimeCaching,
//             disable: !isProduction,
//             buildExcludes: [/middleware-manifest.json$/],
//         },
//     })
// );
// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    webpack: (config, { webpack }) => {
        // Habilitar o topLevelAwait e outras experiências
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        };

        // Adicionar externals
        config.externals.push({
            sharp: "commonjs sharp",
            canvas: "commonjs canvas",
        });

        // Adicionar plugins
        config.plugins.push(
            new webpack.ProvidePlugin({
                Buffer: ["buffer", "Buffer"],
                process: "process/browser",
            })
        );

        // Adicionar regra para lidar com pdf.worker.js
        config.module.rules.unshift({
            test: /pdf\.worker\.(min\.)?js/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        name: "[contenthash].[ext]",
                        publicPath: "_next/static/worker",
                        outputPath: "static/worker",
                    },
                },
            ],
        });

        return config;
    },
};

module.exports = nextConfig;


