"use client";

import type { PropsWithChildren } from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

type Props = PropsWithChildren;

const ThemeProvider = ({ children }: Props) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
