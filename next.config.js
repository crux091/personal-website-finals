/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    swcPlugins: [],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Nest.js optional peer deps not needed in a serverless context
      const nestExternals = [
        '@nestjs/websockets/socket-module',
        '@nestjs/websockets',
        '@nestjs/microservices/microservices-module',
        '@nestjs/microservices',
        'cache-manager',
        'class-transformer/storage',
        'fastify',
        '@fastify/static',
        '@fastify/view',
        'nats',
        'mqtt',
        'amqplib',
        'amqp-connection-manager',
        '@grpc/grpc-js',
        '@grpc/proto-loader',
        'kafkajs',
        'ioredis',
        'redis',
        'file-type',
      ]
      config.externals = [...(config.externals || []), ...nestExternals]
    }
    return config
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

module.exports = nextConfig
