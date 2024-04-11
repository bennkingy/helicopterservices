import Image from 'next/image';
import Link from 'next/link';
import { ModeToggle } from "./ModeToggle";
import { NavMenu } from "./NavMenu";

export default function Navbar() {
  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-mono text-lg font-bold">
          <Image
            src="/images/logo.png"
            alt="Helicopter Services"
            width={100}
            height={34}
          />
        </Link>
        <NavMenu />
        <ModeToggle />
      </div>
    </header >
  );
};