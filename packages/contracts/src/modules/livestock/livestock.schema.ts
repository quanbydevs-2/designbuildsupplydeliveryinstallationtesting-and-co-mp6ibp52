import { z } from "zod"

export const livestockSchema = z.object({
  id: z.number(),
  farmerID: z.string(),
  species: z.string(),
  breed: z.string(),
  gender: z.string(),
  birthDate: z.date().optional(),
  acquisitionDate: z.date(),
  currentWeight: z.number().optional(),
  healthStatus: z.string(),
  status: z.string().default("active"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type Livestock = z.infer<typeof livestockSchema>