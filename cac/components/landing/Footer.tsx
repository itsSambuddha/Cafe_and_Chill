export function Footer() {
    return (
        <footer className="border-t border-coffee-200/60 bg-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-xs font-medium text-coffee-800/60 sm:flex-row sm:items-center sm:justify-between">
                <span>&copy; {new Date().getFullYear()} Cafe &amp; Chill. Crafted with care.</span>
                <div className="flex gap-4">
                    <span>Open daily &middot; 7:00 AM &ndash; 9:30 PM</span>
                </div>
            </div>
        </footer>
    );
}
