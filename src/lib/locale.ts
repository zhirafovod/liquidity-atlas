export type Locale = "en" | "ru";

export const PATHS = ["/", "/analysis", "/models", "/episodes"] as const;
export type AppPath = (typeof PATHS)[number];

export function localeFromPath(pathname: string): Locale {
  return pathname === "/ru" || pathname.startsWith("/ru/") ? "ru" : "en";
}

export function localize(locale: Locale, path: AppPath): string {
  if (locale === "en") return path;
  return path === "/" ? "/ru" : `/ru${path}`;
}

export function switchLocale(pathname: string): string {
  const locale = localeFromPath(pathname);
  const bare = locale === "ru" ? pathname.replace(/^\/ru/, "") || "/" : pathname;
  const path = (PATHS as readonly string[]).includes(bare) ? (bare as AppPath) : "/";
  return localize(locale === "en" ? "ru" : "en", path);
}
