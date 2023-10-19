/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: [
      "img.freepik.com",
      "i.ibb.co",
      "i.pinimg.com",
      "ibb.co",
      "school-server-v0as.onrender.com",
      "www.whitmorerarebooks.com",
    ],
  },
};

module.exports = nextConfig;
