import { cn } from "@/lib/cn";

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return <span className={cn("tag", className)}>{children}</span>;
}
