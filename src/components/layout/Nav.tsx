import Link from "next/link";
import type { NavigationItem } from "@/types/portfolio";

const fallbackNavItems: NavigationItem[] = [
  { href: "#work", label: "Work" },
  { href: "#contents", label: "Contents" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

type NavProps = {
  homePrefix?: string;
  items?: NavigationItem[];
};

export function Nav({ homePrefix = "", items = fallbackNavItems }: NavProps) {
  return (
    <header className="site-nav" aria-label="Primary navigation">
      <Link className="nav-mark" href={`${homePrefix || "/"}#cover`} aria-label="Blu Belinky home">
        BB
      </Link>
      <nav>
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href.startsWith("#") ? `${homePrefix}${item.href}` : item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
