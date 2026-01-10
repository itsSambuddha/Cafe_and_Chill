import mongoose, { Schema, Model, models } from 'mongoose';

export interface IBill {
    _id?: string;
    title: string;
    category: 'Electricity' | 'Rent' | 'Raw Materials' | 'Maintenance' | 'Other';
    amount: number;
    dueDate?: Date;
    paidDate?: Date;
    isPaid: boolean;
    referenceId?: string; // Invoice number
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const BillSchema = new Schema<IBill>(
    {
        title: { type: String, required: true },
        category: {
            type: String,
            enum: ['Electricity', 'Rent', 'Raw Materials', 'Maintenance', 'Other'],
            default: 'Other'
        },
        amount: { type: Number, required: true },
        dueDate: { type: Date },
        paidDate: { type: Date },
        isPaid: { type: Boolean, default: false },
        referenceId: { type: String },
        notes: { type: String },
    },
    { timestamps: true }
);

const Bill: Model<IBill> = models.Bill || mongoose.model<IBill>('Bill', BillSchema);

export default Bill;
