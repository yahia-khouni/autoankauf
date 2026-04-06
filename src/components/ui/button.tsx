import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 hover:shadow-gold-lg hover:scale-[1.02]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-slate-200 bg-white text-navy-900 hover:border-gold-400 hover:bg-gold-50",
        secondary: "bg-navy-100 text-navy-900 hover:bg-navy-200",
        ghost: "hover:bg-slate-100 hover:text-navy-900",
        link: "text-gold-600 underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-navy-800 to-navy-900 text-white hover:shadow-premium hover:scale-[1.02]",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-xl px-8 text-base",
        xl: "h-16 rounded-2xl px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
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
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
