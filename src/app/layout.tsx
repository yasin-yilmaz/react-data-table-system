import type { Metadata } from "next";

import "@/styles/main.css";

import { PropsWithChildren } from "react";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { inter, mono } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import { siteMetadata } from "@/config/metadata";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = siteMetadata;

type Props = PropsWithChildren;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className={cn(inter.variable, mono.variable, "antialiased")}>
        <NuqsAdapter>
          <QueryProvider>{children}</QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
