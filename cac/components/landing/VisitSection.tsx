export function VisitSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
      <div className="grid gap-8 rounded-2xl border border-border bg-card/70 p-6 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Visit us</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Coffee &amp; Chill · Shillong
          </p>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          <div>
            <div className="font-medium text-foreground">Timings</div>
            <p>Open daily · 7:00 AM – 9:30 PM</p>
          </div>
          <div>
            <div className="font-medium text-foreground">Address</div>
            <p>Exact location details will be added here.</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          <button className="rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background">
            Get directions
          </button>
          <button className="rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground">
            Call / WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
