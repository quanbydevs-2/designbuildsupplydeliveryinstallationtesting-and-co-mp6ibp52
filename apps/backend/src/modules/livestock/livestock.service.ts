import { Injectable, NotFoundException } from "@nestjs/common"
import { getDB } from "../common/database/database.client"
import { livestocks } from "@repo/db/schema"
import { eq, ilike, or, count, desc } from "drizzle-orm"

@Injectable()
export class LivestockService {
  private get db() { return getDB() }

  async findAll({ search, status, page, limit }: { search?: string; status?: string; page: number; limit: number }) {
    const offset = (page - 1) * limit
    const data = await this.db.select().from(livestocks).orderBy(desc(livestocks.createdAt)).limit(limit).offset(offset)
    const [{ value: total }] = await this.db.select({ value: count() }).from(livestocks)
    return { data, total, page, totalPages: Math.ceil(total / limit) }
  }

  async findOne(id: number) {
    const [item] = await this.db.select().from(livestocks).where(eq(livestocks.id, id))
    if (!item) throw new NotFoundException("Not found")
    return item
  }

  async create(data: any) {
    const [item] = await this.db.insert(livestocks).values(data).returning()
    return item
  }

  async update(id: number, data: any) {
    const [item] = await this.db.update(livestocks).set(data).where(eq(livestocks.id, id)).returning()
    if (!item) throw new NotFoundException("Not found")
    return item
  }

  async remove(id: number) {
    await this.db.delete(livestocks).where(eq(livestocks.id, id))
    return { success: true }
  }
}