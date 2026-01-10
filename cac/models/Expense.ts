import mongoose, { Schema, Model, models } from 'mongoose';

export interface IExpense {
    _id?: string;
    title: string;
    category: string;
    amount: number;
    date: Date;
    relatedBillId?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ExpenseSchema = new Schema<IExpense>(
    {
        title: { type: String, required: true },
        category: { type: String, default: 'General' },
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now },
        relatedBillId: { type: String },
        notes: { type: String },
    },
    { timestamps: true }
);

const Expense: Model<IExpense> = models.Expense || mongoose.model<IExpense>('Expense', ExpenseSchema);

export default Expense;
