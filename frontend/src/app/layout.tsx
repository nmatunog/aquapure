// Root layout
// Following coding standards: Rule 21, Rule 84

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aquapure',
  description: 'Aquapure application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

