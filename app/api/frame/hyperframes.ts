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
  if (room === 'guess' && text.trim().toLowerCase() === 'degen') {
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
        { label: 'Chipotle' },
        { label: 'Cava' },
        { label: 'Sweetgreen' },
        { label: 'Olive Garden' }
      ],
      image: { src: `${NEXT_PUBLIC_URL}/food-title.png`, aspectRatio: '1:1' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=start`,
    }),
    1: 'chipotle',
    2: 'cava',
    3: 'sweetgreen',
    4: 'olive-garden',
  },
  
  'chipotle': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Select Chipotle' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/chipotle.png`, aspectRatio: '1:1' },
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
      image: { src: `${NEXT_PUBLIC_URL}/chipotle.png`, aspectRatio: '1:1' },
      input: { text: 'What is the password?' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=guess`,
    }),
    1: 'start',
    2: text => checkForCorrectText('guess', text) ? 'key' : 'shack-bad-password',
  },
  'shack-bad-password': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Try Again' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/sorry.png`, aspectRatio: '1:1' },
      input: { text: 'Try again. What is the password?' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=shack-bad-password`,
    }),
    1: 'start',
    2: text => checkForCorrectText('guess', text) ? 'key' : 'shack-bad-password',
  },
  'key': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { action: 'link', label: 'Winner!', target: 'https://www.chipotle.com' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/winner.png`, aspectRatio: '1:1' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=key`,
    }),
    1: 'start',
  },

  'cava': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Select Cava' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/cava.png`, aspectRatio: '1:1' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=cava`,
    }),
    1: 'start',
    2: 'cava-guess', // Direct to a guess frame specific to Cava
  },
  
  'cava-guess': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Submit' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/cava.png`, aspectRatio: '1:1' },
      input: { text: 'What is the password?' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=cava-guess`,
    }),
    1: 'cava',
    2: 'cava-wrong-password', // Direct to a wrong password frame specific to Cava
  },
  
  'cava-wrong-password': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Try Again' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/sorry.png`, aspectRatio: '1:1' },
      input: { text: 'Incorrect. Try again or go back.' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=cava-wrong-password`,
    }),
    1: 'start', 
    2: 'cava-wrong-password',
  },

  
  'sweetgreen': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Select Sweetgreen' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/sweetgreen.png`, aspectRatio: '1:1' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=sweetgreen`,
    }),
    1: 'start',
    2: 'sweetgreen-guess', // Direct to a guess frame specific to Cava
  },
  
  'sweetgreen-guess': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Submit' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/sweetgreen.png`, aspectRatio: '1:1' },
      input: { text: 'What is the password?' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=sweetgreen-guess`,
    }),
    1: 'sweetgreen',
    2: 'sweetgreen-wrong-password', // Direct to a wrong password frame specific to Cava
  },
  
  'sweetgreen-wrong-password': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Try Again' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/sorry.png`, aspectRatio: '1:1' },
      input: { text: 'Incorrect. Try again or go back.' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=sweetgreen-wrong-password`,
    }),
    1: 'start', 
    2: 'sweetgreen-wrong-password',
  },

  'olive-garden': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Select Olive Garden' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/olive-garden.png`, aspectRatio: '1:1' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=olive-garden`,
    }),
    1: 'start',
    2: 'olive-garden-guess', // Direct to a guess frame specific to Cava
  },
  
  'olive-garden-guess': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Submit' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/olive-garden.png`, aspectRatio: '1:1' },
      input: { text: 'What is the password?' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=olive-garden-guess`,
    }),
    1: 'olive-garden',
    2: 'olive-garden-wrong-password', // Direct to a wrong password frame specific to Cava
  },
  
  'olive-garden-wrong-password': {
    frame: getFrameHtmlResponse({
      buttons: [
        { label: 'Go Back' },
        { label: 'Try Again' },
      ],
      image: { src: `${NEXT_PUBLIC_URL}/sorry.png`, aspectRatio: '1:1' },
      input: { text: 'Incorrect. Try again or go back.' },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=olive-garden-wrong-password`,
    }),
    1: 'start', 
    2: 'olive-garden-wrong-password',
  },

};
