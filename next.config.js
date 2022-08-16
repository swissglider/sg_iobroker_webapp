module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/menu',
                permanent: true,
            },
        ];
    },
    reactStrictMode: true,
    swcMinify: true,
};
