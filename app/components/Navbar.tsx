import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full relative flex items-center justify-between max-w-2xl mx-auto px-4 py-5">
      <Link href="/" className="font-bold text-3xl">
        Nav<span className="text-primary">Bar</span>
      </Link>
    </nav>
  );
}