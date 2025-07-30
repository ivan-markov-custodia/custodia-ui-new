import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm",
          "text-gray-900 focus:border-[#2ec762] focus:ring-[#2ec762]",
          "dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400",
          "dark:focus:border-[#2ec762] dark:focus:ring-[#2ec762]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
