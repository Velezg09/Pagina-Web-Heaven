import type { Metadata } from 'next'
import '../styles/globals.css'
import { CartProvider } from '@/lib/CartContext'
import GlobalShell from '@/components/layout/GlobalShell'

export const metadata: Metadata = {
  title: 'HEVEN',
  description: 'Streetwear europeo directo a tu estilo.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CartProvider>
          <GlobalShell>
            {children}
          </GlobalShell>
        </CartProvider>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" async />
      </body>
    </html>
  )
}
