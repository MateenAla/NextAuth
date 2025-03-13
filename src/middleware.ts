import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    console.log("Path:", path);
    const token = request.cookies.get("token");
    console.log("Token:", token);
    const isAuth = token ? true : false;
    console.log("Is Auth:", isAuth);
    const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail" || path === "/";
    console.log("Is Public Path:", isPublicPath);
    
    if (isAuth && isPublicPath) {
      return NextResponse.redirect(new URL('/profile', request.url))
    }
    if (!isAuth && !isPublicPath) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

//   return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile', '/login', '/signup', '/verifyemail', '/'],
}