import mongoose, { Schema, Model, models } from 'mongoose';

export type UserRole = 'admin' | 'staff' | 'customer';
export type UserStatus = 'pending' | 'approved' | 'rejected';

export interface IUser {
    _id?: string;
    firebaseUid: string;
    email: string;
    displayName?: string;
    phoneNumber?: string;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        firebaseUid: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        displayName: { type: String },
        phoneNumber: { type: String },
        role: {
            type: String,
            enum: ['admin', 'staff', 'customer'],
            default: 'staff'
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        },
    },
    { timestamps: true }
);

const User: Model<IUser> = models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
