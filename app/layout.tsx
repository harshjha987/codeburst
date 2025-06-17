import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider';
import { SessionProvider } from "./context/session-context";


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CodeBurst',
  description: 'The Remote Work Collaboration Hub',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        
        <ClerkProvider>
          <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          </SessionProvider>
        </ClerkProvider>
        
      </body>
    </html>
  );
}