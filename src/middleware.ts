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

export default function middleware(request: NextRequest) {
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
    const token = request.cookies.get('token')?.value;
    if (!token) {
      const redirectLocale = locale || 'vi';
      return NextResponse.redirect(new URL(`/${redirectLocale}`, request.url));
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