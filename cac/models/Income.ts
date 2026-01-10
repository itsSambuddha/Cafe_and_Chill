import mongoose, { Schema, Model, models } from 'mongoose';

export interface IIncome {
    _id?: string;
    source: 'Customer' | 'Investment' | 'Refund' | 'Other';
    amount: number;
    date: Date;
    paymentMethod?: string;
    relatedSaleId?: string; // Optional link to a Sale
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const IncomeSchema = new Schema<IIncome>(
    {
        source: {
            type: String,
            enum: ['Customer', 'Investment', 'Refund', 'Other'],
            default: 'Customer'
        },
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now },
        paymentMethod: { type: String },
        relatedSaleId: { type: String },
        notes: { type: String },
    },
    { timestamps: true }
);

const Income: Model<IIncome> = models.Income || mongoose.model<IIncome>('Income', IncomeSchema);

export default Income;
