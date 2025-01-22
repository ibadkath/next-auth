 /** @type {import('next').NextConfig} */
 const nextConfig = {
    experimental: {
        appDir: true, // Ensure this is set since you're using the App Router
      },
      async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: '/api/:path*',
          //  permanent: true, // This ensures API routes are handled properly
          },
        ];
      }, 
 };

// module.exports = nextConfig;

 export default nextConfig;