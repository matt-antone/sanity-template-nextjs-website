'use server';
import { revalidateTag } from 'next/cache';
 
export async function POST(req: Request) {
  console.log(await req.json()) 
  // revalidateTag('pages');
  return new Response(JSON.stringify({ message: 'Hello, Next.js!' }));
}

import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}