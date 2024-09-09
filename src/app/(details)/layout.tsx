'use client'
import '@/app/globals.css'
import { PageProvider } from '@/app/providers/PageContext'

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>
}

export default function ListingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PageProvider>
      <LayoutContent>{children}</LayoutContent>
    </PageProvider>
  )
}
