import { NextResponse } from 'next/server'

/**
 * Build status API endpoint for Forge.
 * 
 * GET /api/build/[buildId]
 * 
 * Response: { buildId: string, status: string, repo: string, branch: string }
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ buildId: string }> }
) {
  const { buildId } = await params
  
  // In a real implementation, this would query the database
  // For now, return a mock response
  return NextResponse.json({
    buildId,
    status: 'completed',
    repo: 'unknown',
    branch: 'main',
    timestamp: new Date().toISOString(),
  })
}
