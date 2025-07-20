import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-freddy-full text-freddy-sm font-freddy-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-freddy-border-focus disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-freddy-gradient text-freddy-text-white hover:opacity-90",
        destructive:
          "bg-freddy-error text-freddy-text-white hover:opacity-90",
        outline:
          "border border-freddy-border-light bg-freddy-card-bg text-freddy-text-primary hover:bg-freddy-light-blue",
        secondary:
          "bg-freddy-light-blue text-freddy-text-primary hover:bg-freddy-border-blue",
        ghost: "hover:bg-freddy-light-blue hover:text-freddy-text-primary",
        link: "text-freddy-text-blue underline-offset-4 hover:underline",
        // Freddy specific variants
        freddy: "bg-freddy-gradient text-freddy-text-white hover:opacity-90",
        freddySecondary: "bg-freddy-card-bg text-freddy-text-primary border border-freddy-border-light hover:bg-freddy-light-blue",
        freddyCircular: "bg-freddy-gradient text-freddy-text-white p-freddy-md hover:opacity-90",
      },
      size: {
        default: "h-10 px-freddy-lg py-freddy-md",
        sm: "h-9 rounded-freddy-md px-freddy-md",
        lg: "h-11 rounded-freddy-md px-freddy-xl",
        icon: "h-10 w-10",
        // Freddy specific sizes
        freddy: "px-freddy-lg py-freddy-md",
        freddySmall: "px-freddy-md py-freddy-sm",
        freddyLarge: "px-freddy-xl py-freddy-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }