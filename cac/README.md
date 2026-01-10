
# Cafe & Chill (CaC) App

## Authentication & RBAC System

This project now includes a full Authentication system using Firebase, MongoDB, and Next.js App Router.

### Setup Instructions

1. **Environment Variables**:
   Create or update `.env.local` with the following:

   ```bash
   # Firebase Client (Get these from Firebase Console -> Project Settings)
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...

   # Firebase Admin (Secure)
   # NOTE: Private Key must handle newlines correctly.
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@...
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."

   # MongoDB
   MONGODB_URI=mongodb+srv://...

   # SMTP (For Staff Welcome Emails)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME="Your Name"
   SMTP_EMAIL="your-email@gmail.com"
   SMTP_APP_PASSWORD="app-specific-password"

   # App Config
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   
   # Admin Configuration
   # Comma-separated list of emails that should automatically become Admins
   ADMIN_EMAIL=admin@cafeandchill.com,owner@cafeandchill.com
   ```

2. **Roles & Permissions**:
   - **Admin**: Full access to `/admin/*`. Can approve/reject staff.
   - **Staff**: Access to `/staff/*`. Can record sales.
   - **Customer**: Default role (if not staff). Currently no specific dashboard.
   - **Status**: Users start as `pending`. Admins must approve them in `/admin/staff`.

3. **Development**:
   - Run `npm run dev`
   - Login at `/login`.

### Features
- **Login/Signup**: Email/Password, Google, Apple (Configured via Firebase Console).
- **Admin Dashboard**: Staff management, sales overview.
- **Staff POS**: Quick sales entry with UPI QR code (`public/upi/cafe-and-chill-gpay-qr.png`).
- **Email Notifications**: Automated via Nodemailer on staff approval.
