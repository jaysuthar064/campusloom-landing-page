# SmartShala ERP - Landing Page Integration Analysis

## Overview
This document outlines how the new Headless WordPress + React (Vite) Landing Page will connect and route users to the existing MERN/Next.js ERP application currently hosted at `https://campus-loom.vercel.app/`.

## 1. Routing Strategy (Linking the Two Apps)
Since the landing page and the ERP system are hosted separately, they will be seamlessly connected via absolute URL links. The landing page acts as the attractive "front door" to your software.

**Key Connection Points on the Landing Page:**
- **Login Button (Header/Nav):** Links directly to the ERP authentication route (e.g., `https://campus-loom.vercel.app/login`).
- **"Get Free Demo" / "Get Started" (Hero Section):** 
  - *Option A:* Links directly to an onboarding/registration page on the main app (e.g., `https://campus-loom.vercel.app/register`).
  - *Option B:* Opens a Lead Capture form on the landing page itself, which saves inquiries to the WordPress backend.
- **Pricing "Get Started" CTA:** Links to the main app's signup flow. We can even pass URL parameters to pre-select a plan (e.g., `https://campus-loom.vercel.app/register?plan=starter`).

## 2. Authentication & Session Management
- **Complete Separation:** The landing page does not need to handle user sessions, JWT tokens, or any complex authentication logic. It is completely public.
- **Enhanced Security:** This separation keeps your ERP data highly secure. The WordPress backend only manages public marketing content, while the MERN app safely handles all sensitive school and student data.
- **User Flow:** When an administrator (like `principal@smartshala.local`) clicks "Login" on the landing page, they leave the Vite marketing site and enter the secure Vercel application environment where your MERN authentication logic securely takes over.

## 3. Production Domain Mapping
To make the transition between the Landing Page and the ERP completely seamless for the user, we will map them using custom subdomains in production:

- **Landing Page (Vite Frontend):** `https://www.smartshala.com`
- **Main ERP System (Vercel App):** `https://app.smartshala.com` (or `portal.smartshala.com`)
- **Headless WordPress (Content Backend):** `https://admin.smartshala.com`

*Technical Note: Upon analyzing the Vercel URL, I identified that the live ERP is built using Next.js and operates as a Single Page Application (SPA) with protected routes like `/dashboard`. Because it manages its own state and routing, the landing page only needs to point users to the correct entry points (like `/login`), making integration very clean and straightforward.*
