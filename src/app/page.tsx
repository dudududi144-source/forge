import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Forge</h1>
        <p style={{ color: '#888' }}>Sovereign CI/CD Platform</p>
      </header>
      
      <section style={{ marginBottom: '2rem' }}>
        <h2>System Status</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <StatusCard title="API" status="operational" />
          <StatusCard title="Database" status="operational" />
          <StatusCard title="Build Engine" status="idle" />
        </div>
      </section>
      
      <section>
        <h2>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Link href="/api/health" style={buttonStyle}>Health Check</Link>
        </div>
      </section>
    </main>
  )
}

function StatusCard({ title, status }: { title: string; status: string }) {
  const colors: Record<string, string> = {
    operational: '#22c55e',
    idle: '#f59e0b',
    error: '#ef4444',
  }
  
  return (
    <div style={{ padding: '1rem', border: '1px solid #333', borderRadius: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors[status] || '#666' }} />
        <span style={{ fontWeight: 'bold' }}>{title}</span>
      </div>
      <p style={{ color: '#888', fontSize: '0.875rem', marginTop: '0.5rem' }}>{status}</p>
    </div>
  )
}

const buttonStyle: React.CSSProperties = {
  padding: '0.75rem 1.5rem',
  background: '#3b82f6',
  color: 'white',
  borderRadius: '6px',
  fontWeight: 'bold',
}
