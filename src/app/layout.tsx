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
      <NavBar />
      <div className="flex flex-col py-8 px-6 bg-gray-100 overflow-y-auto w-full space-y-6">
        <h1 className="text-2xl text-gray-700">{title}</h1>
        <header></header>
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
