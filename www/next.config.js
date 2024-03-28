/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
    domains: ['flagcdn.com', 'assets.maccarianagency.com', 'localhost', 'fastpyfolio.nebuladev.io']
  }
};
