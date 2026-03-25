import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: {
    default: "Advanced Data Table (Next.js + TanStack)",
    template: "%s | Yasin Yılmaz",
  },
  description:
    "A modern data table dashboard built with Next.js, TanStack Table, and advanced filtering, sorting, and pagination features.",

  keywords: [
    "Next.js",
    "React",
    "TanStack Table",
    "Data Table",
    "Dashboard",
    "Filtering",
    "Sorting",
    "Pagination",
  ],

  authors: [{ name: "Yasin Yılmaz" }],
  creator: "Yasin Yılmaz",

  openGraph: {
    title: "Users Dashboard",
    description:
      "Explore a powerful and flexible data table experience with advanced filtering, sorting, and pagination.",
    url: "http://localhost:3000",
    siteName: "Users Dashboard",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Users Dashboard",
    description: "A modern data table built with Next.js and TanStack Table.",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};
