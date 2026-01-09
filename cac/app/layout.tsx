import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coffee & Chill",
  description: "Premium cafe website for Coffee & Chill",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-coffee-dark text-chill-light">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-coffee-light/20 bg-black/40 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
              <div className="text-xl font-heading">Coffee &amp; Chill</div>
              <nav className="flex gap-4 text-sm">
                <a href="/" className="hover:text-chill-light">
                  Home
                </a>
                <a href="/menu" className="hover:text-chill-light">
                  Menu
                </a>
                <a href="/reservations" className="hover:text-chill-light">
                  Reservations
                </a>
                <a href="/contact" className="hover:text-chill-light">
                  Contact
                </a>
              </nav>
            </div>
          </header>

          <main className="flex-1">
            {children}
          </main>

          <footer className="border-t border-coffee-light/20 bg-black/60 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-coffee-light">
              <span>© {new Date().getFullYear()} Coffee &amp; Chill</span>
              <span>Open 7:00 AM – 9:30 PM</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
