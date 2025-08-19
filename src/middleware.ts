import createIntlMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"
import { NextResponse, type NextRequest } from "next/server"

const intlMiddleware = createIntlMiddleware(routing)

const PROTECTED_ROUTES = [
  "/company-manage",
  "/company-manage/profile",
  "/user-manage",
  "/user-manage/profile"]

export default async function middleware(request: NextRequest) {
  const response = intlMiddleware(request)
  const pathname = request.nextUrl.pathname
  const locale = pathname.split("/")[1] as "vi" | "en" | undefined

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => {
    // Check if pathname matches the protected route pattern with locale
    const localePrefix = `/(vi|en)`
    const routePattern = new RegExp(`^${localePrefix}${route}(/.*)?$`)
    return routePattern.test(pathname)
  })

  if (isProtectedRoute) {
    // Gọi API BE để kiểm tra token
    const authCheck = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
      credentials: 'include', // Gửi cookie tự động
      headers: {
        'Cookie': request.cookies.toString() // Forward cookie từ trình duyệt
      }
    });

    if (!authCheck.ok) {
      const redirectLocale = locale || "vi"
      return NextResponse.redirect(new URL(`/${redirectLocale}`, request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    "/(vi|en)/user-manage/:path*",
    "/(vi|en)/company-manage/:path*",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
  ],
}
