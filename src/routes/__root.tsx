import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const APP_NAME = "Liquidity Atlas";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Replay 1990–2050 for the United States, Russia, Europe and China. Money, markets, inflation.",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <div className="min-h-screen">
            <header className="border-b border-line bg-surface/80 backdrop-blur-sm">
              <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
                <Link to="/" className="group flex items-baseline gap-3">
                  <span className="font-display text-xl font-semibold text-ink">Liquidity Atlas</span>
                  <span className="hidden text-sm text-muted sm:inline">1990 → 2050</span>
                </Link>
                <nav className="flex gap-1 text-sm font-semibold">
                  <NavLink to="/">Replay</NavLink>
                  <NavLink to="/analysis">Theory</NavLink>
                  <NavLink to="/models">Four economies</NavLink>
                </nav>
              </div>
            </header>
            <Outlet />
            <footer className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted">
              Illustrative model of money, absorption and real output. Not a forecast and not investment advice.
            </footer>
          </div>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NavLink({ to, children }: { to: "/" | "/analysis" | "/models"; children: string }) {
  return (
    <Link
      to={to}
      className="rounded-full px-3 py-2 text-ink/80 hover:bg-paper-2"
      activeProps={{ className: "rounded-full bg-ink px-3 py-2 text-paper hover:bg-ink" }}
    >
      {children}
    </Link>
  );
}
