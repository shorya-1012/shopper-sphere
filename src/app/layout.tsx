import './globals.css'
import type { Metadata } from 'next'
import { Nunito, Kanit, Archivo_Black, Questrial } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import NavBar from '@/components/navbar-ui/NavBar'
import ReactQueryProvider from '@/lib/ReactQueryProvider'
import React from 'react'
import { Toaster } from '@/components/ui/toaster'
import AOSInit from '@/lib/AOSInit'

const kanit = Kanit({
  subsets: ['latin'],
  weight: '500',
  style: 'italic',
  variable: '--font-kanit'
})

const nunito = Nunito({
  weight: '600',
  subsets: ['latin'],
  variable: '--font-nunito'
})

const archivo_black = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-heading'
})

const review = Questrial({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-review'
})


export const metadata: Metadata = {
  title: 'shopperSphere',
  description: 'Your stop for all your needs',
}

export default async function RootLayout({
  children,
}:
  {
    children: React.ReactNode,
  }) {
  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <html lang="en">
          <AOSInit />
          <body className={`${kanit.variable} ${nunito.variable} ${archivo_black.variable} ${review.variable} font-sans overflow-x-hidden`} >
            <NavBar />
            <div className=''>
              {children}
            </div>
            <Toaster />
          </body>
        </html>
      </ReactQueryProvider>
    </ClerkProvider >
  )
}
