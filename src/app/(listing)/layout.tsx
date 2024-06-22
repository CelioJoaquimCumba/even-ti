'use client'
import { Inter } from 'next/font/google';
import NavBar from '@/app/components/molecules/nav-bar';
import { useTitle, TitleProvider } from '@/app/providers/TitleContext';
import '@/app/globals.css'
import { ListingHeader } from '@/app/components/molecules/listing-header';


const inter = Inter({ subsets: ['latin'] });

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { title } = useTitle();
  return (
    <div className={`flex flex-col md:flex-row overflow-hidden h-screen w-screen ${inter.className}`}>
      <NavBar />
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
    <TitleProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <LayoutContent>{children}</LayoutContent>
        </body>
      </html>
    </TitleProvider>
  );
}
