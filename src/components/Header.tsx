"use client";
import NetworkToggle from "./NetworkToggle";
import AddressBadge from "./AddressBadge";
import AuthButton from "./AuthButton";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="font-semibold">DCA the SPX</Link>
        <div className="flex items-center gap-3">
          <NetworkToggle />
          <AddressBadge />
          <AuthButton />
        </div>
      </div>
    </header>
  );
}

