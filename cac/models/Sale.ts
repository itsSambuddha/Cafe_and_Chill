import mongoose, { Schema, Model, models } from 'mongoose';

export interface ISaleItem {
    name: string;      // Snapshot of item name
    price: number;     // Snapshot of price at time of sale
    quantity: number;
}

export interface ISale {
    _id?: string;
    staffUserId: string; // Reference to User.firebaseUid or User._id
    items: ISaleItem[];
    totalAmount: number;
    paymentMethod: 'Cash' | 'Card' | 'UPI - GPay' | 'Other';
    paymentSource: 'manual_upload' | 'gateway' | 'pos';
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const SaleSchema = new Schema<ISale>(
    {
        staffUserId: { type: String, required: true },
        items: [
            {
                name: String,
                price: Number,
                quantity: Number,
            }
        ],
        totalAmount: { type: Number, required: true },
        paymentMethod: {
            type: String,
            enum: ['Cash', 'Card', 'UPI - GPay', 'Other'],
            default: 'Cash'
        },
        paymentSource: {
            type: String,
            enum: ['manual_upload', 'gateway', 'pos'],
            default: 'manual_upload'
        },
        notes: { type: String },
    },
    { timestamps: true }
);

// Prevent Mongoose OverwriteModelError in development
if (process.env.NODE_ENV === "development") {
    if (models.Sale) delete models.Sale;
}

const Sale: Model<ISale> = models.Sale || mongoose.model<ISale>('Sale', SaleSchema);

export default Sale;
