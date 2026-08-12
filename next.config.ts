import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    staticPageGenerationTimeout: 120,
    devIndicators: false,
    images: {
        remotePatterns: []
    },
    serverExternalPackages: ["pino", "pino-pretty"],
    output: 'standalone',
};

export default nextConfig;