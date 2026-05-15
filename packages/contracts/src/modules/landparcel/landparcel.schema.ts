import { z } from "zod"

export const landparcelSchema = z.object({
  id: z.number(),
  farmerID: z.string(),
  parcelName: z.string(),
  area: z.number(),
  soilType: z.string(),
  waterSource: z.string(),
  landUse: z.string(),
  gpsCoordinates: z.string().optional(),
  titleNumber: z.string().optional(),
  status: z.string().default("active"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type LandParcel = z.infer<typeof landparcelSchema>