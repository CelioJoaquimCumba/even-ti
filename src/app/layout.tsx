'use client'
import { Inter } from 'next/font/google';
import NavBar from './components/molecules/nav-bar';
import { useTitle, TitleProvider } from './providers/TitleContext';
import Head from 'next/head';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { title } = useTitle();
  return (
    <div className={`flex flex-row overflow-hidden ${inter.className}`}>
      <Head>
        <title>{title}</title>
      </Head>
      <NavBar />
      <div className="flex flex-col py-8 px-6 bg-gray-100 overflow-y-auto w-full space-y-6">
        <header className="text-2xl text-gray-700">{title}</header>
        <main className="flex flex-grow">{children}</main>
      </div>
    </div>
  );
};

export default function RootLayout({
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
