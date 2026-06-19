import type { ComponentProps } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useLaunchZegon } from "@/hooks/useLaunchZegon";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

type LaunchButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: false;
  };

export function LaunchButton({
  className,
  variant = "accent",
  size,
  children,
  disabled,
  ...props
}: LaunchButtonProps) {
  const { launch, isLaunching } = useLaunchZegon();

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "font-display tracking-widest",
        variant === "accent" &&
          "shadow-[0_0_24px_-6px_rgba(179,18,43,0.55)] transition-shadow hover:shadow-[0_0_32px_-4px_rgba(179,18,43,0.7)]",
        className,
        isLaunching && "pointer-events-none opacity-80",
      )}
      disabled={disabled || isLaunching}
      onClick={(e) => {
        e.preventDefault();
        props.onClick?.(e);
        launch();
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
