import { defineRelations } from "drizzle-orm"
import { createTable } from "./utils/table.js"

// ═══════════════ AUTH TABLES ═══════════════

export const users = createTable("users", t => ({
  id: t.text("id").primaryKey(),
  name: t.text("name").notNull(),
  email: t.text("email").notNull().unique(),
  emailVerified: t.boolean("email_verified").default(false).notNull(),
  image: t.text("image"),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
}))

export const sessions = createTable("sessions", t => ({
  id: t.text("id").primaryKey(),
  token: t.text("token").notNull().unique(),
  userId: t.text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expiresAt: t.timestamp("expires_at").notNull(),
  ipAddress: t.text("ip_address"),
  userAgent: t.text("user_agent"),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
}))

export const accounts = createTable("accounts", t => ({
  id: t.text("id").primaryKey(),
  accountId: t.text("account_id").notNull(),
  providerId: t.text("provider_id").notNull(),
  userId: t.text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  accessToken: t.text("access_token"),
  refreshToken: t.text("refresh_token"),
  password: t.text("password"),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
}))

export const verifications = createTable("verifications", t => ({
  id: t.text("id").primaryKey(),
  identifier: t.text("identifier").notNull(),
  value: t.text("value").notNull(),
  expiresAt: t.timestamp("expires_at").notNull(),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
}))

// ═══════════════ MODULE TABLES ═══════════════

export const farmers = createTable("farmers", t => ({
  id: t.serial("id").primaryKey(),
  firstName: t.text("first_name").notNull(),
  lastName: t.text("last_name").notNull(),
  middleName: t.text("middle_name"),
  contactNumber: t.text("contact_number").notNull(),
  address: t.text("address").notNull(),
  barangay: t.text("barangay").notNull(),
  birthDate: t.timestamp("birth_date").notNull(),
  farmingExperience: t.integer("farming_experience").notNull(),
  status: t.text("status").notNull().default("active"),
  authorId: t.text("author_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
}))

export const landparcels = createTable("landparcels", t => ({
  id: t.serial("id").primaryKey(),
  farmerID: t.text("farmer_i_d").notNull(),
  parcelName: t.text("parcel_name").notNull(),
  area: t.doublePrecision("area").notNull(),
  soilType: t.text("soil_type").notNull(),
  waterSource: t.text("water_source").notNull(),
  landUse: t.text("land_use").notNull(),
  gpsCoordinates: t.text("gps_coordinates"),
  titleNumber: t.text("title_number"),
  status: t.text("status").notNull().default("active"),
  authorId: t.text("author_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
}))

export const crops = createTable("crops", t => ({
  id: t.serial("id").primaryKey(),
  farmerID: t.text("farmer_i_d").notNull(),
  parcelID: t.text("parcel_i_d").notNull(),
  cropType: t.text("crop_type").notNull(),
  variety: t.text("variety").notNull(),
  plantingDate: t.timestamp("planting_date").notNull(),
  plantedArea: t.doublePrecision("planted_area").notNull(),
  expectedYield: t.doublePrecision("expected_yield"),
  productionCost: t.doublePrecision("production_cost"),
  status: t.text("status").notNull().default("active"),
  authorId: t.text("author_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
}))

export const livestocks = createTable("livestocks", t => ({
  id: t.serial("id").primaryKey(),
  farmerID: t.text("farmer_i_d").notNull(),
  species: t.text("species").notNull(),
  breed: t.text("breed").notNull(),
  gender: t.text("gender").notNull(),
  birthDate: t.timestamp("birth_date"),
  acquisitionDate: t.timestamp("acquisition_date").notNull(),
  currentWeight: t.doublePrecision("current_weight"),
  healthStatus: t.text("health_status").notNull(),
  status: t.text("status").notNull().default("active"),
  authorId: t.text("author_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
}))

export const programs = createTable("programs", t => ({
  id: t.serial("id").primaryKey(),
  programName: t.text("program_name").notNull(),
  description: t.text("description").notNull(),
  startDate: t.timestamp("start_date").notNull(),
  endDate: t.timestamp("end_date").notNull(),
  budget: t.doublePrecision("budget").notNull(),
  targetBeneficiaries: t.integer("target_beneficiaries").notNull(),
  eligibilityCriteria: t.text("eligibility_criteria").notNull(),
  status: t.text("status").notNull(),
  status: t.text("status").notNull().default("active"),
  authorId: t.text("author_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
}))

// ═══════════════ RELATIONS ═══════════════

export const relations = defineRelations({ users, sessions, accounts, farmers, landparcels, crops, livestocks, programs }, r => ({
  users: {
    sessions: r.many.sessions(),
    accounts: r.many.accounts(),
  },
  sessions: {
    user: r.one.users({ from: r.sessions.userId, to: r.users.id }),
  },
  accounts: {
    user: r.one.users({ from: r.accounts.userId, to: r.users.id }),
  },
  farmers: {
    author: r.one.users({ from: r.farmers.authorId, to: r.users.id }),
  },
  landparcels: {
    author: r.one.users({ from: r.landparcels.authorId, to: r.users.id }),
  },
  crops: {
    author: r.one.users({ from: r.crops.authorId, to: r.users.id }),
  },
  livestocks: {
    author: r.one.users({ from: r.livestocks.authorId, to: r.users.id }),
  },
  programs: {
    author: r.one.users({ from: r.programs.authorId, to: r.users.id }),
  },
}))

export const schema = Object.assign({ users, sessions, accounts, verifications, farmers, landparcels, crops, livestocks, programs }, relations)
