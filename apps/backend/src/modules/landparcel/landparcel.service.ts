import { Injectable, NotFoundException } from "@nestjs/common"
import { getDB } from "../common/database/database.client"
import { landparcels } from "@repo/db/schema"
import { eq, ilike, or, count, desc } from "drizzle-orm"

@Injectable()
export class LandParcelService {
  private get db() { return getDB() }

  async findAll({ search, status, page, limit }: { search?: string; status?: string; page: number; limit: number }) {
    const offset = (page - 1) * limit
    const data = await this.db.select().from(landparcels).orderBy(desc(landparcels.createdAt)).limit(limit).offset(offset)
    const [{ value: total }] = await this.db.select({ value: count() }).from(landparcels)
    return { data, total, page, totalPages: Math.ceil(total / limit) }
  }

  async findOne(id: number) {
    const [item] = await this.db.select().from(landparcels).where(eq(landparcels.id, id))
    if (!item) throw new NotFoundException("Not found")
    return item
  }

  async create(data: any) {
    const [item] = await this.db.insert(landparcels).values(data).returning()
    return item
  }

  async update(id: number, data: any) {
    const [item] = await this.db.update(landparcels).set(data).where(eq(landparcels.id, id)).returning()
    if (!item) throw new NotFoundException("Not found")
    return item
  }

  async remove(id: number) {
    await this.db.delete(landparcels).where(eq(landparcels.id, id))
    return { success: true }
  }
}