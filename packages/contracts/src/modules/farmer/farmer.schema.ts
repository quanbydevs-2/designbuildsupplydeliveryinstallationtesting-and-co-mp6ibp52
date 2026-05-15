import { z } from "zod"

export const farmerSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
  contactNumber: z.string(),
  address: z.string(),
  barangay: z.string(),
  birthDate: z.date(),
  farmingExperience: z.number(),
  status: z.string().default("active"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type Farmer = z.infer<typeof farmerSchema>