import { Providers } from '@/app/providers'
// import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IBM InfoSphere',
  description: 'IBM InfoSphere Login Dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

