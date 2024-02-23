import { getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NEXT_PUBLIC_URL } from '../../config'; // Ensure this path is correct based on your project structure

interface HyperFrame {
  frame: string;
  1: string | ((text: string) => string);
  2?: string | ((text: string) => string);
  3?: string | ((text: string) => string);
  4?: string | ((text: string) => string);
}

function checkForCorrectText(restaurant: string, text: string): boolean {
  // Only the guess in the 'chipotle' frame with the correct password should return true
  return restaurant === 'chipotle' && text.trim().toLowerCase() === 'iloveyou';
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
        { label: 'CAVA' },
        { label: 'CHIPOTLE' },
        { label: 'SWEETGREEN' },
        { label: 'OLIVE GARDEN' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/food-title.png`, aspectRatio: '1:1' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=start`,
    }),
    1: 'cava',
    2: 'chipotle',
    3: 'sweetgreen',
    4: 'olive-garden',
  },
  'cava': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Guess' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/cava.png`, aspectRatio: '1:1' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=cava`,
    }),
    1: 'start',
    2: 'guess',
  },
  'guess': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Submit' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/cava.png`, aspectRatio: '1:1' },
      input: { text: 'What is the largest company in Europe by market cap?' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=guess`,
    }),
    1: 'cava',
    2: text => checkForCorrectText('guess', text) ? 'key' : 'shack-bad-password',
  },
  'shack-bad-password': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Try Again' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/sorry.png`, aspectRatio: '1:1' },
      input: { text: 'Try again. You got it wrong!' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=shack-bad-password`,
    }),
    1: 'cava',
    2: text => checkForCorrectText('shack', text) ? 'key' : 'shack-bad-password',
  },
  'key': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { action: 'link', label: 'TODO', target = 'https://www.chipotle.com' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/winner.png`, aspectRatio: '1:1' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=key`,
    }),
    1: 'guess',
  },
  
  'sweetgreen': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Guess' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/sweetgreen.png`, aspectRatio: '1:1' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=sweetgreen`,
    }),
    1: 'start',
    2: 'guess',
  },
  'guess': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Submit' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/sweetgreen.png`, aspectRatio: '1:1' },
      input: { text: 'What is the largest company in Europe by market cap?' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=guess`,
    }),
    1: 'cava',
    2: text => checkForCorrectText('guess', text) ? 'key' : 'shack-bad-password',
  },
  'shack-bad-password': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Try Again' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/sorry.png`, aspectRatio: '1:1' },
      input: { text: 'Try again. You got it wrong!' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=shack-bad-password`,
    }),
    1: 'cava',
    2: text => checkForCorrectText('guess', text) ? 'key' : 'shack-bad-password',
  },
  'key': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'TODO' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/winner.png`, aspectRatio: '1:1' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=key`,
    }),
    1: 'guess',
  },

  'olive-garden': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Guess' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/olive-garden.png`, aspectRatio: '1:1' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=olive-garden`,
    }),
    1: 'start',
    2: 'guess',
  },
  'guess': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Submit' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/olive-garden.png`, aspectRatio: '1:1' },
      input: { text: 'What is the largest company in Europe by market cap?' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=guess`,
    }),
    1: 'cava',
    2: text => checkForCorrectText('guess', text) ? 'key' : 'shack-bad-password',
  },
  'shack-bad-password': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Try Again' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/sorry.png`, aspectRatio: '1:1' },
      input: { text: 'Try again. You got it wrong!' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=shack-bad-password`,
    }),
    1: 'cava',
    2: text => checkForCorrectText('guess', text) ? 'key' : 'shack-bad-password',
  },
  'key': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { action: 'link', label: 'TODO', target: 'https://www.chipotle.com' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/winner.png`, aspectRatio: '1:1' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=key`,
    }),
    1: 'guess',
  },

  'olive-garden': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Guess' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/cava.png`, aspectRatio: '1:1' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=chipotle`,
    }),
    1: 'start',
    2: 'guess',
  },
  'guess': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Submit' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/olive-garden.png`, aspectRatio: '1:1' },
      input: { text: 'What is the largest company in Europe by market cap?' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=guess`,
    }),
    1: 'cava',
    2: text => checkForCorrectText('guess', text) ? 'key' : 'shack-bad-password',
  },
  'shack-bad-password': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Try Again' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/sorry.png`, aspectRatio: '1:1' },
      input: { text: 'Try again. You got it wrong!' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=shack-bad-password`,
    }),
    1: 'cava',
    2: text => checkForCorrectText('guess', text) ? 'key' : 'shack-bad-password',
  },
  'key': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { action: 'link', label: 'TODO', target: 'https://www.chipotle.com' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/winner.png`, aspectRatio: '1:1' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=key`,
    }),
    1: 'guess',
  },

};
