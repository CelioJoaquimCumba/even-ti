'use client'
import { Inter } from 'next/font/google';
import SideBar from '@/app/components/molecules/side-bar';
import { PageProvider } from '@/app/providers/TitleContext';
import '@/app/globals.css'
import { useRouter } from 'next/navigation';


const inter = Inter({ subsets: ['latin'] });

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {title} = {
    title: 'Data Wave'
  }
  return (
    <div className={`flex flex-col md:flex-row overflow-hidden h-dvh w-screen ${inter.className}`}>
      <SideBar />
      {children}
    </div>
  );
};

export default function ListingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <LayoutContent>{children}</LayoutContent>
        </body>
      </html>
    </PageProvider>
  );
}
