import { oc } from "@orpc/contract"
import { livestockSchema } from "./livestock.schema.js"
import { z } from "zod"

export const livestockContract = oc.router({
  list: oc.input(z.object({ search: z.string().optional(), status: z.string().optional(), page: z.number().default(1), limit: z.number().default(20) })).output(z.object({ data: z.array(livestockSchema), total: z.number() })),
  getById: oc.input(z.object({ id: z.number() })).output(livestockSchema),
  create: oc.input(livestockSchema.omit({ id: true, createdAt: true, updatedAt: true })).output(livestockSchema),
  update: oc.input(z.object({ id: z.number() }).merge(livestockSchema.partial())).output(livestockSchema),
  delete: oc.input(z.object({ id: z.number() })).output(z.object({ success: z.boolean() })),
})