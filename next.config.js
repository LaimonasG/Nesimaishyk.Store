/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePattern: [{ hostName: "images.unsplash.com" }]
  },
  experimental: { serverActions: true }
}

module.exports = nextConfig
