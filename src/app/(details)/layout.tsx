'use client'
import { Inter } from 'next/font/google';
import SideBar from '@/app/components/molecules/side-bar';
import { usePage, PageProvider } from '@/app/providers/TitleContext';
import '@/app/globals.css'
import { ListingHeader } from '@/app/components/molecules/listing-header';
import { Button } from '@/app/components/atoms/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';


const inter = Inter({ subsets: ['latin'] });

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {title} = {
    title: 'Data Wave'
  }
  const router = useRouter()
  return (
    <div className={`flex flex-col md:flex-row overflow-hidden h-dvh w-screen ${inter.className}`}>
      <SideBar />
      <div className="flex flex-col pt-2 pb-8 px-6 bg-secondary overflow-hidden w-full h-full gap-2 md:gap-6">
        <header className='flex self-stretch justify-between'>
        <div className='flex items-center gap-2'>
          <Button variant={"outline"} size={"icon"} className={`rounded-full md:flex`} onClick={() => router.back()}>
              <ChevronLeft/>
          </Button>
          <h1 className="text-lg md:text-2xl text-gray-700">{title}</h1>
        </div>
        <Button className='px-8 py-4'>Reservar bilhete</Button>
        </header>
        <main className="flex flex-grow overflow-hidden p-2 md:p-4 bg-white rounded-md">{children}</main>
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
