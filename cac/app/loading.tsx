"use client";

import Image from "next/image";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-coffee-950">
            <div className="relative flex flex-col items-center">
                {/* Pulsing Logo Container */}
                <div className="relative h-24 w-24 animate-pulse rounded-full border-4 border-coffee-400/20 bg-coffee-900/50 p-4 shadow-2xl backdrop-blur-sm">
                    <div className="relative h-full w-full overflow-hidden rounded-full">
                        <Image
                            src="/assets/logo1.png"
                            alt="Loading..."
                            fill
                            className="object-cover opacity-90"
                            priority
                        />
                    </div>
                </div>

                {/* Loading Text */}
                <div className="mt-8 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-coffee-400 [animation-delay:-0.3s]"></span>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-coffee-400 [animation-delay:-0.15s]"></span>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-coffee-400"></span>
                </div>
            </div>
        </div>
    );
}
