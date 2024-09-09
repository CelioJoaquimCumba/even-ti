'use client'
import SideBar from './components/molecules/side-bar'
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
          <UserProvider>
            <div className="flex flex-col md:flex-row overflow-hidden h-dvh w-screen ">
              <SideBar />
              {children}
            </div>
          </UserProvider>
        </body>
      </html>
    </PageProvider>
  )
}
