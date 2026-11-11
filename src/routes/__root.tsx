import { createRootRoute, HeadContent, Link, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { t } from "@/lib/copy";
import { localeFromPath, localize, switchLocale, type AppPath } from "@/lib/locale";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Liquidity Atlas" },
      {
        name: "description",
        content: "Replay 1990–2050 for the United States, Russia, Europe and China. Where new money lands.",
      },
      { name: "theme-color", content: "#102029" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: Root,
});

function Root() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const locale = localeFromPath(pathname);
  const copy = t(locale);
  const other = switchLocale(pathname);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <div className="min-h-screen">
            <header className="border-b border-line bg-surface/80 backdrop-blur-sm">
              <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
                <Link to={localize(locale, "/") as "/"} className="group flex items-baseline gap-3">
                  <span className="font-display text-xl font-semibold text-ink">{copy.brand}</span>
                  <span className="hidden text-sm text-muted sm:inline">1990 → 2050</span>
                </Link>
                <nav className="flex flex-wrap items-center gap-1 text-sm font-semibold">
                  <Nav locale={locale} path="/" label={copy.nav.replay} />
                  <Nav locale={locale} path="/episodes" label={copy.nav.episodes} />
                  <Nav locale={locale} path="/analysis" label={copy.nav.theory} />
                  <Nav locale={locale} path="/models" label={copy.nav.economies} />
                  <a href={other} className="rounded-full border border-line px-3 py-2 text-ink/80 hover:bg-paper-2">
                    {copy.langLabel}
                  </a>
                </nav>
              </div>
            </header>
            <Outlet />
            <footer className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted">{copy.footer}</footer>
          </div>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function Nav({ locale, path, label }: { locale: "en" | "ru"; path: AppPath; label: string }) {
  const to = localize(locale, path);
  return (
    <Link
      to={to as "/"}
      className="rounded-full px-3 py-2 text-ink/80 hover:bg-paper-2"
      activeProps={{ className: "rounded-full bg-ink px-3 py-2 text-paper hover:bg-ink" }}
      activeOptions={{ exact: path === "/" }}
    >
      {label}
    </Link>
  );
}
