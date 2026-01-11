"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share } from "lucide-react";

export function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        setIsIOS(
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
        );

        setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
    };

    if (isStandalone) return null;

    if (isIOS) {
        return (
            <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 p-4 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl border border-stone-200 max-w-sm">
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-[#4e260a]">Install App for better experience</p>
                    <div className="flex items-center gap-2 text-xs text-stone-600">
                        <span>Tap</span>
                        <Share className="w-4 h-4" />
                        <span>then "Add to Home Screen"</span>
                    </div>
                </div>
            </div>
        );
    }

    if (!deferredPrompt) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
            <Button
                onClick={handleInstallClick}
                className="shadow-lg gap-2 bg-[#4e260a] hover:bg-[#3a1d08] text-[#f2e8e5] rounded-full px-6"
            >
                <Download className="w-4 h-4" />
                Install App
            </Button>
        </div>
    );
}
