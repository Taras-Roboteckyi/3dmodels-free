import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ui-avatars.com", "res.cloudinary.com"], // ← Додаємо дозволені домени
  },
  webpack(config) {
    config.resolve.alias["@styles"] = path.resolve("styles");
    return config;
  },
};

export default nextConfig;
