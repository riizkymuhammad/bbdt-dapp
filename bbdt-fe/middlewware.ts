import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
    const role = (token?.role as string)?.toLowerCase()

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
      return null
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/auth/signin?from=${encodeURIComponent(from)}`, req.url)
      )
    }

    // Handle role-based access
    const path = req.nextUrl.pathname
    
    // Trustee can access all routes
    if (role === 'trustee') {
      return NextResponse.next()
    }

    // Donor can only access transactions and profile
    if (role === 'donor') {
      if (!path.match(/^\/dashboard\/(transactions|profile)$/)) {
        return NextResponse.redirect(new URL('/dashboard/transactions', req.url))
      }
    }

    // Needy can only access fundraising applications and profile
    if (role === 'needy') {
      if (!path.match(/^\/dashboard\/(fundraising-application|profile|fundraising-submition)$/)) {
        return NextResponse.redirect(new URL('/dashboard/fundraising-application', req.url))
        
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*']
}

