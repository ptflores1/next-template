import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : [],
})

export interface Context {
  /** Prisma client */
  prisma: PrismaClient
}

export const context: (ctx) => Promise<Context> = async () => ({
  prisma,
})
