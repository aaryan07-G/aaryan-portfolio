import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { springSnappy } from "@/lib/motion/transitions";

type ButtonVariant = "primary" | "glass" | "ghost" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-text-primary text-bg-primary hover:shadow-glow-accent border border-transparent",
  glass: "glass-surface text-text-primary hover:bg-glass-fill/[0.09]",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary border border-transparent",
  icon: "glass-surface rounded-pill p-2.5 text-text-primary aspect-square",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
  lg: "text-lg px-8 py-4",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", type = "button", className, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={springSnappy}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-pill font-medium",
          "transition-colors duration-300 ease-out-quart",
          "focus-visible:outline-2 focus-visible:outline-accent",
          variant !== "icon" && sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
