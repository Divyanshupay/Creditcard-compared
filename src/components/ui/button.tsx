"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "header";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-arcadia transition-all duration-300 cursor-pointer select-none",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-mercury-blue text-pure-white hover:bg-mercury-blue/90 active:bg-mercury-blue/80 rounded-[32px]":
              variant === "primary",
            "bg-transparent text-starlight hover:text-pure-white rounded-[40px]":
              variant === "ghost",
            "bg-ghost-blue/20 text-starlight hover:bg-ghost-blue/30 rounded-[40px]":
              variant === "header",
          },
          {
            "px-5 py-2 text-sm": size === "sm",
            "px-6 py-[14px] text-base font-[480]": size === "md",
            "px-8 py-4 text-lg font-[480]": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
