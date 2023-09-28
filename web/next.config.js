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
const nextConfig = {}

module.exports = nextConfig

