import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { localize, type AppPath, type Locale } from "@/lib/locale";

export function LocalLink({
  locale,
  path,
  className,
  children,
}: {
  locale: Locale;
  path: AppPath;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link to={localize(locale, path) as "/"} className={className}>
      {children}
    </Link>
  );
}
