import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse, type NextRequest } from 'next/server';

// Lấy kiểu của pathnames từ routing
type Pathnames = typeof routing.pathnames;
type ProtectedRoute = keyof Pathnames;

const intlMiddleware = createIntlMiddleware(routing);

// Chỉ định các route bảo vệ với kiểu ProtectedRoute
const PROTECTED_ROUTES: ProtectedRoute[] = [
  '/company-manage',
  '/company-manage/profile',
  '/user-manage',
  '/user-manage/profile'
  // Thêm các route khác nếu cần
];

export default async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  const pathname = request.nextUrl.pathname;
  const locale = pathname.split('/')[1] as 'vi' | 'en' | undefined;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => {
    const pathConfig = routing.pathnames[route];
    if (!pathConfig) return false;

    const translatedPath = typeof pathConfig === 'string'
      ? pathConfig
      : pathConfig[locale || 'vi'];

    return new RegExp(`^/(vi|en)${translatedPath}/?`).test(pathname);
  });

  if (isProtectedRoute) {
    // Gọi API check-login giống hook useAuth
    const authCheck = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check-login`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Cookie': request.cookies.toString() // Forward cookie từ client
      }
    });

    const data = await authCheck.json();

    if (data.code !== "success") {
      const redirectLocale = locale || 'vi';
      const loginUrl = new URL(`/${redirectLocale}/login`, request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/user-manage/:path*',
    '/company-manage/:path*',
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
  ],
};