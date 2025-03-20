// import { NextResponse } from "next/server";
import { NextResponse, type NextRequest } from "next/server";
import URL_PATH from "./constants/URL";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const isCreateStudyPath = url.pathname === URL_PATH.STUDY.CREATE;

  if (isCreateStudyPath) {
    // step 값이 5 이상이면 리다이렉트
    const step = url.search.split("=")[1];
    if (step && Number(step) > 4) {
      return NextResponse.redirect(
        new URL("/create-study?step=1", request.url)
      );
    }
  }
  //   return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
