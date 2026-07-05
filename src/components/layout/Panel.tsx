import { cn } from "@/lib/cn";

type PanelProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  "aria-labelledby"?: string;
};

export function Panel({ id, children, className, "aria-labelledby": ariaLabelledBy }: PanelProps) {
  return (
    <section id={id} className={cn("editorial-panel", className)} aria-labelledby={ariaLabelledBy}>
      {children}
    </section>
  );
}
