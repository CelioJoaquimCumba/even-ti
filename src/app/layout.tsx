'use client'
import { PageProvider } from './providers/TitleContext'
import { UserProvider } from '@auth0/nextjs-auth0/client'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PageProvider>
      <html lang="en">
        <UserProvider>
          <body suppressHydrationWarning={true}>{children}</body>
        </UserProvider>
      </html>
    </PageProvider>
  )
}
