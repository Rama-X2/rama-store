declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.avif' {
  const content: string;
  export default content;
}

// Additional type declarations
declare global {
  interface Window {
    // Add any global window properties if needed
  }
}

// Fix for framer-motion types
declare module 'framer-motion' {
  import { ComponentType, ReactNode } from 'react';
  
  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
    children?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (event: React.MouseEvent) => void;
    onAnimationStart?: () => void;
    onAnimationEnd?: () => void;
  }
  
  export const motion: {
    div: ComponentType<MotionProps & React.HTMLAttributes<HTMLDivElement>>;
    section: ComponentType<MotionProps & React.HTMLAttributes<HTMLElement>>;
    header: ComponentType<MotionProps & React.HTMLAttributes<HTMLElement>>;
    footer: ComponentType<MotionProps & React.HTMLAttributes<HTMLElement>>;
    button: ComponentType<MotionProps & React.ButtonHTMLAttributes<HTMLButtonElement>>;
    input: ComponentType<MotionProps & React.InputHTMLAttributes<HTMLInputElement>>;
    h1: ComponentType<MotionProps & React.HTMLAttributes<HTMLHeadingElement>>;
    h2: ComponentType<MotionProps & React.HTMLAttributes<HTMLHeadingElement>>;
    h3: ComponentType<MotionProps & React.HTMLAttributes<HTMLHeadingElement>>;
    p: ComponentType<MotionProps & React.HTMLAttributes<HTMLParagraphElement>>;
    span: ComponentType<MotionProps & React.HTMLAttributes<HTMLSpanElement>>;
    form: ComponentType<MotionProps & React.FormHTMLAttributes<HTMLFormElement>>;
    img: ComponentType<MotionProps & React.ImgHTMLAttributes<HTMLImageElement>>;
    ul: ComponentType<MotionProps & React.HTMLAttributes<HTMLUListElement>>;
    li: ComponentType<MotionProps & React.LiHTMLAttributes<HTMLLIElement>>;
  };
  
  export interface AnimatePresenceProps {
    children?: ReactNode;
    initial?: boolean;
    exitBeforeEnter?: boolean;
    onExitComplete?: () => void;
    mode?: 'wait' | 'sync' | 'popLayout';
  }
  
  export const AnimatePresence: ComponentType<AnimatePresenceProps>;
}
