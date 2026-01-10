import mongoose, { Schema, Model, models } from 'mongoose';

// Matching roughly the MenuCategory and MenuItem types from project, but adaptable
export interface IMenuItem {
    _id?: string;
    id: string; // string ID used in frontend
    name: string;
    description: string;
    price: number;
    category: string;
    image?: string;
    tags?: string[];
    isVegetarian?: boolean;
    isSpicy?: boolean;
    isChefSpecial?: boolean;
    isAvailable: boolean;
    featured?: boolean;
    bestSeller?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const schemaDefinition = {
    id: { type: String, required: true, unique: true }, // custom slug/id
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // e.g. "coffee", "pastry"
    image: { type: String },
    tags: [String],
    isVegetarian: { type: Boolean, default: false },
    isSpicy: { type: Boolean, default: false },
    isChefSpecial: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
};

const MenuItemSchema = new Schema(schemaDefinition, { timestamps: true });

const MenuItem: Model<IMenuItem> = mongoose.models.MenuItem || mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);

export default MenuItem;
