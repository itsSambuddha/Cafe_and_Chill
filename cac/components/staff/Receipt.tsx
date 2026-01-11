import React from 'react';
import { BadgePill } from '@/components/ui/badge-pill';

interface ReceiptProps {
    sale: any; // Using any for flexibility with the partial sale object structure
}

export const Receipt = React.forwardRef<HTMLDivElement, ReceiptProps>(({ sale }, ref) => {
    if (!sale) return null;

    const total = sale.totalAmount || 0;
    const date = new Date(sale.createdAt || Date.now()).toLocaleString();
    const items = sale.items || [];

    return (
        <div ref={ref} className="bg-white p-4 text-black font-mono text-xs w-[300px] print:w-full mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-xl font-bold uppercase mb-1">Coffee & Chill</h1>
                <p className="text-[10px] text-gray-500">Police Bazar, Shillong</p>
                <p className="text-[10px] text-gray-500">+91 60028 61294</p>
            </div>

            {/* Meta */}
            <div className="mb-4 border-b border-dashed border-gray-300 pb-2">
                <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{date}</span>
                </div>
                <div className="flex justify-between">
                    <span>Order ID:</span>
                    <span>#{sale._id ? sale._id.slice(-6).toUpperCase() : 'PENDING'}</span>
                </div>
                <div className="flex justify-between">
                    <span>Staff:</span>
                    <span>{sale.staffUserId ? 'Verified' : 'N/A'}</span>
                </div>
            </div>

            {/* Items */}
            <div className="mb-4">
                <div className="flex font-bold border-b border-black pb-1 mb-2">
                    <span className="flex-1">Item</span>
                    <span className="w-8 text-right">Qty</span>
                    <span className="w-16 text-right">Price</span>
                </div>
                <div className="space-y-1">
                    {items.length > 0 ? (
                        items.map((item: any, idx: number) => (
                            <div key={idx} className="flex">
                                <span className="flex-1 truncate pr-2">{item.name}</span>
                                <span className="w-8 text-right">{item.quantity}</span>
                                <span className="w-16 text-right">{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))
                    ) : (
                        <div className="text-center italic text-gray-400 py-2">fast items</div>
                    )}
                </div>
            </div>

            {/* Total */}
            <div className="border-t border-black pt-2 mb-6">
                <div className="flex justify-between text-base font-bold">
                    <span>TOTAL</span>
                    <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] mt-1 text-gray-500">
                    <span>Payment:</span>
                    <span className="uppercase">{sale.paymentMethod}</span>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center space-y-2">
                <p className="font-bold">Thank You!</p>
                <p className="text-[10px]">Please visit again.</p>
                <div className="pt-4 text-[8px] text-gray-400">
                    Dev by Sam
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    @page {
                        margin: 0;
                        size: auto; 
                    }
                    body {
                        background-color: white;
                    }
                }
            `}</style>
        </div>
    );
});

Receipt.displayName = "Receipt";
