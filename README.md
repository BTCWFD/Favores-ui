# FAVORES - UI Project

Institutional platform for social impact and community collaboration. This repository contains the frontend implementation, technical documentation, and design systems for the FAVORES ecosystem.

## Project Overview

FAVORES is an exchange platform where users contribute their time and skills to help others, accumulating Karma as a social reputation metric. Its primary mission is to facilitate community mutual aid without the need for traditional legal tender.

## Key Features

- **Mission Control Aesthetic**: High-end UI/UX with glassmorphism, dynamic animations, and premium design tokens.
- **Social Impact Dashboard**: Visual representation of user contributions, achievements, and community standing.
- **Real-Time Communication**: Integrated chat system for instant coordination between users.
- **Transactional Ledger**: Transparent history of Karma transactions and completed favors.
- **Identity Verification Gate**: Secure onboarding process focusing on legal compliance and data protection.
- **Mobile-First PWA**: Progressive Web App optimized for mobile devices with an app-like navigation experience.

## Technology Stack

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Database / Backend**: Supabase (PostgreSQL, Realtime, Storage)
- **Authentication**: Supabase Auth
- **Icons / Graphics**: Custom SVG and Google Fonts (Outfit, Inter)

## Directory Structure

- `/app`: Next.js App Router pages and global layouts.
- `/src/components`: Modular UI components focused on visual excellence.
- `/src/context`: Global state management for user sessions and social metrics.
- `/src/lib`: Service layers for Supabase integration, transactions, and real-time chat.
- `/public`: Static assets, manifesting details, and PWA configurations.

## Development Setup

To run the project locally, ensure you have the required environment variables:

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Create a `.env.local` file with the following variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Run the development server: `npm run dev`.
5. Access the application at `http://localhost:3000`.

## Compliance and Security

The platform implements Row Level Security (RLS) policies to ensure data privacy and follows institutional legal standards for user verification and data management.
