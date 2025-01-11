import * as React from 'react';

import { cn } from '../../lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'border border-cream rounded-lg px-4 h-[46px] flex [field-sizing:content] bg-transparent text-medium shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder-[#A2999E] focus-visible:outline-none  focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 disabled',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input};