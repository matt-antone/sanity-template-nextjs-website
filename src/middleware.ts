import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  const allowedOrigins:string[] = [
    'https://*.algolia.net',
    'https://*.algolianet.com',
    'https://*.algolia.io',
    // 'https://res.cloudinary.com', // if using cloudinary
    'https://*.googleapis.com',
    'https://*.google-analytics.com',
    'https://*.googletagmanager.com',
    "https://*.sanity.io",
    'https://*.vimeo.com',
    'https://*.youtube.com',
  ]

  if(process.env.NEXT_PUBLIC_BASE_URL){
    allowedOrigins.push(process.env.NEXT_PUBLIC_BASE_URL)
  }

  const ContentSecurityPolicy = `
    default-src self ${allowedOrigins.join(' ')};
    img-src self ${allowedOrigins.join(' ')};
    script-src self ${allowedOrigins.join(' ')} 'nonce-${nonce}';
    style-src self ${allowedOrigins.join(' ')} 'nonce-${nonce}';
    font-src self ${allowedOrigins.join(' ')}; 
    connect-src self ${allowedOrigins.join(' ')};
  `
  console.log("middleware")

  const response = NextResponse.next()
  //   response.headers.set('Content-Type', 'text/html; charset=utf-8')
  //   response.headers.set('Access-Control-Allow-Origin', `self ${allowedOrigins.join(' ')}`)
  //   response.headers.set('X-DNS-Prefetch-Control','on')
  //   response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  
  //   response.headers.set('x-nonce', nonce)
  //   response.headers.set('Content-Security-Policy', ContentSecurityPolicy.replace(/\n/g, ''))
  //   response.headers.set('X-Frame-Options', 'sameorigin')
  //   response.headers.set('X-Content-Type-Options', 'nosniff')
  //   response.headers.set('Referrer-Policy', 'strict-origin')
  //   response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  //   response.headers.set('X-XSS-Protection', '1; mode=block')
    
  // response.headers.set("x-current-path", req.nextUrl.pathname)
  return response
}