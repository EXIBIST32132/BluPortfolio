import { cn } from "@/lib/cn";

type DoodleProps = {
  variant?: "sparkle" | "flower" | "loop" | "star";
  className?: string;
};

export function Doodle({ variant = "sparkle", className }: DoodleProps) {
  if (variant === "flower") {
    return (
      <svg aria-hidden="true" className={cn("doodle", className)} viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="6" />
        <path d="M40 20c8 0 12 5 12 10s-4 9-12 9-12-4-12-9 4-10 12-10Z" />
        <path d="M60 40c0 8-5 12-10 12s-9-4-9-12 4-12 9-12 10 4 10 12Z" />
        <path d="M40 60c-8 0-12-5-12-10s4-9 12-9 12 4 12 9-4 10-12 10Z" />
        <path d="M20 40c0-8 5-12 10-12s9 4 9 12-4 12-9 12-10-4-10-12Z" />
        <path d="M31 58c-5 6-9 9-14 10" />
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
