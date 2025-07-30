import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "w-full rounded-lg bg-[#2ec762] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#27a552] focus:ring-4 focus:ring-[#2ec762]/50 focus:outline-none dark:bg-[#2ec762] dark:hover:bg-[#27a552] dark:focus:ring-[#27a552]",
        logout:
          "rounded-lg bg-[#2ec762] px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-[#27a552] focus:ring-4 focus:ring-[#2ec762]/50 focus:outline-none dark:bg-[#2ec762] dark:hover:bg-[#27a552] dark:focus:ring-[#27a552]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
