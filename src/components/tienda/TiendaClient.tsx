'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Producto } from '@/lib/catalogo'
import { useCart } from '@/lib/CartContext'
import MarqueeTape from '@/components/ui/MarqueeTape'
import Navbar from '@/components/layout/Navbar'

function formatCOP(n: number) { return '$' + n.toLocaleString('es-CO') }

interface Seleccion { talla?: string; color?: string }

export default function TiendaClient({
  productos,
}: {
  productos: Producto[]
}) {
  const { addItem, toggleCart, cartCount } = useCart()
  const [selecciones, setSelecciones] = useState<Record<number, Seleccion>>({})
  const [avisos, setAvisos] = useState<Record<number, boolean>>({})
  const [filtros, setFiltros] = useState({
    marca: 'todas', categoria: 'todas', precioMax: 900000,
    soloDisponibles: false, soloNuevos: false, busqueda: ''
  })
  const [orden, setOrden] = useState('destacados')
  const [pagina, setPagina] = useState(1)
  const [sidebarAbierto, setSidebarAbierto] = useState(false)
  const busquedaRef = useRef<ReturnType<typeof setTimeout>>()
  const busquedaInputRef = useRef<HTMLInputElement>(null)
  const productosPorPagina = 8

  const filtrarProductos = () => {
    const { marca, categoria, precioMax, soloDisponibles, soloNuevos, busqueda } = filtros
    const b = busqueda.toLowerCase().trim()
    return productos.filter(p => {
      if (marca !== 'todas' && p.marca !== marca) return false
      if (categoria !== 'todas' && p.categoria !== categoria) return false
      if (p.precio > precioMax) return false
      if (soloDisponibles && p.agotado) return false
      if (soloNuevos && !p.nuevo) return false
      if (b && !p.nombre.toLowerCase().includes(b) && !p.marca.toLowerCase().includes(b) && !p.descripcion.toLowerCase().includes(b)) return false
      return true
    })
  }

  const ordenarProductos = (lista: Producto[]) => {
    const c = [...lista]
    switch (orden) {
      case 'precio-asc':  return c.sort((a, b) => a.precio - b.precio)
      case 'precio-desc': return c.sort((a, b) => b.precio - a.precio)
      case 'nombre-asc':  return c.sort((a, b) => a.nombre.localeCompare(b.nombre))
      case 'nuevo':       return c.sort((a, b) => (b.nuevo ? 1 : 0) - (a.nuevo ? 1 : 0))
      default:            return c
    }
  }

  const productosFiltrados = ordenarProductos(filtrarProductos())
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina)
  const paginaActual = productosFiltrados.slice((pagina - 1) * productosPorPagina, pagina * productosPorPagina)

  const selTalla = (id: number, talla: string) =>
    setSelecciones(prev => ({ ...prev, [id]: { ...prev[id], talla } }))

  const selColor = (id: number, color: string) =>
    setSelecciones(prev => ({ ...prev, [id]: { ...prev[id], color } }))

  const handleAgregar = (p: Producto) => {
    const sel = selecciones[p.id] || {}
    if (!sel.talla || !sel.color) {
      setAvisos(prev => ({ ...prev, [p.id]: true }))
      setTimeout(() => setAvisos(prev => ({ ...prev, [p.id]: false })), 2500)
      return
    }
    addItem(`${p.nombre} (${sel.talla} · ${sel.color})`, formatCOP(p.precio) + ' COP')
  }

  const limpiarFiltros = () => {
    setFiltros({ marca: 'todas', categoria: 'todas', precioMax: 900000, soloDisponibles: false, soloNuevos: false, busqueda: '' })
    setOrden('destacados')
    setPagina(1)
    if (busquedaInputRef.current) busquedaInputRef.current.value = ''
  }

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [paginaActual])

  const chipsFiltros = [
    filtros.marca !== 'todas'      && { label: filtros.marca,                        clear: () => setFiltros(f => ({ ...f, marca: 'todas' })) },
    filtros.categoria !== 'todas'  && { label: filtros.categoria,                    clear: () => setFiltros(f => ({ ...f, categoria: 'todas' })) },
    filtros.precioMax < 900000     && { label: `Hasta ${formatCOP(filtros.precioMax)}`, clear: () => setFiltros(f => ({ ...f, precioMax: 900000 })) },
    filtros.soloDisponibles        && { label: 'Solo disponibles',                   clear: () => setFiltros(f => ({ ...f, soloDisponibles: false })) },
    filtros.soloNuevos             && { label: 'Solo nuevos',                        clear: () => setFiltros(f => ({ ...f, soloNuevos: false })) },
    filtros.busqueda               && { label: `"${filtros.busqueda}"`,              clear: () => { setFiltros(f => ({ ...f, busqueda: '' })); if (busquedaInputRef.current) busquedaInputRef.current.value = '' } },
  ].filter(Boolean) as { label: string; clear: () => void }[]

  return (
    <>
      {/* CINTA */}
      <div className="cinta-marquee" aria-hidden="true">
        <div className="marquee-interno">
          {['HEVEN','STREETWEAR EUROPEO','DIRECTO A TU ESTILO','NUDE PROJECT','SCUFFERS','EME STUDIOS','COLD CULTURE',
            'HEVEN','STREETWEAR EUROPEO','DIRECTO A TU ESTILO','NUDE PROJECT','SCUFFERS','EME STUDIOS','COLD CULTURE'].map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
      </div>

      {/* CABECERA */}
      <header className="cabecera-pagina">
        <h1>TI<span>EN</span>DA</h1>
        <p>Streetwear europeo — Colección 2026</p>
      </header>

      {/* NAVBAR (reutilizado, usa CartContext) */}
      <Navbar />

      {/* CUERPO */}
      <div className="contenedor-tienda">

        {/* SIDEBAR FILTROS */}
        <aside className={`sidebar-filtros${sidebarAbierto ? ' abierto' : ''}`}>
          <div className="sidebar-titulo">Filtros</div>

          <div className="grupo-filtro">
            <h4>Marca</h4>
            {[
              { val: 'todas',        label: 'Todas las marcas' },
              { val: 'Nude Project', label: 'Nude Project' },
              { val: 'Scuffers',     label: 'Scuffers' },
              { val: 'Eme Studios',  label: 'Eme Studios' },
              { val: 'Cold Culture', label: 'Cold Culture' },
            ].map(o => (
              <div className="opcion-filtro" key={o.val}>
                <input type="radio" name="marca" id={`marca-${o.val}`} value={o.val}
                  checked={filtros.marca === o.val}
                  onChange={() => { setFiltros(f => ({ ...f, marca: o.val })); setPagina(1) }} />
                <label htmlFor={`marca-${o.val}`}>{o.label}</label>
              </div>
            ))}
          </div>

          <div className="grupo-filtro">
            <h4>Categoría</h4>
            {[
              { val: 'todas',      label: 'Todo' },
              { val: 'Camisetas',  label: 'Camisetas' },
              { val: 'Sudaderas',  label: 'Sudaderas' },
              { val: 'Pantalones', label: 'Pantalones' },
              { val: 'Accesorios', label: 'Accesorios' },
            ].map(o => (
              <div className="opcion-filtro" key={o.val}>
                <input type="radio" name="categoria" id={`cat-${o.val}`} value={o.val}
                  checked={filtros.categoria === o.val}
                  onChange={() => { setFiltros(f => ({ ...f, categoria: o.val })); setPagina(1) }} />
                <label htmlFor={`cat-${o.val}`}>{o.label}</label>
              </div>
            ))}
          </div>

          <div className="grupo-filtro">
            <h4>Precio máximo</h4>
            <div className="rango-precio">
              <span>$0</span>
              <span style={{ flex: 1 }} />
              <span>Hasta <span className="etiqueta-rango">{formatCOP(filtros.precioMax)}</span></span>
            </div>
            <input type="range" min={100000} max={900000} step={50000} value={filtros.precioMax}
              onChange={e => { setFiltros(f => ({ ...f, precioMax: +e.target.value })); setPagina(1) }} />
          </div>

          <div className="grupo-filtro">
            <h4>Disponibilidad</h4>
            <div className="opcion-filtro">
              <input type="checkbox" id="solo-disponibles" checked={filtros.soloDisponibles}
                onChange={e => { setFiltros(f => ({ ...f, soloDisponibles: e.target.checked })); setPagina(1) }} />
              <label htmlFor="solo-disponibles">Solo disponibles</label>
            </div>
            <div className="opcion-filtro">
              <input type="checkbox" id="solo-nuevos" checked={filtros.soloNuevos}
                onChange={e => { setFiltros(f => ({ ...f, soloNuevos: e.target.checked })); setPagina(1) }} />
              <label htmlFor="solo-nuevos">Solo nuevos</label>
            </div>
          </div>

          <button className="btn-limpiar-filtros" onClick={limpiarFiltros}>
            <i className="bi bi-x-circle me-1" /> Limpiar filtros
          </button>
        </aside>

        {/* ÁREA PRODUCTOS */}
        <section className="area-productos">

          {/* BARRA SUPERIOR */}
          <div className="barra-superior fade-in">
            <div>
              {chipsFiltros.length > 0 && (
                <div className="chips-filtros-activos">
                  {chipsFiltros.map((c, i) => (
                    <button className="chip-filtro" key={i} onClick={c.clear}>
                      {c.label} <i className="bi bi-x" />
                    </button>
                  ))}
                </div>
              )}
              <p className="resultados-texto">
                Mostrando <strong>{productosFiltrados.length}</strong> productos
              </p>
            </div>
            <div className="controles-barra">
              <button className="btn-filtros-movil" onClick={() => setSidebarAbierto(o => !o)}>
                <i className="bi bi-sliders" /> Filtros
              </button>
              <input
                ref={busquedaInputRef}
                type="search"
                className="campo-busqueda"
                placeholder="Buscar…"
                aria-label="Buscar productos"
                onChange={e => {
                  const val = e.target.value
                  clearTimeout(busquedaRef.current)
                  busquedaRef.current = setTimeout(() => {
                    setFiltros(f => ({ ...f, busqueda: val }))
                    setPagina(1)
                  }, 300)
                }}
              />
              <select className="select-orden" value={orden}
                onChange={e => { setOrden(e.target.value); setPagina(1) }}>
                <option value="destacados">Destacados</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="nombre-asc">Nombre: A-Z</option>
                <option value="nuevo">Más recientes</option>
              </select>
            </div>
          </div>

          {/* CUADRÍCULA */}
          <div className="cuadricula" id="cuadricula-productos">
            {paginaActual.length === 0 ? (
              <div className="sin-resultados">
                <i className="bi bi-search" />
                <p>Sin resultados.<br />Prueba con otros filtros.</p>
              </div>
            ) : paginaActual.map(p => {
              const sel = selecciones[p.id] || {}
              const listo = !!sel.talla && !!sel.color
              const badgeClase = p.agotado ? 'agotado' : p.etiqueta === 'Nuevo' ? 'nuevo' : p.etiqueta === 'Limitado' ? 'limitado' : ''
              const badgeTexto = p.agotado ? 'Agotado' : p.etiqueta

              return (
                <article className="tarjeta" key={p.id}>
                  {/* IMAGEN */}
                  <div className="tarjeta-imagen">
                    {p.imagen ? (
                      <img
                        src={p.imagen}
                        alt={p.nombre}
                        className="imagen-producto"
                      />
                    ) : (
                      <div className="imagen-placeholder">
                        <i className={`bi ${p.icono} icono-categoria`} />
                        <span>{p.categoria}</span>
                      </div>
                    )}
                    <span className={`tarjeta-badge ${badgeClase}`}>{badgeTexto}</span>
                    {!p.agotado && (
                      <button className="btn-quick-add" onClick={() => handleAgregar(p)}>
                        <i className="bi bi-plus me-1" />Seleccionar &amp; añadir
                      </button>
                    )}
                  </div>

                  {/* CUERPO */}
                  <div className="tarjeta-cuerpo">
                    <p className="tarjeta-marca">{p.marca}</p>
                    <h3 className="tarjeta-nombre">{p.nombre}</h3>
                    <p className="tarjeta-descripcion">{p.descripcion}</p>
                    <p className="tarjeta-precio">
                      {formatCOP(p.precio)}
                      <span style={{ fontSize: 13, color: 'var(--cappuccino)', fontFamily: "'Space Mono',monospace", marginLeft: 6 }}>COP</span>
                    </p>

                    {!p.agotado ? (
                      <>
                        {/* TALLAS */}
                        <span className="selector-label">Talla</span>
                        <div className="selector-tallas">
                          {Object.entries(p.tallas).map(([t, disp]) => (
                            <button
                              key={t}
                              className={`talla-btn${!disp ? ' agotada' : ''}${sel.talla === t ? ' seleccionada' : ''}`}
                              disabled={!disp}
                              title={!disp ? 'Agotada' : undefined}
                              onClick={() => selTalla(p.id, t)}
                            >{t}</button>
                          ))}
                        </div>

                        {/* COLORES */}
                        <span className="selector-label">
                          Color — <span className="color-nombre-display">{sel.color || '—'}</span>
                        </span>
                        <div className="selector-colores">
                          {p.colores.map(c => (
                            <span
                              key={c.nombre}
                              className={`color-chip${sel.color === c.nombre ? ' seleccionado' : ''}`}
                              style={{
                                background: c.hex,
                                borderColor: sel.color === c.nombre ? 'var(--latte)' : 'transparent'
                              }}
                              title={c.nombre}
                              role="radio"
                              aria-label={`Color ${c.nombre}`}
                              aria-checked={sel.color === c.nombre}
                              tabIndex={0}
                              onClick={() => selColor(p.id, c.nombre)}
                              onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  selColor(p.id, c.nombre)
                                }
                              }}
                            />
                          ))}
                        </div>

                        {/* BOTÓN AGREGAR */}
                        <button className="btn-agregar" onClick={() => handleAgregar(p)}>
                          {listo ? '+ Añadir al carrito' : 'Selecciona talla y color'}
                        </button>
                        {avisos[p.id] && (
                          <span className="aviso-seleccion visible">
                            <i className="bi bi-exclamation-circle me-1" />Elige talla y color primero
                          </span>
                        )}
                      </>
                    ) : (
                      <button className="btn-agregar" disabled>Agotado</button>
                    )}
                  </div>
                </article>
              )
            })}
          </div>

          {/* PAGINACIÓN */}
          {totalPaginas > 1 && (
            <div className="paginacion">
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  className={`btn-pagina${n === pagina ? ' activo' : ''}`}
                  onClick={() => {
                    setPagina(n)
                    document.querySelector('.area-productos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                >{n}</button>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* FOOTER TIENDA */}
      <footer className="pie-sitio">
        <p>
          &copy; 2026 HEVEN. Todos los derechos reservados. &nbsp;|&nbsp;
          <Link href="/">Inicio</Link> &nbsp;·&nbsp;
          <Link href="/#contacto">Contacto</Link>
        </p>
      </footer>
    </>
  )
}
