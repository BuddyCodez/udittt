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
        title: "My App",
      },
    ],
    links: [
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
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        <MonologueProvider>
          <LoadingSequence />
          <div className="grid h-svh grid-rows-[auto_1fr] relative">
            <Header />
            <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-8">
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
