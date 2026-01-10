// components/landing/VisitSection.tsx
import { cn } from "@/lib/utils";

export function VisitSection() {
    return (
        <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10" id="visit">
            <div className="grid gap-8 rounded-3xl border border-coffee-200 bg-white/60 p-8 shadow-sm backdrop-blur-sm md:grid-cols-3">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-coffee-900">Visit us</h2>
                    <p className="mt-2 text-sm text-coffee-800/80">
                        Cafe &amp; Chill &middot; Shillong
                    </p>
                </div>

                <div className="space-y-4 text-sm text-coffee-800/80">
                    <div>
                        <div className="font-semibold text-coffee-900">Timings</div>
                        <p>Open daily &middot; 7:00 AM &ndash; 9:30 PM</p>
                    </div>
                    <div>
                        <div className="font-semibold text-coffee-900">Address</div>
                        <p>Police Bazaar, Shillong, Meghalaya 793001</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button className="w-full rounded-full bg-coffee-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-coffee-800">
                        Get directions
                    </button>
                    <button className="w-full rounded-full border border-coffee-200 bg-transparent px-4 py-3 text-sm font-medium text-coffee-900 transition hover:bg-coffee-50 hover:border-coffee-300">
                        Call / WhatsApp
                    </button>
                </div>
            </div>
        </section>
    );
}
