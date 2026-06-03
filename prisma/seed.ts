import { PrismaClient } from "@prisma/client";
import { CATALOGO } from "../src/lib/catalogo";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: CATALOGO.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      marca: p.marca,
      categoria: p.categoria,
      precio: p.precio,
      descripcion: p.descripcion,
      etiqueta: p.etiqueta,
      nuevo: p.nuevo,
      agotado: p.agotado,
      tallas: p.tallas,
      colores: p.colores,
      icono: p.icono,

      imagen: ""
    })),
  });

  console.log(`${CATALOGO.length} productos importados`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });