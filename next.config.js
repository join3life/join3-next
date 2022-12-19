/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // redirect router
  async redirects() {
    return [
      {
        source: "/UserProfile",
        destination: "/UserProfile/Feed",
        permanent: true,
      },
    ];
  },
};
