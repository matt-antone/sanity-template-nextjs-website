import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  const allowedOrigins = [
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

  const ContentSecurityPolicy = `
    default-src self ${process.env.NEXT_PUBLIC_BASE_URL} ${allowedOrigins.join(' ')};
    img-src self ${process.env.NEXT_PUBLIC_BASE_URL} ${allowedOrigins.join(' ')};
    script-src self ${process.env.NEXT_PUBLIC_BASE_URL} ${allowedOrigins.join(' ')};
    style-src self 'unsafe-inline' ${process.env.NEXT_PUBLIC_BASE_URL};
    font-src self ${process.env.NEXT_PUBLIC_BASE_URL}; 
    connect-src self ${process.env.NEXT_PUBLIC_BASE_URL} ${allowedOrigins.join(' ')};
  `

  const response = NextResponse.next()
  if(process.env.VERCEL_ENV){
    response.headers.set('Content-Type', 'text/html; charset=utf-8')
    response.headers.set('Access-Control-Allow-Origin', `self ${allowedOrigins.join(' ')}`)
    response.headers.set('X-DNS-Prefetch-Control','on')
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  
    response.headers.set('x-nonce', nonce)
    response.headers.set('Content-Security-Policy', ContentSecurityPolicy.replace(/\n/g, ''))
    response.headers.set('X-Frame-Options', 'sameorigin')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin')
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    
  }
  response.headers.set("x-current-path", req.nextUrl.pathname)
  return response
}