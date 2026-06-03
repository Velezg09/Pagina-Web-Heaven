import TiendaClient from '@/components/tienda/TiendaClient'
import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'HEVEN — Tienda',
  description:
    'Tienda HEVEN — Streetwear europeo. Nude Project, Scuffers, Eme Studios, Cold Culture.',
}

export default async function TiendaPage() {
  const productos = await prisma.product.findMany()
  

  return <TiendaClient productos={productos as any} />


}