import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

/**
 * Database abstraction layer for Forge.
 * 
 * Supports multiple backends:
 * - Turso/libSQL (primary, platform-agnostic)
 * - Local SQLite (development)
 * 
 * Design: The adapter pattern allows switching backends without
 * changing application code. This prevents vendor lock-in.
 */

type DatabaseMode = 'turso' | 'local'

function getDatabaseMode(): DatabaseMode {
  if (process.env.TURSO_URL && process.env.TURSO_AUTH_TOKEN) {
    return 'turso'
  }
  return 'local'
}

function createPrismaClient(): PrismaClient {
  const mode = getDatabaseMode()
  
  if (mode === 'turso') {
    const libsql = createClient({
      url: process.env.TURSO_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
    
    const adapter = new PrismaLibSQL(libsql)
    return new PrismaClient({ adapter } as any)
  }
  
  // Local SQLite (development)
  return new PrismaClient({
    datasources: {
      db: {
        url: 'file:./dev.db',
      },
    },
  })
}

// Singleton pattern to prevent multiple connections
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}

export default db
