import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function Button({ href, children, className }: ButtonProps) {
  return (
    <Link className={cn("button-link", className)} href={href}>
      {children}
    </Link>
  );
}
