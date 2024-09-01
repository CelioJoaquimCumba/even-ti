'use client'
import { PageProvider } from './providers/PageContext'
import { UserProvider } from '@auth0/nextjs-auth0/client'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PageProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <UserProvider>{children}</UserProvider>
        </body>
      </html>
    </PageProvider>
  )
}
