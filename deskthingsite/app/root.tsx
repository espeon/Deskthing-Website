import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { SpeedInsights } from "@vercel/speed-insights/remix"
import { Analytics } from "@vercel/analytics/react"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
