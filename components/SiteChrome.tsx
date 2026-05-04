"use client";

import { Suspense } from "react";
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
      {children}
      <SiteFooter />
    </>
  );
}
