"use client";

import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";

type Props = {
  loggedIn: boolean;
  children: React.ReactNode;
};

export function SiteChrome({ loggedIn, children }: Props) {
  return (
    <>
      <Navbar loggedIn={loggedIn} />
      {children}
      <SiteFooter />
    </>
  );
}
