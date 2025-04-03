import path from "path";

const nextConfig = {
  webpack(config) {
    config.resolve.alias["@styles"] = path.resolve("styles");
    return config;
  },
};

export default nextConfig;
