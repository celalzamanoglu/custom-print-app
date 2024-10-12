import './globals.css'
import '../styles/theme.css'  // Add this line
import { Inter } from 'next/font/google'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'App Name',
  description: 'Design your own custom printed paper',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header style={{
          backgroundColor: 'var(--header-background)',
          color: 'var(--header-text-color)',
          padding: '1rem',
        }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 style={{ cursor: 'pointer' }}>App Name</h1>
          </Link>
        </header>
        {children}
      </body>
    </html>
  )
}