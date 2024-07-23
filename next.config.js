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


    ],
    domains: ['upload.wikimedia.org'],

  },
};

module.exports = nextConfig;
