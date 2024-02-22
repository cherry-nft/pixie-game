import { getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NEXT_PUBLIC_URL } from '../../config'; // Ensure this path is correct based on your project structure

interface HyperFrame {
  frame: string;
  1: string | ((text: string) => string);
  2?: string | ((text: string) => string);
  3?: string | ((text: string) => string);
  4?: string | ((text: string) => string);
}

// Define the checkForCorrectText function
function checkForCorrectText(room: string, text: string): boolean {
  if (room === 'shack' && text.trim().toLowerCase() === 'degen') {
    return true;
  }
  return false;
}


// Define the getHyperFrame function
export default function getHyperFrame(frame: string, text: string, button: number) {
  console.log(`Received text: ${text}`);
  const currentFrame = frames[frame];
  let nextFrameId: string;

  const buttonAction = currentFrame[button as keyof HyperFrame];
  if (typeof buttonAction === 'function') {
    // If the button maps to a function, call it with the text input to determine the next frame
    console.log(`Password check result for '${text}': ${buttonAction(text)}`);
    nextFrameId = buttonAction(text);
  } else {
    // Otherwise, directly use the mapping
    nextFrameId = buttonAction as string;
  }

  return frames[nextFrameId].frame;
}

// Define the frames object with all the HyperFrames
const frames: Record<string, HyperFrame> = {
  'start': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Road' },
        { label: 'Woods' },
        { label: 'Cave' },
        { action: 'link', label: 'TODO', target: 'https://www.playground.ooo' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/warpcast-superbowl-minting-2.png`, aspectRatio: '1.91:1' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=start`,
    }),
    1: 'road',
    2: 'woods-bear',
    3: 'cave-1',
  },
  'road': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Shack' },
        { label: 'Forward' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/hyperframes-test.png`, aspectRatio: '1.91:1' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=road`,
    }),
    1: 'start',
    2: 'shack',
    3: 'desert-road',
  },
  'shack': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Door' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/hyperframes-test-2.png`, aspectRatio: '1.91:1' },
      input: { text: 'What is the password?' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=shack`,
    }),
    1: 'road',
    2: text => checkForCorrectText('shack', text) ? 'key' : 'shack-bad-password',
  },
  'shack-bad-password': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Try Again' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/hyperframes-test-3.png`, aspectRatio: '1.91:1' },
      input: { text: 'Try again. What is the password?' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=shack-bad-password`,
    }),
    1: 'road',
    2: text => checkForCorrectText('shack', text) ? 'key' : 'shack-bad-password',
  },
  'key': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'TODO' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/hyperframes-test-4.png`, aspectRatio: '1.91:1' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=key`,
    }),
    1: 'shack',
  },
  // Add more frames as needed
};
