'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import MarqueeTape from '@/components/ui/MarqueeTape'
import Navbar from '@/components/layout/Navbar'
import SiteFooter from '@/components/layout/SiteFooter'
import { useCart } from '@/lib/CartContext'
import { CATALOGO } from '@/lib/catalogo'

/* ─── helpers ─── */
function formatCOP(n: number) {
  return '$' + n.toLocaleString('es-CO') + ' COP'
}

/* ─── Datos estáticos ─── */
const MARCAS = [
  { nombre: 'Nude Project', tag: 'Madrid · 2018', color: '#c8b49a' },
  { nombre: 'Scuffers',     tag: 'Barcelona · 2019', color: '#7a7153' },
  { nombre: 'Eme Studios',  tag: 'Valencia · 2020', color: '#4a5240' },
  { nombre: 'Cold Culture', tag: 'Copenhagen · 2017', color: '#8fa8c0' },
]

const STATS = [
  { num: '4',    label: 'Marcas europeas' },
  { num: '12+',  label: 'Productos exclusivos' },
  { num: '100%', label: 'Streetwear auténtico' },
  { num: 'COL',  label: 'Envíos nacionales' },
]

/* tomar los primeros 4 productos destacados del catálogo */
const DESTACADOS = CATALOGO.filter(p => p.etiqueta === 'Destacado').slice(0, 4)

export default function InicioClient() {
  const { addItem } = useCart()
  const heroRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  /* parallax suave en el hero */
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* fade-in por IntersectionObserver */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <MarqueeTape />
      <Navbar />

      <main>

        {/* ══════════════════════════════════════════
            HERO FULLSCREEN
        ══════════════════════════════════════════ */}
        <section
          ref={heroRef}
          style={{
            position: 'relative',
            height: '100svh',
            minHeight: '600px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            borderBottom: '1px solid var(--border)',
            background: 'linear-gradient(160deg, var(--mocha) 0%, var(--espresso) 55%, #160b05 100%)',
          }}
        >
          {/* Fondo imagen con parallax */}
          <img
            src="/img/hero-principal.jpg"
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top',
              transform: `translateY(${scrollY * 0.25}px)`,
              filter: 'brightness(0.45) saturate(0.75)',
              willChange: 'transform',
            }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />

          {/* Gradiente sobre la imagen */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(33,18,10,1) 0%, rgba(33,18,10,0.35) 55%, rgba(33,18,10,0.1) 100%)',
          }} />

          {/* Watermark gigante */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(140px, 26vw, 360px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(171,148,120,0.06)',
            whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
            letterSpacing: '0.1em', lineHeight: 1,
          }}>HEVEN</div>

          {/* Línea decorativa vertical */}
          <div style={{
            position: 'absolute', top: 0, left: 'clamp(2rem, 5vw, 5rem)',
            width: '1px', height: '40%',
            background: 'linear-gradient(to bottom, transparent, var(--caramel))',
          }} />

          {/* Contenido principal */}
          <div style={{
            position: 'relative', zIndex: 2,
            padding: 'clamp(2rem, 5vw, 5rem)',
            paddingBottom: 'clamp(3rem, 7vw, 6rem)',
          }}>
            <span style={{
              display: 'inline-block',
              fontSize: '10px', letterSpacing: '0.55em', textTransform: 'uppercase',
              color: 'var(--caramel)', marginBottom: '1.2rem',
            }}>
              — Streetwear europeo · Colombia
            </span>

            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(72px, 14vw, 180px)',
              letterSpacing: '0.04em', lineHeight: 0.92,
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, var(--latte) 0%, var(--cappuccino) 60%, var(--caramel) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              VISTE<br />
              <span style={{ color: 'var(--caramel)', WebkitTextFillColor: 'var(--caramel)' }}>DIFERENTE</span>
            </h1>

            <p style={{
              maxWidth: '480px',
              fontSize: '12px', letterSpacing: '0.08em',
              color: 'var(--cappuccino)', lineHeight: 1.9,
              marginBottom: '2.5rem',
            }}>
              Selección exclusiva de marcas europeas que están redefiniendo
              la moda urbana. Nude Project, Eme Studios, Scuffers y más —
              directo a tu puerta.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link
                href="/tienda"
                style={{
                  background: 'linear-gradient(135deg, var(--caramel) 0%, var(--mocha) 100%)',
                  color: 'var(--latte)',
                  fontFamily: "'Space Mono', monospace", fontSize: '11px', fontWeight: 700,
                  letterSpacing: '0.25em', textTransform: 'uppercase',
                  padding: '1rem 2.5rem', textDecoration: 'none', cursor: 'crosshair',
                  transition: 'all 0.3s', display: 'inline-block',
                }}
              >
                Explorar tienda →
              </Link>
              <Link
                href="/nosotros"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--cappuccino)',
                  fontFamily: "'Space Mono', monospace", fontSize: '11px',
                  letterSpacing: '0.25em', textTransform: 'uppercase',
                  padding: '1rem 2.5rem', textDecoration: 'none', cursor: 'crosshair',
                  transition: 'all 0.3s', display: 'inline-block',
                }}
              >
                Nuestra historia
              </Link>
            </div>
          </div>

          {/* Scroll cue */}
          <div style={{
            position: 'absolute', bottom: '2rem', right: 'clamp(2rem, 5vw, 5rem)',
            fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase',
            color: 'var(--border)', writingMode: 'vertical-rl',
            animation: 'blink 2.5s ease infinite',
          }}>
            scroll ↓
          </div>
        </section>

        {/* ══════════════════════════════════════════
            STATS BAR
        ══════════════════════════════════════════ */}
        <section
          className="fade-in"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                padding: 'clamp(1.5rem, 3vw, 2.5rem) 2rem',
                borderRight: i < STATS.length - 1 ? '1px solid var(--border)' : 'none',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(32px, 5vw, 52px)',
                letterSpacing: '0.05em',
                color: 'var(--caramel)',
                lineHeight: 1,
                marginBottom: '0.4rem',
              }}>
                {s.num}
              </div>
              <div style={{
                fontSize: '9px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'var(--text-muted)',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </section>

        {/* ══════════════════════════════════════════
            MARCAS DESTACADAS
        ══════════════════════════════════════════ */}
        <section
          className="fade-in"
          style={{
            padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 4vw, 4rem)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span className="section-label">— Nuestras marcas</span>
          <h2 className="section-title" style={{ marginBottom: '3rem' }}>Marcas Europeas</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1px',
            background: 'var(--border)',
            border: '1px solid var(--border)',
          }}>
            {MARCAS.map((m, i) => (
              <div
                key={i}
                style={{
                  background: 'linear-gradient(145deg, var(--gray) 0%, var(--mocha) 100%)',
                  padding: '2.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'background 0.25s',
                  cursor: 'crosshair',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    'linear-gradient(145deg, var(--mocha) 0%, #5a3a25 100%)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    'linear-gradient(145deg, var(--gray) 0%, var(--mocha) 100%)'
                }}
              >
                {/* número decorativo */}
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '72px', lineHeight: 1,
                  color: 'transparent',
                  WebkitTextStroke: `1px rgba(${i % 2 === 0 ? '128,102,76' : '171,148,120'},0.25)`,
                  marginBottom: '0.5rem',
                  userSelect: 'none',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '26px', letterSpacing: '0.05em',
                  color: 'var(--latte)', marginBottom: '0.3rem',
                }}>
                  {m.nombre}
                </div>
                <div style={{
                  fontSize: '9px', letterSpacing: '0.35em',
                  textTransform: 'uppercase', color: 'var(--caramel)',
                }}>
                  {m.tag}
                </div>
                {/* barra acento bottom */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, ${m.color}, transparent)`,
                }} />
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            LOOKBOOK STRIP (3 celdas visuales)
        ══════════════════════════════════════════ */}
        <section
          className="fade-in"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.5fr 1fr',
            gap: '1px',
            background: 'var(--border)',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {[
            { label: 'Nude Project', sub: 'Colección SS26', bg: 'linear-gradient(170deg, #1a2744 0%, var(--espresso) 100%)' },
            { label: 'HEVEN', sub: 'Directo a tu estilo', bg: 'linear-gradient(160deg, var(--mocha) 0%, #160b05 100%)', large: true },
            { label: 'Cold Culture', sub: 'Temporada invierno', bg: 'linear-gradient(170deg, #1e2e50 0%, var(--espresso) 100%)' },
          ].map(({ label, sub, bg, large }, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: large ? '2/3' : '3/4',
                background: bg,
              }}
            >
              <img
                src={`/img/lookbook-${i + 1}.jpg`}
                alt={label}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.6s ease', display: 'block',
                  filter: 'brightness(0.6) saturate(0.85)',
                }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                onMouseOver={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.06)' }}
                onMouseOut={e => { (e.target as HTMLImageElement).style.transform = 'scale(1)' }}
              />
              {/* overlay gradient */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(33,18,10,0.85) 0%, transparent 60%)',
              }} />
              <div style={{
                position: 'absolute', bottom: '1.5rem', left: '1.5rem',
              }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: large ? '28px' : '20px',
                  letterSpacing: '0.08em',
                  color: 'var(--latte)', lineHeight: 1,
                }}>
                  {label}
                </div>
                <div style={{
                  fontSize: '9px', letterSpacing: '0.35em',
                  textTransform: 'uppercase', color: 'var(--caramel)',
                  marginTop: '0.3rem',
                }}>
                  {sub}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ══════════════════════════════════════════
            PRODUCTOS DESTACADOS
        ══════════════════════════════════════════ */}
        <section
          className="fade-in"
          style={{
            padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 4vw, 4rem)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span className="section-label">— Colección</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Productos Destacados</h2>
            <Link
              href="/tienda"
              style={{
                fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase',
                color: 'var(--caramel)', textDecoration: 'none',
                borderBottom: '1px solid var(--caramel)',
                paddingBottom: '2px',
              }}
            >
              Ver todos →
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1px',
            background: 'var(--border)',
            border: '1px solid var(--border)',
          }}>
            {DESTACADOS.map(p => (
              <article
                key={p.id}
                style={{
                  background: 'linear-gradient(160deg, var(--gray) 0%, var(--mocha) 100%)',
                  padding: '2rem',
                  position: 'relative',
                  display: 'flex', flexDirection: 'column',
                  transition: 'background 0.25s',
                  cursor: 'crosshair',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background =
                    'linear-gradient(160deg, var(--mocha) 0%, #5a3a25 100%)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background =
                    'linear-gradient(160deg, var(--gray) 0%, var(--mocha) 100%)'
                }}
              >
                {/* barra lateral de acento */}
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '3px', height: '100%',
                  background: 'linear-gradient(to bottom, var(--caramel), transparent)',
                }} />

                {/* Placeholder imagen */}
                <div style={{
                  aspectRatio: '3/4',
                  background: 'var(--mid-gray)',
                  marginBottom: '1.5rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', position: 'relative',
                }}>
                  <img
                    src={`/img/producto-${p.id}.jpg`}
                    alt={p.nombre}
                    className="imagen-producto"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                  {/* icono fallback */}
                  <i
                    className={`bi ${p.icono}`}
                    style={{ fontSize: '42px', color: 'var(--border)', position: 'absolute' }}
                  />
                  {/* badge */}
                  <span style={{
                    position: 'absolute', top: '0.8rem', left: '0.8rem',
                    fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase',
                    background: 'linear-gradient(135deg, var(--caramel), var(--mocha))',
                    color: 'var(--latte)', padding: '3px 10px', fontWeight: 700,
                  }}>
                    {p.etiqueta}
                  </span>
                </div>

                <span style={{
                  fontSize: '9px', letterSpacing: '0.35em',
                  textTransform: 'uppercase', color: 'var(--caramel)',
                  marginBottom: '0.3rem',
                }}>
                  {p.marca}
                </span>
                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '26px', letterSpacing: '0.05em',
                  color: 'var(--latte)', marginBottom: '0.5rem',
                }}>
                  {p.nombre}
                </h3>
                <p style={{
                  fontSize: '11px', color: 'var(--text-muted)',
                  lineHeight: 1.7, marginBottom: '1.2rem', flex: 1,
                }}>
                  {p.descripcion}
                </p>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '26px', color: 'var(--caramel)',
                  letterSpacing: '0.05em', marginBottom: '1rem',
                }}>
                  {formatCOP(p.precio)}
                </div>
                <button
                  onClick={() => addItem(p.nombre, formatCOP(p.precio))}
                  style={{
                    background: 'transparent', border: '1px solid var(--caramel)',
                    color: 'var(--caramel)',
                    fontFamily: "'Space Mono', monospace", fontSize: '10px',
                    fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                    padding: '0.75rem 1rem', cursor: 'crosshair', transition: 'all 0.2s',
                    width: '100%',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.background = 'linear-gradient(135deg, var(--caramel), var(--mocha))'
                    el.style.color = 'var(--latte)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.background = 'transparent'
                    el.style.color = 'var(--caramel)'
                  }}
                >
                  + Añadir al carrito
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            MANIFIESTO / SOBRE HEVEN
        ══════════════════════════════════════════ */}
        <section
          className="fade-in"
          style={{
            padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)',
            borderBottom: '1px solid var(--border)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'center',
          }}
        >
          <div>
            <span className="section-label">— Manifiesto</span>
            <h2 className="section-title">Más que<br />ropa.</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 2, marginBottom: '1.5rem' }}>
              HEVEN nace para reunir las marcas más relevantes del streetwear europeo
              contemporáneo en un solo lugar. <strong style={{ color: 'var(--latte)' }}>Diseños auténticos,
              producción limitada</strong> y una identidad que trasciende tendencias.
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 2, marginBottom: '2.5rem' }}>
              Cada pieza que encontrarás en HEVEN fue seleccionada por su calidad, su historia
              y su capacidad de representar una cultura urbana genuina.
            </p>
            <Link
              href="/nosotros"
              style={{
                display: 'inline-block',
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--cappuccino)',
                fontFamily: "'Space Mono', monospace", fontSize: '10px',
                letterSpacing: '0.25em', textTransform: 'uppercase',
                padding: '0.9rem 2rem', textDecoration: 'none', cursor: 'crosshair',
                transition: 'all 0.2s',
              }}
            >
              Conoce nuestra historia →
            </Link>
          </div>

          {/* Bloque decorativo cita */}
          <div style={{
            border: '1px solid var(--border)',
            padding: 'clamp(2rem, 4vw, 3.5rem)',
            position: 'relative',
            background: 'linear-gradient(160deg, var(--gray) 0%, transparent 100%)',
          }}>
            {/* comillas decorativas */}
            <div style={{
              position: 'absolute', top: '-20px', left: '20px',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '120px', color: 'var(--caramel)', opacity: 0.12,
              lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
            }}>"</div>

            <blockquote style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(22px, 3.5vw, 38px)',
              letterSpacing: '0.04em',
              color: 'var(--latte)', lineHeight: 1.2,
              borderLeft: '2px solid var(--caramel)',
              paddingLeft: '1.5rem',
              margin: '0 0 2rem 0',
            }}>
              Viste diferente.<br />
              <span style={{ color: 'var(--caramel)' }}>Viste HEVEN.</span>
            </blockquote>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.9 }}>
              Streetwear europeo seleccionado para quienes entienden que la ropa
              no es solo moda — es identidad, es actitud, es cultura.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════════ */}
        <section
          className="fade-in"
          style={{
            padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 4vw, 4rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* texto watermark de fondo */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(100px, 22vw, 280px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(171,148,120,0.07)',
            whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
          }}>
            SHOP
          </div>

          <span className="section-label">— Nueva colección 2026</span>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(48px, 10vw, 110px)',
            letterSpacing: '0.05em',
            color: 'var(--latte)', lineHeight: 1,
            marginBottom: '1.5rem', position: 'relative',
          }}>
            NUEVA<br />
            <span style={{ color: 'var(--caramel)' }}>COLECCIÓN</span>
          </h2>
          <p style={{
            fontSize: '12px', letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'var(--text-muted)', marginBottom: '3rem', position: 'relative',
          }}>
            Piezas exclusivas · Envíos a toda Colombia · Stock limitado
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <Link
              href="/tienda"
              className="btn-cta-primary"
            >
              Ver tienda completa
            </Link>
            <Link
              href="/nosotros"
              className="btn-cta-ghost"
            >
              Sobre HEVEN
            </Link>
          </div>
        </section>

      </main>

      <SiteFooter />
    </>
  )
}
