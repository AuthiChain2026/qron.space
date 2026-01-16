    // next.config.js
    module.exports = {
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'replicate.delivery',
            // pathname: '/xezq/**', // You can be more specific with pathname if desired
          },
        ],
      },
    };
    