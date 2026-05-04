import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@udittt/ui/components/sonner";

import type { orpc } from "@/utils/orpc";

import Header from "../components/header";
import { LoadingSequence } from "../components/LoadingSequence";
import { LiveStatus } from "../components/LiveStatus";
import { MonologueProvider } from "../components/MonologueContext";

import appCss from "../index.css?url";
export interface RouterAppContext {
  orpc: typeof orpc;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Udit Vegad | Forensic Developer",
      },
      {
        name: "description",
        content: "Portfolio of Udit Vegad. Building interactive web systems that solve real-world problems. Forensic precision in software development.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:site_name",
        content: "Udit Vegad",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "theme-color",
        content: "#09090b",
      }
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <head>
        <HeadContent />
      </head>
      <body className="overflow-x-hidden w-full max-w-[100vw]">
        <MonologueProvider>
          <LoadingSequence />
          <div className="grid h-svh grid-rows-[auto_1fr] relative w-full max-w-[100vw] overflow-x-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_100%_50%_at_50%_40%,#000_70%,transparent_100%)]"></div>
            <Header />
            <main className="relative z-10 w-full max-w-[100vw] mx-auto px-4 sm:px-6 py-8 overflow-x-hidden">
              <Outlet />
            </main>
          </div>
          <LiveStatus />
          <Toaster richColors />
          <TanStackRouterDevtools position="bottom-left" />
          <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
        </MonologueProvider>
        <Scripts />
      </body>
    </html>
  );
}
