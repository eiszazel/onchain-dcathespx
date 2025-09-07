import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="w-full border-b border-gray-200">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="font-semibold">DCA the SPX</Link>
        <div className="flex items-center gap-3">
          <a href="/app" className="px-3 py-1.5 rounded bg-gray-900 text-white text-sm">Open App</a>
        </div>
      </div>
    </header>
  );
}

