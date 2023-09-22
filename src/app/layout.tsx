import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './Navbar/navbar'
import Footer from './Footer'
import SessionProvider from "../app/SessionProvider"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nesimaishyk',
  description: 'Organic textile made in Lithuania',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <main className='p-4 max-w-7xl m-auto min-w-[300px]'>
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
