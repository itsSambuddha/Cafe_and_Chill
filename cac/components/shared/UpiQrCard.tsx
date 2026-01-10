import { Card, CardContent } from "@/components/ui/card";
import { PAYMENT_CONFIG } from "@/data/payment";

export function UpiQrCard() {
    const { upiId, merchantName, qrCodePath } = PAYMENT_CONFIG;

    // UPI Intent link for mobile apps (GPay, PhonePe, Paytm, etc.)
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&cu=INR`;

    return (
        <a href={upiUrl} className="block group">
            <Card className="max-w-md mx-auto bg-blue-50 border-blue-100 mt-4 transition-transform hover:scale-[1.02] active:scale-95 cursor-pointer">
                <CardContent className="pt-6 flex flex-col items-center">
                    <div className="w-48 h-48 bg-white border border-stone-200 rounded-lg flex items-center justify-center p-2 mb-2 relative">
                        {/* QR Code Display */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={qrCodePath}
                            alt="UPI QR"
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;
                            }}
                        />
                    </div>
                    <p className="font-mono font-bold text-stone-700 text-lg">{upiId}</p>
                    <p className="text-xs text-stone-500 mt-1 pb-2">
                        Tap to pay on mobile <span className="hidden sm:inline">or scan QR</span>
                    </p>
                    <div className="text-[10px] text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Opens GPay / UPI App
                    </div>
                </CardContent>
            </Card>
        </a>
    );
}
