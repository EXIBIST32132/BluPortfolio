import { cn } from "@/lib/cn";

type TapeProps = {
  className?: string;
  tone?: "blue" | "purple" | "paper";
};

export function Tape({ className, tone = "blue" }: TapeProps) {
  return <span aria-hidden="true" className={cn("tape", `tape-${tone}`, className)} />;
}
