// app > api / frame > route.ts

import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import getHyperFrame from '../../api/frame/hyperframes';
import { NEXT_PUBLIC_URL } from '../../config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let text: string | undefined = '';

  // Extract the body from the POST request
  const body: FrameRequest = await req.json();

  // Validate the frame message using OnchainKit
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  // Error handling if the frame parameter or button number is missing
  console.error('Invalid frame message', message);
  if (!isValid) {
    return new NextResponse('Invalid frame message', { status: 400 });
  }

  // Extract the 'frame' query parameter to identify which frame sent the request
  const url = new URL(req.url);
  const queryParams = url.searchParams;
  const frame = queryParams.get('frame');

  // If the 'frame' query parameter is missing, return a 404 response
  if (!frame) {
    return new NextResponse('Frame not found', { status: 404 });
  }

  // There should always be a button number in the message
  if (!message?.button) {
    return new NextResponse('Button not found', { status: 404 });
  }
  
  text = message.input;
  console.log('Received text:', text);

  // If everything is valid, call getHyperFrame to determine the next frame
  return new NextResponse(getHyperFrame(frame as string, text || '', message?.button));
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
