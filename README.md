<<<<<<< HEAD
# HEVEN — Next.js App (Arquitectura Modular)

Migración del proyecto original HTML/CSS/JS a **Next.js 14** con App Router y arquitectura modular.

## Estructura del proyecto

```
src/
├── app/                        # App Router de Next.js
│   ├── layout.tsx              # Layout raíz (fuentes, Bootstrap CDN)
│   ├── page.tsx                # Ruta /  → Inicio
│   ├── tienda/
│   │   └── page.tsx            # Ruta /tienda
│   └── nosotros/
│       └── page.tsx            # Ruta /nosotros
│
├── components/
│   ├── layout/
│   │   ├── InicioClient.tsx    # Página Inicio (client component)
│   │   ├── NosotrosClient.tsx  # Página Nosotros (client component)
│   │   ├── Navbar.tsx          # Barra de navegación (client)
│   │   ├── SiteHeader.tsx      # Header con logo HEVEN
│   │   └── SiteFooter.tsx      # Footer global
│   ├── cart/
│   │   └── CartPanel.tsx       # Panel lateral del carrito (client)
│   ├── tienda/
│   │   └── TiendaClient.tsx    # Página Tienda completa (client)
│   └── ui/
│       ├── MarqueeTape.tsx     # Cinta marquee animada
│       └── Toast.tsx           # Notificaciones toast
│
├── lib/
│   └── catalogo.ts             # Base de datos de productos (tipada)
│
└── styles/
    └── globals.css             # Estilos globales (migración 1:1 del style.css original)
```

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

La app corre por defecto en **http://localhost:3000**

## Rutas

| Ruta        | Descripción              |
|-------------|--------------------------|
| `/`         | Inicio (Home)            |
| `/tienda`   | Tienda con filtros       |
| `/nosotros` | Quiénes somos            |

## Notas

- Los estilos son una migración **1:1** del CSS original — el visual es idéntico.
- Bootstrap 5.3 y Bootstrap Icons se cargan vía CDN (como el original).
- Google Fonts (Bebas Neue + Space Mono) igual que el original.
- El carrito funciona con estado local de React (`useState`).
- Los medios (videos, imágenes, audio) deben colocarse en la carpeta `public/`.
=======
# Pagina-Web-Heaven
Heaven Store es una tienda online de ropa streetwear europea desarrollada como proyecto web. La plataforma permite visualizar productos, explorar categorías y ofrecer una experiencia de compra moderna con una interfaz atractiva, enfocada en las últimas tendencias de moda urbana.
>>>>>>> 4e425711e31c85d1fde3e9bd5bd63a3756c23bc0
