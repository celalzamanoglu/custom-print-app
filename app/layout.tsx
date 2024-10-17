'use client';

import { NextUIProvider } from '@nextui-org/react';
import { Navbar } from '@/components';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>
          <Navbar />
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
