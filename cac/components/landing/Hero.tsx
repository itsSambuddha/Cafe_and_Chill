//components/landing/Hero.tsx
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-coffee-dark via-black to-coffee-dark text-chill-light">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <p className="text-xs uppercase tracking-[0.25em] text-coffee-light/70">
            Premium Cafe · Shillong
          </p>
          <h1 className="text-4xl font-heading tracking-tight sm:text-5xl lg:text-6xl">
            Coffee &amp; Chill,
            <span className="block text-chill-light">
              where code meets caffeine.
            </span>
          </h1>
          <p className="max-w-xl text-sm text-coffee-light/80 sm:text-base">
            Order signature brews, reserve your favorite spot, and manage
            everything from a single, modern web experience.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/menu"
              className="rounded-pill bg-chill-primary px-5 py-2.5 text-sm font-medium text-black shadow-soft hover:bg-chill-light transition"
            >
              View menu
            </Link>
            <Link
              href="/reservations"
              className="rounded-pill border border-chill-light/60 px-5 py-2.5 text-sm font-medium text-chill-light hover:bg-white/5 transition"
            >
              Reserve a table
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-4 rounded-card bg-chill-primary/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-card border border-white/10 bg-black/40 p-4 shadow-soft">
              <div className="mb-4 flex items-center justify-between text-xs text-coffee-light/70">
                <span>Today&apos;s specials</span>
                <span>Ready in ~10 min</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>Hazelnut Cold Brew</span>
                  <span className="text-chill-light">₹210</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Caramel Macchiato</span>
                  <span className="text-chill-light">₹230</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Mocha Frappe</span>
                  <span className="text-chill-light">₹240</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
