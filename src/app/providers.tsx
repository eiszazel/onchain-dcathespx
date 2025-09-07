"use client";
import { CDPReactProvider } from "@coinbase/cdp-react";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";

const OnchainProviders = dynamic(() => import("src/components/OnchainProviders"), {
  ssr: false,
});

const CDP_CONFIG = {
  projectId: (process.env.NEXT_PUBLIC_CDP_PROJECT_ID as string) || 'test',
};

const APP_CONFIG = {
  name: "DCA the SPX",
  logoUrl: "/logo.svg",
};

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CDPReactProvider config={CDP_CONFIG} app={APP_CONFIG}>
      <OnchainProviders>{children}</OnchainProviders>
    </CDPReactProvider>
  );
}
