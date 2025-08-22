/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    documentPictureInPicture: any;
  }

  interface Navigator {
    sayswho: any;
  }
}

declare module 'react-rating-stars-component' {
  import * as React from 'react';

  interface RatingProps {
    count?: number;
    value?: number;
    size?: number;
    isHalf?: boolean;
    onChange?: (newValue: number) => void;
    edit?: boolean;
    emptyIcon?: React.ReactNode;
    halfIcon?: React.ReactNode;
    fullIcon?: React.ReactNode;
    activeColor?: string;
    color?: string;
  }

  const Rating: React.FC<RatingProps>;

  export default Rating;
}

export const documentPictureInPicture = globalThis.document?.pictureInPictureElement;
export const browserVersion = navigator.sayswho;