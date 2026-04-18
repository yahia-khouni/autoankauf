import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface LocationBreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Consistent breadcrumb for all location pages.
 * Last item is rendered as active (gold) text without a link.
 */
export function LocationBreadcrumb({ items }: LocationBreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 text-sm mb-8 flex-wrap" aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <ChevronRight className="h-3.5 w-3.5 text-slate-600 flex-shrink-0" />
            )}
            {isLast || !item.href ? (
              <span className={isLast ? "text-gold-400 font-medium" : "text-slate-400"}>
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-slate-400 hover:text-gold-400 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
