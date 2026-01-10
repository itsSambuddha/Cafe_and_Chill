import mongoose, { Schema, Model, models } from 'mongoose';

export interface IInventoryItem {
    _id?: string;
    name: string;
    category: string;
    quantity: number;
    unit: string;
    reorderThreshold: number;
    notes?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const InventoryItemSchema = new Schema<IInventoryItem>(
    {
        name: { type: String, required: true },
        category: { type: String, default: 'General' },
        quantity: { type: Number, required: true, default: 0 },
        unit: { type: String, required: true, default: 'units' }, // kg, liters, pcs
        reorderThreshold: { type: Number, default: 5 },
        notes: { type: String },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const InventoryItem: Model<IInventoryItem> = models.InventoryItem || mongoose.model<IInventoryItem>('InventoryItem', InventoryItemSchema);

export default InventoryItem;
