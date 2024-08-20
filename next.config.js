const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "koseionline.vn",
      },
      {
        protocol: "https",
        hostname: "kosei.eupsolution.net",
      },
      {
        protocol: "https",
        hostname: "kosei-web.eupsolution.net",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },

    ],
    domains: ['koseionline.vn',
      'kosei.eupsolution.net',
      'kosei-web.eupsolution.net',
      'upload.wikimedia.org',
      'localhost',],

  },
};

module.exports = nextConfig;
