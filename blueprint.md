# Star Tech Phone Repairs — Complete Platform Blueprint
## Modern Repair Management Platform
### Built with SvelteKit + PocketBase

---

# Company Information

## Business
Star Tech Phone Repairs

## Website
https://www.startechphonerepairs.com.au

## Location
33 Crimson Blvd, Forrestfield WA 6058, Australia

## Positioning
Perth’s Premier Tech Repair Service

## Brand Personality
- Professional
- Fast
- Reliable
- Premium
- Affordable
- Modern

## Core Selling Points
- Same-Day Repairs
- High Quality Parts
- Free Diagnostics
- No Fix No Fee
- 90-Day / 12-Month Warranty
- 4.9★ Google Reviews

---

# Core Platform Vision

A premium, high-performance repair booking and management platform that allows:

- Customers to instantly book repairs online
- Customers to track repairs in real time
- Technicians to manage repair workflows
- Admins to manage inventory, customers, and analytics
- Automated communication via WhatsApp, SMS, and Email
- SEO-focused service pages for Google rankings
- Scalable future features like AI diagnostics and trade-ins

---

# Final Recommended Tech Stack

| Layer | Technology |
|---|---|
| Frontend | SvelteKit + TypeScript + Svelte 5 |
| Styling | Tailwind CSS + shadcn-svelte |
| UI Components | shadcn-svelte |
| Animations | Svelte transitions + motion/springs |
| Forms | Superforms + Zod |
| Backend | PocketBase |
| Database | SQLite |
| Authentication | PocketBase Auth |
| File Storage | PocketBase built-in |
| Hosting | Cloudflare Pages + VPS |
| Notifications | Twilio + WhatsApp API |
| Payments | Stripe |
| Analytics | Umami |
| Error Tracking | Sentry |
| PWA | @vite-pwa/sveltekit |

---

# Why SvelteKit + PocketBase

## Advantages

### SvelteKit
- Extremely fast
- Smaller bundles than React/Next.js
- Excellent SEO
- File-based routing
- Server-side rendering
- Perfect for mobile users

### PocketBase
- Realtime subscriptions
- Built-in authentication
- Built-in file storage
- Simple deployment
- Very fast development cycle
- Lightweight VPS requirements

### Combined Benefits
- Lower hosting costs
- Better performance
- Easier maintenance
- Faster development
- Excellent user experience

---

# Design System

## Color Palette

```css
:root {
  --primary: #0F172A;
  --secondary: #1E293B;
  --accent: #3B82F6;
  --success: #10B981;
  --warning: #F59E0B;
  --danger: #EF4444;
  --light: #F8FAFC;
  --muted: #64748B;
  --border: #E2E8F0;
  --white: #FFFFFF;
}
```

---

# Typography

| Element | Size | Weight |
|---|---|---|
| H1 | 56px | 700 |
| H2 | 40px | 700 |
| H3 | 24px | 600 |
| Body | 16px | 400 |

## Font Stack

```css
font-family: Inter, system-ui, sans-serif;
```

---

# UI/UX Direction

## Style
- Apple-inspired
- Minimal
- Premium
- Glassmorphism
- Soft shadows
- Rounded corners
- Large spacing
- Smooth transitions
- Motion-heavy interactions

## Inspirations
- Apple
- Linear
- Stripe Dashboard
- Notion

---

# Recommended Folder Structure

```bash
startech-repairs/
├── src/
│
│   ├── lib/
│   │   ├── pocketbase.ts
│   │   ├── stores/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── server/
│   │   └── components/
│   │
│   ├── routes/
│   │
│   │   ├── (public)/
│   │   │   ├── +layout.svelte
│   │   │   ├── +page.svelte
│   │   │   ├── services/
│   │   │   ├── pricing/
│   │   │   ├── blog/
│   │   │   ├── faq/
│   │   │   ├── contact/
│   │   │   ├── about/
│   │   │   ├── trade-in/
│   │   │   └── business-repairs/
│   │
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │
│   │   ├── (customer)/
│   │   │   ├── dashboard/
│   │   │   ├── repairs/
│   │   │   ├── invoices/
│   │   │   └── settings/
│   │
│   │   ├── (admin)/
│   │   │   ├── dashboard/
│   │   │   ├── repairs/
│   │   │   ├── inventory/
│   │   │   ├── customers/
│   │   │   ├── analytics/
│   │   │   └── technicians/
│   │
│   │   ├── book-repair/
│   │   ├── track-repair/
│   │   └── api/
│   │
│   ├── hooks.server.ts
│   ├── app.html
│   └── app.d.ts
│
├── static/
├── pocketbase/
├── docker/
├── tailwind.config.js
├── svelte.config.js
├── vite.config.ts
├── package.json
└── README.md
```

---

# Website Structure

## Public Pages

| Route | Purpose |
|---|---|
| / | Homepage |
| /services | Services |
| /pricing | Pricing |
| /book-repair | Booking |
| /track-repair | Repair tracking |
| /contact | Contact |
| /about | About |
| /faq | FAQ |
| /blog | SEO content |
| /trade-in | Device trade-ins |
| /business-repairs | Corporate repairs |
| /warranty | Warranty info |

---

# Customer Dashboard

## Features
- View repairs
- Track repair status
- Download invoices
- Manage profile
- View repair history
- Upload files/photos

---

# Admin Dashboard

## Features
- Repair queue
- Kanban workflow
- Inventory management
- Technician management
- Customer management
- Revenue analytics
- File management
- Quote management
- Notifications

---

# Recommended Repair Workflow

```txt
Received
↓
Diagnosing
↓
Awaiting Parts
↓
Repairing
↓
Quality Testing
↓
Ready For Pickup
↓
Completed
```

## Additional Statuses

```txt
Awaiting Customer Response
Cancelled
Unrepairable
```

---

# PocketBase Collection Structure

# Auth Collections

## users
Customer accounts

## technicians
Staff accounts

---

# Core Collections

## devices

### Fields
```txt
brand
model
variant
year
image
repairable
```

---

# repairs

## Fields

```txt
customer
technician
device
issue_type
description
status
price
warranty_months
notes
photos
booking_id
imei_number
serial_number
battery_health
icloud_status
screen_condition
faceid_status
created_at
updated_at
```

---

# Intake Checklist Fields

```txt
device_powers_on
screen_cracked
water_damage
camera_working
speaker_working
charging_working
customer_signed
```

---

# bookings

## Fields

```txt
customer
device
issue
preferred_date
pickup_option
status
notes
```

---

# inventory_parts

## Fields

```txt
name
sku
quantity
cost_price
sell_price
supplier
low_stock_threshold
```

---

# invoices

## Fields

```txt
repair
customer
subtotal
tax
total
status
paid_at
invoice_number
```

---

# reviews

## Fields

```txt
customer
rating
review
approved
```

---

# repair_status_logs

## Fields

```txt
repair
status
changed_by
timestamp
notes
```

---

# repair_messages

## Fields

```txt
repair
sender
message
attachments
```

---

# business_clients

## Fields

```txt
company_name
contact_person
email
phone
notes
```

---

# coupons

## Fields

```txt
code
discount_type
amount
expires_at
usage_limit
```

---

# Access Rules Example

## Repairs Collection

```js
@request.auth.id != "" && customer = @request.auth.id
```

Customers only see their own repairs.

---

# Multi-Step Booking Flow

## Step 1
Select Device Brand

## Step 2
Select Device Model

## Step 3
Select Problem

## Step 4
Instant Quote

## Step 5
Customer Information

## Step 6
Pickup or Walk-In Option

## Step 7
Confirmation

---

# Instant Quote System

## Features
- Dynamic pricing
- Device lookup
- Issue lookup
- Part pricing
- Labor calculation
- Coupon support

---

# Repair Tracker

## Features
- Enter booking ID or phone number
- Real-time repair updates
- Estimated completion
- Technician notes
- SMS notifications

---

# Realtime Features

Using PocketBase realtime subscriptions:

## Examples
- Repair status updates instantly
- Live admin dashboard
- Real-time notifications
- Technician updates
- Inventory updates

---

# SEO Strategy

## Dynamic SEO Pages

```txt
/services/apple/iphone-15-pro-screen-repair
/services/apple/iphone-15-pro-battery-repair
/services/samsung/s24-ultra-screen-repair
/services/ipad-water-damage-repair
```

## Benefits
- Better Google rankings
- Local SEO
- Service-based search traffic
- Increased conversions

---

# Blog Strategy

## Topics
- Repair guides
- Device maintenance
- Tech tips
- Comparison articles
- Local SEO articles

---

# Security Recommendations

## SvelteKit
- CSRF protection
- Rate limiting
- Session validation
- Admin route guards
- Input sanitization

## PocketBase
- Disable public access by default
- Use access rules properly
- Validate uploads
- Secure admin accounts

---

# Performance Targets

| Metric | Goal |
|---|---|
| Lighthouse | 95–100 |
| Load Time | <1.5s |
| Core Web Vitals | Excellent |
| Mobile Performance | Excellent |

---

# Image Optimization Strategy

## Features
- Automatic compression
- Thumbnail generation
- Lazy loading
- WebP conversion
- Separate original storage

---

# Progressive Web App (PWA)

## Features
- Offline support
- Push notifications
- Installable app
- Faster repeat visits
- Offline admin queue

---

# Recommended Hosting

# Frontend

## Cloudflare Pages
- Fast global CDN
- Edge caching
- Great SvelteKit support

---

# Backend

## VPS Options
- Hetzner
- DigitalOcean
- Vultr

---

# Recommended Docker Setup

```yaml
version: '3'

services:
  pocketbase:
    image: spectado/pocketbase
    restart: always
    ports:
      - "8090:8090"
    volumes:
      - ./pb_data:/pb_data
```

---

# Recommended Packages

## Core Dependencies

```bash
npm install pocketbase
npm install superforms
npm install zod
npm install lucide-svelte
npm install @tanstack/svelte-query
npm install @vite-pwa/sveltekit
```

---

# Tailwind Setup

```bash
npm install tailwindcss postcss autoprefixer
```

---

# Deployment Targets

## Frontend
Cloudflare Pages

## Backend
Ubuntu VPS + Docker

## Database
PocketBase SQLite

---

# Notifications System

## SMS
Twilio

## WhatsApp
WhatsApp Business API

## Email
Resend or Postmark

---

# Analytics Dashboard

## Metrics
- Revenue
- Most common repairs
- Technician performance
- Repeat customers
- Repair turnaround time
- Inventory usage

---

# Recommended Future Features

## Phase 2
- Customer dashboard
- Advanced inventory
- File uploads
- Blog system
- Better analytics

## Phase 3
- AI diagnostics
- Trade-in engine
- Barcode labels
- Loyalty system
- Automated reviews
- Smart pricing
- AI support assistant

---

# Development Roadmap

# Phase 1 — MVP

## Goals
- Design system
- Marketing pages
- PocketBase setup
- Authentication
- Booking flow
- Repair tracker
- Admin dashboard
- Notifications

---

# Phase 2

## Goals
- Inventory management
- Customer dashboard
- Blog
- Analytics
- File uploads

---

# Phase 3

## Goals
- AI tools
- PWA
- Trade-in system
- Automation
- Loyalty features

---

# Core Philosophy

The platform should focus on:

- Speed
- Simplicity
- Trust
- Mobile-first usability
- Fast repair booking
- Clear communication

---

# Most Important MVP Features

The initial version only needs:

1. Customer books repair
2. Admin manages repair
3. Customer tracks repair
4. Customer receives updates

Everything else can scale later.

---

# Final Summary

This platform architecture is designed to be:

- Commercial-grade
- Scalable
- SEO-optimized
- Mobile-first
- Extremely fast
- Easy to maintain
- Affordable to host
- Future-ready

The combination of SvelteKit + PocketBase provides one of the best modern stacks for a repair business platform in 2026.
