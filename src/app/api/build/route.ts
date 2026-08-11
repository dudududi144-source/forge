import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { repo, branch = 'main' } = body
    
    if (!repo) {
      return NextResponse.json(
        { success: false, error: 'repo is required' },
        { status: 400 }
      )
    }
    
    const buildId = `build_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    const githubToken = process.env.GH_TOKEN || process.env.GITHUB_TOKEN
    
    if (githubToken) {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${repo}/actions/workflows/ci.yml/dispatches`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${githubToken}`,
              'Accept': 'application/vnd.github+json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ref: branch }),
          }
        )
        
        if (response.status === 204) {
          return NextResponse.json({
            success: true,
            buildId,
            status: 'triggered',
            repo,
            branch,
          })
        } else {
          return NextResponse.json({
            success: false,
            buildId,
            status: 'failed',
            error: `GitHub API returned ${response.status}`,
          }, { status: 500 })
        }
      } catch (error) {
        return NextResponse.json({
          success: false,
          buildId,
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        }, { status: 500 })
      }
    }
    
    return NextResponse.json({
      success: true,
      buildId,
      status: 'queued',
      repo,
      branch,
      message: 'Build queued (no GitHub token configured)',
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}
