import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@udittt/ui/components/sonner";

import type { orpc } from "@/utils/orpc";

import Header from "../components/header";
import { LoadingSequence } from "../components/LoadingSequence";
import { LiveStatus } from "../components/LiveStatus";
import appCss from "../index.css?url";

export interface RouterAppContext {
  orpc: typeof orpc;
  queryClient: QueryClient;
}

// Inline splash styles & markup injected into <head> — renders before any JS
const SPLASH_STYLE = `
  #__splash {
    position: fixed; inset: 0; z-index: 9999;
    background: #0a0a0a;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    font-family: ui-monospace, 'Cascadia Code', monospace;
    transition: opacity 0.35s ease;
  }
  #__splash.hide { opacity: 0; pointer-events: none; }
  #__splash .bar-top {
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(to right, transparent, #8b0000, transparent);
  }
  #__splash .bar-bot {
    position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(to right, transparent, #8b000066, transparent);
  }
  #__splash .label {
    position: absolute; top: 16px; left: 20px;
    font-size: 10px; color: #8b000099; letter-spacing: 0.15em; text-transform: uppercase;
  }
  #__splash .ver {
    position: absolute; top: 16px; right: 20px;
    font-size: 10px; color: #8b000055; letter-spacing: 0.1em;
  }
  #__splash .msg {
    font-size: 13px; color: rgba(255,255,255,0.5);
    letter-spacing: 0.05em;
  }
  #__splash .cursor {
    display: inline-block; width: 8px; height: 16px;
    background: #8b0000; margin-left: 4px; vertical-align: middle;
    animation: __blink 0.9s step-end infinite;
  }
  @keyframes __blink { 0%,100%{opacity:1} 50%{opacity:0} }
`;

const SPLASH_REMOVE_SCRIPT = `
  (function() {
    if (sessionStorage.getItem('booted') === 'true') {
      var s = document.getElementById('__splash');
      if (s) { s.style.display = 'none'; }
    }
  })();
`;

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Udit Vegad | Forensic Developer" },
      {
        name: "description",
        content: "Portfolio of Udit Vegad. Building interactive web systems that solve real-world problems. Forensic precision in software development.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Udit Vegad" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0a0a0a" },
    ],
    links: [
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "stylesheet", href: appCss },
    ],
  }),

  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <head>
        <HeadContent />
        {/* Inline splash styles — renders synchronously before any JS */}
        <style dangerouslySetInnerHTML={{ __html: SPLASH_STYLE }} />
        {/* If already booted this session, hide splash immediately */}
        <script dangerouslySetInnerHTML={{ __html: SPLASH_REMOVE_SCRIPT }} />
      </head>
      <body className="overflow-x-hidden w-full max-w-[100vw]">
        {/* Pure HTML splash — visible before React hydrates */}
        <div id="__splash">
          <div className="bar-top" />
          <span className="label">sys://dark-passenger</span>
          <span className="ver">v1.0.0</span>
          <p className="msg">
            <span style={{ color: "#8b0000", marginRight: 6 }}>&gt;</span>
            initializing...<span className="cursor" />
          </p>
          <div className="bar-bot" />
        </div>

          {/* React-controlled loading sequence (replaces the HTML splash) */}
          <LoadingSequence />
          <div className="grid h-svh grid-rows-[auto_1fr] relative w-full max-w-[100vw] overflow-x-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[2rem_2rem] sm:bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_100%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
            <Header />
            <main className="relative z-10 w-full max-w-[100vw] mx-auto px-4 sm:px-6 py-8 overflow-x-hidden">
              <Outlet />
            </main>
          </div>
          <LiveStatus />
          <Toaster richColors />
          <TanStackRouterDevtools position="bottom-left" />
          <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
