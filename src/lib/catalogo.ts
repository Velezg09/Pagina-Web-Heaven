export interface Producto {
  id: number
  nombre: string
  marca: string
  categoria: string
  precio: number
  descripcion: string
  etiqueta: string
  nuevo: boolean
  agotado: boolean
  tallas: Record<string, boolean>
  colores: { nombre: string; hex: string }[]
  icono: string

  imagen: string
}

export const CATALOGO: Producto[] = [
  {
    id: 1, nombre: 'Jarama Tee Navy', marca: 'Nude Project', categoria: 'Camisetas', precio: 356000,
    descripcion: 'Camiseta de algodón peinado 200 g/m². Corte regular europeo con ribetes reforzados. Estampado serigrafía en pecho.',
    etiqueta: 'Destacado', nuevo: false, agotado: false,
    tallas: { XS: true, S: true, M: true, L: true, XL: false },
    colores: [{ nombre: 'Marino', hex: '#1a2744' }, { nombre: 'Blanco roto', hex: '#e8e0d0' }, { nombre: 'Negro', hex: '#0a0a0a' }],
    icono: 'bi-shirt',imagen: ''
  },
  {
    id: 2, nombre: 'Lagos Hoodie Beige', marca: 'Scuffers', categoria: 'Sudaderas', precio: 489000,
    descripcion: 'Sudadera oversize de algodón premium con bordado exclusivo en manga derecha. Diseño minimalista europeo para la calle.',
    etiqueta: 'Nuevo', nuevo: true, agotado: false,
    tallas: { XS: false, S: true, M: true, L: true, XL: true },
    colores: [{ nombre: 'Beige', hex: '#c8b49a' }, { nombre: 'Gris ceniza', hex: '#7a7a7a' }, { nombre: 'Arena', hex: '#d4c5a9' }],
    icono: 'bi-bag',imagen: ''
  },
  {
    id: 3, nombre: 'Studio Cargo Pants', marca: 'Eme Studios', categoria: 'Pantalones', precio: 612000,
    descripcion: 'Pantalón cargo de corte relajado con múltiples bolsillos utilitarios. Tela técnica resistente al agua. Cierre metálico.',
    etiqueta: 'Limitado', nuevo: false, agotado: false,
    tallas: { XS: true, S: true, M: false, L: true, XL: true },
    colores: [{ nombre: 'Kaki', hex: '#7a7153' }, { nombre: 'Negro', hex: '#0a0a0a' }, { nombre: 'Verde oliva', hex: '#4a5240' }],
    icono: 'bi-scissors',imagen: ''
  },
  {
    id: 4, nombre: 'Arctic Puffer Jacket', marca: 'Cold Culture', categoria: 'Sudaderas', precio: 879000,
    descripcion: 'Chaqueta acolchada ultraligera con relleno reciclado. Capucha extraíble y bolsillos interiores con cremallera.',
    etiqueta: 'Destacado', nuevo: false, agotado: false,
    tallas: { XS: true, S: true, M: true, L: true, XL: true },
    colores: [{ nombre: 'Blanco nieve', hex: '#ede8e0' }, { nombre: 'Negro', hex: '#0a0a0a' }, { nombre: 'Azul glacial', hex: '#8fa8c0' }],
    icono: 'bi-wind',imagen: ''
  },
  {
    id: 5, nombre: 'Palermo Graphic Tee', marca: 'Nude Project', categoria: 'Camisetas', precio: 298000,
    descripcion: 'Camiseta oversize con gráfico editorial grande al frente. Serigrafía de dos tintas sobre algodón orgánico.',
    etiqueta: 'Nuevo', nuevo: true, agotado: false,
    tallas: { XS: false, S: true, M: true, L: true, XL: true },
    colores: [{ nombre: 'Marfil', hex: '#f0ead8' }, { nombre: 'Negro carbón', hex: '#1a1a1a' }],
    icono: 'bi-shirt',imagen: ''
  },
  {
    id: 6, nombre: 'Essential Crewneck', marca: 'Eme Studios', categoria: 'Sudaderas', precio: 412000,
    descripcion: 'Crewneck de felpa rizada 320 g/m² con parche bordado en pecho. Corte slim europeo, puños y cuello acanalados.',
    etiqueta: 'Destacado', nuevo: false, agotado: false,
    tallas: { XS: true, S: true, M: true, L: false, XL: false },
    colores: [{ nombre: 'Marrón tostado', hex: '#6b4c3b' }, { nombre: 'Crema', hex: '#d8cbb8' }, { nombre: 'Gris marengo', hex: '#4a4a50' }],
    icono: 'bi-bag-fill',imagen: ''
  },
  {
    id: 7, nombre: 'Monaco Sweatpants', marca: 'Scuffers', categoria: 'Pantalones', precio: 375000,
    descripcion: 'Pantalón jogger de felpa francesa con jareta elástica y dobladillo con cierre lateral. Bolsillos con cremallera.',
    etiqueta: 'Nuevo', nuevo: true, agotado: false,
    tallas: { XS: true, S: true, M: true, L: true, XL: true },
    colores: [{ nombre: 'Negro', hex: '#0a0a0a' }, { nombre: 'Gris claro', hex: '#b0b0b0' }, { nombre: 'Beige arena', hex: '#c8b49a' }],
    icono: 'bi-scissors',imagen: ''
  },
  {
    id: 8, nombre: 'Nordic Cap', marca: 'Cold Culture', categoria: 'Accesorios', precio: 148000,
    descripcion: 'Gorra de cinco paneles con visera curvada y bordado frontal en relieve. Cierre ajustable de hebilla dorada.',
    etiqueta: 'Destacado', nuevo: false, agotado: false,
    tallas: { XS: false, S: true, M: true, L: true, XL: false },
    colores: [{ nombre: 'Negro', hex: '#0a0a0a' }, { nombre: 'Blanco roto', hex: '#e8e0d0' }, { nombre: 'Camel', hex: '#b08050' }],
    icono: 'bi-person-badge',imagen: ''
  },
  {
    id: 9, nombre: 'Riviera Long Sleeve', marca: 'Nude Project', categoria: 'Camisetas', precio: 328000,
    descripcion: 'Manga larga de algodón peinado 180 g/m². Estampado termográfico en espalda completa. Cuello redondo reforzado.',
    etiqueta: 'Limitado', nuevo: false, agotado: false,
    tallas: { XS: true, S: false, M: true, L: true, XL: true },
    colores: [{ nombre: 'Terracota', hex: '#c07050' }, { nombre: 'Azul cobalto', hex: '#2050a0' }, { nombre: 'Negro', hex: '#0a0a0a' }],
    icono: 'bi-shirt',imagen: ''
  },
  {
    id: 10, nombre: 'Urban Tote Bag', marca: 'Eme Studios', categoria: 'Accesorios', precio: 198000,
    descripcion: 'Bolso tote de lona encerada 600D con refuerzo interno. Asa larga regulable y bolsillo frontal con cremallera metálica.',
    etiqueta: 'Nuevo', nuevo: true, agotado: false,
    tallas: { XS: false, S: false, M: true, L: true, XL: false },
    colores: [{ nombre: 'Negro', hex: '#0a0a0a' }, { nombre: 'Crudo', hex: '#d8cbb8' }, { nombre: 'Verde musgo', hex: '#4a5840' }],
    icono: 'bi-bag-heart',imagen: ''
  },
  {
    id: 11, nombre: 'Oslo Fleece Jacket', marca: 'Cold Culture', categoria: 'Sudaderas', precio: 545000,
    descripcion: 'Chaqueta de polar técnico de doble cara. Cuello alzado, bolsillos con cierre y forro interior de sherpa.',
    etiqueta: 'Limitado', nuevo: false, agotado: false,
    tallas: { XS: true, S: true, M: true, L: true, XL: true },
    colores: [{ nombre: 'Hueso', hex: '#ede8e0' }, { nombre: 'Carbón', hex: '#2a2a2a' }, { nombre: 'Burdeos', hex: '#7a2030' }],
    icono: 'bi-wind',imagen: ''
  },
  {
    id: 12, nombre: 'Bilbao Denim Pants', marca: 'Scuffers', categoria: 'Pantalones', precio: 488000,
    descripcion: 'Pantalón de denim selvedge 12 oz corte straight. Lavado enzimático vintage con detalles de costura en hilo de contraste.',
    etiqueta: 'Destacado', nuevo: false, agotado: true,
    tallas: { XS: false, S: false, M: false, L: false, XL: false },
    colores: [{ nombre: 'Índigo oscuro', hex: '#1e2e50' }, { nombre: 'Negro desteñido', hex: '#2a2a2a' }],
    icono: 'bi-scissors',imagen: ''
  }
]
