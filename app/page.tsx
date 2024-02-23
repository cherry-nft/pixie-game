import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'CAVA',
    },
    {
      label: 'CHIPOTLE',
    },
    {
      label: 'SWEETGREEN',
    },
    {
      label: 'OLIVE GARDEN',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/food-title.png`,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=start`,
});

export const metadata: Metadata = {
  title: 'HyperFrames!',
  description: 'Pixies are yours to win!',
  openGraph: {
    title: 'HyperFrames!',
    description: 'Time is a flat circle.',
    images: [`${NEXT_PUBLIC_URL}/food-title.png`],
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
