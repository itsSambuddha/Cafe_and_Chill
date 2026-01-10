export function AboutCafe() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">About Coffee &amp; Chill</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            A small neighborhood cafe built for slow mornings, quiet work sessions,
            and long conversations. Warm lighting, simple food, and coffee that
            feels like a pause button in the middle of the day.
          </p>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground">
          <div className="flex items-center justify-between rounded-xl border border-border bg-card/70 px-3 py-2">
            <span>Cozy, laptop-friendly corners</span>
            <span>Free Wi‑Fi &amp; sockets</span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border bg-card/70 px-3 py-2">
            <span>Local ingredients &amp; desserts</span>
            <span>Comfort-first seating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
