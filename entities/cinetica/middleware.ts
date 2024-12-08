import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("Middleware actif pour : ", req.nextUrl.pathname);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Token : ", token);

  const isAuth = !!token;
  const isLoginPage = req.nextUrl.pathname === "/login";
  const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");

  if (!isAuth && isDashboardPage) {
    console.log("Redirection vers /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (req.nextUrl.pathname ==="/")
    {
      if(isAuth)
        {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        return NextResponse.redirect(new URL("/login", req.url));
    }
  if (isAuth && isLoginPage) {
    console.log("Redirection vers /dashboard");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (req.nextUrl.password.startsWith("/api"))
    {
      console.log("tu veux aller ou")
      if (!isAuth)
      {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
      if(isAuth) {
        return NextResponse.next();
      }  
    }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*","/:path*"],
};
