import { cn } from "@/lib/cn";

type DoodleProps = {
  variant?: "sparkle" | "flower" | "loop" | "star";
  className?: string;
};

export function Doodle({ variant = "sparkle", className }: DoodleProps) {
  if (variant === "flower") {
    return (
      <svg aria-hidden="true" className={cn("doodle", className)} viewBox="0 0 80 80">
        <path d="M40 35c-12-24 18-24 6-1 23-11 23 18 0 7 10 23-18 22-7 0-12 22-32-4-6-8-22 11-23-18-1-7" />
        <circle cx="40" cy="40" r="7" />
      </svg>
    );
  }

  if (variant === "loop") {
    return (
      <svg aria-hidden="true" className={cn("doodle", className)} viewBox="0 0 140 70">
        <path d="M7 44c25-48 49 22 77-15 23-30 31 12 50-9" />
      </svg>
    );
  }

  if (variant === "star") {
    return (
      <svg aria-hidden="true" className={cn("doodle", className)} viewBox="0 0 80 80">
        <path d="M40 5l8 26 27 9-27 8-8 27-9-27-26-8 26-9z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={cn("doodle", className)} viewBox="0 0 80 80">
      <path d="M40 6v68M6 40h68M17 17l46 46M63 17L17 63" />
    </svg>
  );
}
