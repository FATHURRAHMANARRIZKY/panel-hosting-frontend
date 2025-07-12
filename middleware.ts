// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('JWT')?.value

  // Daftar halaman yang butuh proteksi
  const protectedPaths = ['/dashboard']

  const url = request.nextUrl.pathname

  if (protectedPaths.some((path) => url.startsWith(path))) {
    if (!token) {
      // Kalau tidak ada JWT, redirect ke login
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
