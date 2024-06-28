'use client'
import { Inter } from 'next/font/google';
import SideBar from '@/app/components/molecules/side-bar';
import { usePage, PageProvider } from '@/app/providers/TitleContext';
import '@/app/globals.css'
import { ListingHeader } from '@/app/components/molecules/listing-header';


const inter = Inter({ subsets: ['latin'] });

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { title } = usePage();
  return (
    <div className={`flex flex-col md:flex-row overflow-hidden h-screen w-screen ${inter.className}`}>
      <SideBar />
      <div className="flex flex-col pt-2 pb-8 px-6 bg-secondary overflow-hidden w-full h-full gap-2 md:gap-6">
        <h1 className="text-2xl text-gray-700">{title}</h1>
        <header>
          <ListingHeader/>
        </header>
        <main className="flex flex-grow overflow-hidden p-2 md:p-4 bg-white">{children}</main>
      </div>
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
