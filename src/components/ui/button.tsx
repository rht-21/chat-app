import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex w-fit items-center gap-2 text-sm justify-center cursor-pointer overflow-hidden rounded-md px-6 font-medium [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 ",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90",
        primary: "bg-primary text-background hover:bg-primary/90",
        secondary: "bg-secondary text-background hover:bg-secondary/90",
        outline:
          "border border-foreground text-foreground hover:bg-foreground hover:text-background",
      },
      animation: {
        default: "duration-150",
        shrink: "duration-150 transition active:scale-95",
        pop: "transition-all duration-100 active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)] [box-shadow:5px_5px_2px_var(--muted-foreground)]",
        bounce:
          "duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      animation: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      animation,
      size,
      asChild = false,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, className }))}
        ref={ref}
        {...props}
      >
        {leftIcon}
        {props.children}
        {rightIcon}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
