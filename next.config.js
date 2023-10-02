const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com" }, { hostname: "unsplash.com" }, { hostname: "lh3.googleusercontent.com" }, { hostname: "nesimaishykimages1.s3.eu-north-1.amazonaws.com" }]
  },
  experimental: { serverActions: true }
}

module.exports = nextConfig
