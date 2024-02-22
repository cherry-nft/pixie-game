import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Road',
    },
    {
      label: 'Woods',
    },
    {
      label: 'Cave',
    },
    {
      action: 'link',
      label: 'TODO',
      target: 'https://www.google.com',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/warpcast-superbowl-minting-2.png`,
    aspectRatio: '1.91:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=start`,
});

export const metadata: Metadata = {
  title: 'HyperFrames!',
  description: 'Time is a flat circle.',
  openGraph: {
    title: 'HyperFrames!',
    description: 'Time is a flat circle.',
    images: [`${NEXT_PUBLIC_URL}/hyperframes-test.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>playground.ooo</h1>
    </>
  );
}
