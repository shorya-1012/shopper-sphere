import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import NavBar from '@/components/navbar-ui/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'shopperSphere',
  description: 'Your stop for all your needs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavBar />
          <div className='pt-[93px]'>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
