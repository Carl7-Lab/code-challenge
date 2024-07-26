import './globals.css';
import { Inter as FontSans } from 'next/font/google';

import NavBar from '@/components/NavBar';
import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background bg-gray-100 font-sans antialiased',
          fontSans.variable
        )}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
