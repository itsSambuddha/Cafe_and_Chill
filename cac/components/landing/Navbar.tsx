import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-coffee-light/20 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-heading">
          Coffee &amp; Chill
        </Link>
        <nav className="flex items-center gap-4 text-sm text-coffee-light/80">
          <Link href="/" className="hover:text-chill-light transition">
            Home
          </Link>
          <Link href="/menu" className="hover:text-chill-light transition">
            Menu
          </Link>
          <Link href="/reservations" className="hover:text-chill-light transition">
            Reservations
          </Link>
          <Link href="/contact" className="hover:text-chill-light transition">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
