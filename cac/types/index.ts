export type UserRole = 'admin' | 'staff' | 'customer';
export type UserStatus = 'pending' | 'approved' | 'rejected';

export interface DbUser {
    _id: string;
    firebaseUid: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    displayName?: string;
    createdAt?: string;
}
