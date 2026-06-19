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
        variant === "accent" && "animate-blood-flicker",
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
