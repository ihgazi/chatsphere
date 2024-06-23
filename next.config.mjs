/** @type {import('next').NextConfig} */

const nextConfig = {
    // Using proxy to prevent CORS issues
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8800"}/:path*`,
            }
        ]
    }
};

export default nextConfig;
