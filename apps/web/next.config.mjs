import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: "public",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: async () => {
    return [
      {
        source: "/api/v1/p/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:5328/api/v1/p/:path*"
            : "/api/v1/p/",
      },
    ]
  },
}

// export default withPWA(nextConfig);

export default nextConfig
