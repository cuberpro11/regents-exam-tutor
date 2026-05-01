import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { getSession } from "@/lib/auth";
import { SiteChrome } from "@/components/SiteChrome";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Math Regents Prep | Regents Exam Tutor",
  description:
    "Self-paced Regents prep with step-by-step video explanations for recent exams.",
};

/** Cookies/session require fresh layout; avoid cached shell showing wrong nav auth state. */
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body className={lato.className}>
        <SiteChrome loggedIn={!!session}>{children}</SiteChrome>
      </body>
    </html>
  );
}
