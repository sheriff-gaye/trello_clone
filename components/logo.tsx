"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import localFont from "next/font/local"


const headingFont=localFont({
    src: "../public/fonts/font.woff2"
  });

const Logo = () => {
  return (
    <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" height={30} width={30} />
        <p className={cn(headingFont.className,"text-lg text-neutral-700 pb-1")}>Taskify</p>
      </Link>
    </div>
  );
};

export default Logo;
