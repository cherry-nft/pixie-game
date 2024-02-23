import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Chipotle',
    },
    {
      label: 'Cava',
    },
    {
      label: 'Sweetgreen',
    },
    {
      label: 'Olive Garden',
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
    description: 'Giving out free shit',
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
