"use client";

import { Suspense } from "react";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";

type Props = {
  loggedIn: boolean;
  children: React.ReactNode;
};

export function SiteChrome({ loggedIn, children }: Props) {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar loggedIn={loggedIn} />
      </Suspense>
      <Suspense fallback={null}>
        <DarkModeToggle />
      </Suspense>
      {children}
      <SiteFooter />
    </>
  );
}
