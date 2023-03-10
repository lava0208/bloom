/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    serverRuntimeConfig: {
        secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'https://bloom-chi.vercel.app/api' // production api
    },
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };

        return config;
    },
}

module.exports = nextConfig
