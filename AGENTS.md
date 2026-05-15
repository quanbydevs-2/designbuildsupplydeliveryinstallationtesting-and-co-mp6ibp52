# AGENTS.md — Tubod Municipality Agriculture Information System

## Overview
A comprehensive digital platform designed for the Municipality of Tubod, Surigao del Norte, to modernize agricultural management through farmer registration, crop monitoring, livestock tracking, resource allocation, and data-driven agricultural decision making. The system enhances food security, optimizes crop yields, and supports evidence-based policy formulation for sustainable agricultural development in the region.

## Stack
- **Monorepo**: Turborepo + pnpm
- **Frontend**: Next.js 16 + Tailwind v4 + shadcn/ui
- **Backend**: NestJS 11 + Drizzle ORM
- **Auth**: Better Auth
- **Contracts**: oRPC + Zod
- **DB**: PostgreSQL 17

## Modules
- **Farmers** (`farmer`): First Name, Last Name, Middle Name, Contact Number, Complete Address, Barangay, Date of Birth, Years of Experience
- **Land Parcels** (`landparcel`): Farmer ID, Parcel Name, Area (Hectares), Soil Type, Water Source, Current Land Use, GPS Coordinates, Land Title Number
- **Crop Production** (`crop`): Farmer ID, Land Parcel, Crop Type, Variety, Planting Date, Planted Area (Ha), Expected Yield (MT), Production Cost
- **Livestock** (`livestock`): Farmer ID, Species, Breed, Gender, Birth Date, Acquisition Date, Current Weight (kg), Health Status
- **Programs** (`program`): Program Name, Description, Start Date, End Date, Budget Amount, Target Beneficiaries, Eligibility Criteria, Status

## Commands
- `pnpm dev` — Start all apps
- `pnpm build` — Build everything
- `pnpm db:push` — Push DB schema
- `pnpm db:seed` — Seed data
- `pnpm test` — Run tests
- `pnpm lint` — Lint all

## Structure
```
├── apps/web/         # Next.js frontend
├── apps/backend/     # NestJS API
├── packages/db/      # Drizzle ORM
├── packages/auth/    # Better Auth
├── packages/contracts/ # oRPC + Zod
└── tooling/          # Shared configs
```

Always use `pnpm` (never npm/yarn).