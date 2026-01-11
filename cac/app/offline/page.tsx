import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Coffee, WifiOff } from "lucide-react";

export default function OfflinePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#f2e8e5] text-[#4e260a] p-4 text-center">
            <div className="bg-white/50 p-8 rounded-2xl backdrop-blur-sm shadow-xl max-w-md w-full border border-[#4e260a]/10">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <Coffee className="w-16 h-16 text-[#4e260a]/80" />
                        <div className="absolute -bottom-2 -right-2 bg-[#4e260a] text-[#f2e8e5] p-1.5 rounded-full">
                            <WifiOff className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-3 font-serif">Rough Connection</h1>
                <p className="text-lg mb-8 opacity-80 leading-relaxed">
                    It seems you're offline. Grab a coffee while we wait for the internet to come back, or check your cached pages.
                </p>

                <div className="space-y-3">
                    <Button
                        asChild
                        className="w-full bg-[#4e260a] hover:bg-[#3a1d08] text-[#f2e8e5]"
                    >
                        <Link href="/">Try Reloading</Link>
                    </Button>

                    <Button
                        variant="outline"
                        asChild
                        className="w-full border-[#4e260a]/20 hover:bg-[#4e260a]/5 text-[#4e260a]"
                    >
                        <Link href="/menu">View Menu (if cached)</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
