'use server';
import { revalidateTag } from 'next/cache';
 
export async function POST(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  console.log({req})
  // revalidateTag('pages');
}

import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}