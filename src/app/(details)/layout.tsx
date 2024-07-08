'use client'
import SideBar from '@/app/components/molecules/side-bar'
import '@/app/globals.css'
import { PageProvider } from '@/app/providers/TitleContext'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row overflow-hidden h-dvh w-screen ${inter.className}`}
    >
      <SideBar />
      {children}
    </div>
  )
}

export default function ListingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PageProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <LayoutContent>{children}</LayoutContent>
        </body>
      </html>
    </PageProvider>
  )
}
