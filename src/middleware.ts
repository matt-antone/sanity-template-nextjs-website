import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest, ev: NextFetchEvent) {
  // check to see if it should return a 410 error
  const pathname = request.nextUrl.pathname;

  // Report a 410 error for pages we do not support
  const fragments = [
    ".html",
    ".shtml",
    ".php",
    "/wp-",
    "/tag",
    "/category",
    "/author",
  ];

  const is410 = (pathname: string) => {
    let isInvalid = false;
    fragments.forEach((fragment) => {
      if (pathname.includes(fragment) && !isInvalid) {
        isInvalid = true;
      }
    });
    return isInvalid;
  };

  if (is410(pathname)) {
    return NextResponse.rewrite(new URL("/410", request.url), { status: 410 });
  }
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const allowedOrigins: string[] = [
    "*.algolia.net",
    "*.algolianet.com",
    "*.algolia.io",
    "*.googleapis.com",
    "*.google-analytics.com",
    "*.googletagmanager.com",
    "*.sanity.io",
    "*.vimeo.com",
    "*.youtube.com",
    "vercel.live",
    "www.googletagmanager.com",
    "www.google-analytics.com",
  ];

  if(process.env.NODE_ENV === "development"){
    allowedOrigins.push("http://localhost:*");
  }

  const cspHeader = `
    default-src 'self' ${allowedOrigins.join(' ')};
    connect-src 'self' ${allowedOrigins.join(' ')};
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${process.env.NODE_ENV === "development" ? "'unsafe-eval'" : ""} ${allowedOrigins.join(' ')};
    style-src 'self' ${process.env.NODE_ENV === "development" ? "'unsafe-inline'" :  `'nonce-${nonce}'`} ${allowedOrigins.join(' ')};
    img-src 'self' blob: data:  ${allowedOrigins.join(' ')};
    media-src 'self' blob: data: ${allowedOrigins.join(' ')};
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  requestHeaders.set("Content-Security-Policy-Report-Only", "default-src https:; report-uri /endpoint")

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
