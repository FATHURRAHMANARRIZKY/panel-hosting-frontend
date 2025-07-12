import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  matcher: ['/dashboard/:path*'],
};

export default nextConfig;
