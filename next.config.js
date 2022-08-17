const withPWA = require('next-pwa');

module.exports =
    process.env.NODE_ENV === 'development'
        ? {
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
          }
        : withPWA({
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
              pwa: {
                  dest: 'public',
                  register: true,
                  skipWaiting: true,
                  disable: process.env.NODE_ENV === 'development',
              },
          });
