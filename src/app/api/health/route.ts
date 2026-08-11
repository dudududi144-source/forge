import { NextResponse } from 'next/server'

/**
 * Health check endpoint.
 * 
 * Returns system status including:
 * - API availability
 * - Database connectivity
 * - Timestamp for debugging
 * 
 * Used by monitoring systems and load balancers.
 */
export async function GET() {
  const startTime = Date.now()
  
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {
      api: 'ok',
      database: 'pending', // Will be implemented with actual DB check
    },
    latency: {
      total: 0,
    },
  }
  
  // TODO: Add actual database health check
  // try {
  //   await db.$queryRaw`SELECT 1`
  //   health.checks.database = 'ok'
  // } catch {
  //   health.checks.database = 'error'
  //   health.status = 'degraded'
  // }
  
  health.latency.total = Date.now() - startTime
  
  return NextResponse.json(health, {
    status: health.status === 'healthy' ? 200 : 503,
  })
}
