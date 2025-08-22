declare module 'react-rating-stars-component' {
  import { ComponentType } from 'react';

  interface RatingProps {
    count?: number;
    value?: number;
    onChange?: (newValue: number) => void;
    size?: number;
    isHalf?: boolean;
    emptyIcon?: React.ReactNode;
    halfIcon?: React.ReactNode;
    filledIcon?: React.ReactNode;
    color?: string;
    activeColor?: string;
    edit?: boolean;
  }

  const Rating: ComponentType<RatingProps>;

  export default Rating;
}