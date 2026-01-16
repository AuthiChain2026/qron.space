import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { Providers } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QRON - Living QR Codes',
  description: 'Create AI-generated QR codes that evolve. Art meets utility. Scannable portals that captivate.',
  keywords: ['QR code', 'AI', 'generative art', 'NFT', 'living QR', 'dynamic QR'],
  authors: [{ name: 'QRON' }],
  openGraph: {
    title: 'QRON - Living QR Codes',
    description: 'Create AI-generated QR codes that evolve. Art meets utility.',
    url: 'https://qron.xyz',
    siteName: 'QRON',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QRON - Living QR Codes',
    description: 'Create AI-generated QR codes that evolve. Art meets utility.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Plausible Analytics - uncomment when ready */}
        {/* <script defer data-domain="qron.xyz" src="https://plausible.io/js/script.js"></script> */}
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster 
            theme="dark" 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1e293b',
                border: '1px solid #334155',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
