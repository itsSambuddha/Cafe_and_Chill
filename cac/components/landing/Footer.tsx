export function Footer() {
  return (
    <footer className="border-t border-coffee-light/20 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-coffee-light sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Coffee &amp; Chill</span>
        <span>Open daily · 7:00 AM – 9:30 PM</span>
      </div>
    </footer>
  );
}
