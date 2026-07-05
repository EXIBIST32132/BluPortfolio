import { cn } from "@/lib/cn";

type PaperScrapProps = {
  children?: React.ReactNode;
  className?: string;
  tone?: "blue" | "purple" | "paper";
};

export function PaperScrap({ children, className, tone = "paper" }: PaperScrapProps) {
  return (
    <span aria-hidden={!children} className={cn("paper-scrap", `paper-scrap-${tone}`, className)}>
      {children}
    </span>
  );
}
