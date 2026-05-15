import { oc } from "@orpc/contract"
import { landparcelSchema } from "./landparcel.schema.js"
import { z } from "zod"

export const landparcelContract = oc.router({
  list: oc.input(z.object({ search: z.string().optional(), status: z.string().optional(), page: z.number().default(1), limit: z.number().default(20) })).output(z.object({ data: z.array(landparcelSchema), total: z.number() })),
  getById: oc.input(z.object({ id: z.number() })).output(landparcelSchema),
  create: oc.input(landparcelSchema.omit({ id: true, createdAt: true, updatedAt: true })).output(landparcelSchema),
  update: oc.input(z.object({ id: z.number() }).merge(landparcelSchema.partial())).output(landparcelSchema),
  delete: oc.input(z.object({ id: z.number() })).output(z.object({ success: z.boolean() })),
})