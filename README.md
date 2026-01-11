# **CAFE & CHILL**: Modern Cafe Experience Platform 


[![Version](https://img.shields.io/badge/version-1.0-orange?style=flat-square)](https://github.com/your-username/cafe-and-chill)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-coffee-and-chill.vercel.app-orange)](https://coffee-and-chill.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-purple?style=flat-square&logo=pwa)](https://web.dev/progressive-web-apps/)

A comprehensive cafe management solution blending a cinematic digital storefront with a robust staff POS and admin dashboard. Designed with the polish of a premium coffee house.

![Cafe Banner](https://socialify.git.ci/itsSambuddha/Cafe_and_Chill/image?font=Jost&language=1&name=1&owner=1&pattern=Formal+Invitation&stargazers=1&theme=Dark)

---

## What is Cafe & Chill?

**Cafe & Chill** is a dual-surface platform: a **Visually Immersive Storefront** for customers and an **Operational OS** for staff and owners.

Unlike standard restaurant templates, this project integrates high-fidelity animations with practical business logic, featuring a custom-built POS system, real-time sales history, and a digital flipbook menu that brings the in-store experience online.

### Core Experiences

* **Cinematic Front-End**: Parallax effects, 3D flipbook menus, and glassmorphic aesthetics.
* **Staff OS**: A dedicated Point-of-Sale (POS) system for iPad/Tablets with printer support.
* **Admin Command Center**: Complete control over menu items, inventory, and financial reporting.

---

## Key Features

* **☕ 3D Digital Menu**: Interactive flipbook experience with parallax food imagery.
* **🚀 Full PWA Support**: Installable on iOS/Android with offline capabilities.
* **🏧 Staff POS Portal**: Optimized for touchscreens, featuring itemized billing and receipt generation.
* **📊 Admin Dashboard**: Real-time sales tracking, inventory management, and menu editing.
* **🪟 Glassmorphic UI**: Modern aesthetic using `shadcn/ui` + custom Tailwind v4 tokens.
* **🌗 Dynamic Theming**: Intelligent light/dark modes adhering to the "Coffee Design System".
* **📍 Interactive Location**: Integrated Google Maps for seamless "Visit Us" flows.

### POS Logic

The platform includes a robust billing engine for staff:

```ts
const calculateTotal = (cart: CartItem[]) => {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * TAX_RATE; // Configurable tax rate
  return { subtotal, tax, grandTotal: subtotal + tax };
}
```

---

## Tech Stack

* **Frontend**: Next.js 16.1+ (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS v4 (CSS-first via `@import`)
* **Animations**: Framer Motion + GSAP
* **Components**: shadcn/ui + Radix Primitives
* **Backend**: Firebase 12 + Mongoose 9 (Hybrid Data Layer)
* **PWA**: @ducanh2912/next-pwa
* **Deployment**: Vercel

---

## User Classes

* **Customers**: Experience the brand, browse the cinematic menu, and find the location.
* **Staff**: Use the protected POS route to punch orders, view history, and print receipts.
* **Admin**: Manage the business logic, analytics, and platform configuration.

---

## Getting Started

This section is for developers looking to extend the project locally.

### Prerequisites

* Node.js 18+
* MongoDB URI
* Firebase Credentials

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/cafe-and-chill.git
   cd cac
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Configuration**

   Create a `.env.local` file with your credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   MONGODB_URI=...
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```txt
cac/
├── app/
│   ├── (landing)/         # Public facing pages (Home, Menu, Visit)
│   ├── (protected)/       # Authenticated routes
│   ├── admin/             # Dashboard pages
│   ├── staff/             # POS and Sales History
│   ├── api/               # Server-side logic
│   └── globals.css        # Tailwind v4 & Theme variables
├── components/
│   ├── ui/                # Shadcn UI reusable components
│   ├── features/          # MenuFlipbook, POSCart, SalesTable
│   └── layout/            # Navbar, Footer
├── lib/
│   ├── firebase-client.ts # Auth & Client SDK
│   └── db.ts              # Mongoose connection
├── public/
│   └── assets/            # High-res assets
└── next.config.ts         # PWA & Build config
```

---

## Core Flows

* **Customer Journey**: Landing -> Cinematic Menu -> About/Contact.
* **Staff Workflow**: Login -> POS -> Add Items -> Checkout -> Print Receipt.
* **Admin Workflow**: Dashboard -> Update Menu Price -> Sync to Live Site.

---

## Roadmap

* [ ] Integration of Stripe/Razorpay for online ordering.
* [ ] Advanced Inventory tracking with auto-deduction.
* [ ] AI-driven recommendation engine for customers.
* [ ] Multi-store support.

---

## License

**Developed By Sam. All dev rights reserved.**
