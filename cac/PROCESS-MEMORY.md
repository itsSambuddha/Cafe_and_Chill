## Step 1 – Next.js scaffold

- Date: 2026-01-09
- Goal: Initialize Next.js 14 App Router + TypeScript project.
- Commands:
  - npx create-next-app@latest cac
  - cd cac
  - npm install
  - npm run dev
- Result: Next.js starter app running at http://localhost:3000.
- Next: Install and configure Tailwind CSS + base design system.

## Step 2 – Fix Tailwind CSS Build Error

- Date: 2026-01-09
- Goal: Resolve `CssSyntaxError` in `globals.css`.
- Actions:
  - Removed `@import "tw-animate-css";` from `globals.css` as the package was missing.
- Result: Build error resolved.
- Next: Define custom colors (`coffee-dark`, `chill-light`) in `globals.css`.

## Step 3 – Aceternity UI + layout shell

- Date: 2026-01-10
- Goal: Initialize Aceternity UI and create base layout (Navbar + Footer).
- Commands:
  - npx aceternity-ui@latest init
- Files touched:
  - components.json (if needed, patched to Aceternity schema)
  - app/layout.tsx (created/updated layout shell)
- Result: Project uses a shared layout with header/footer; Aceternity UI is initialized.
- Next: Implement proper home page hero using Aceternity components + Framer Motion.
