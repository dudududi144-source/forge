import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Forge - Sovereign CI/CD',
  description: 'Build, test, and deploy with full observability and control.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
