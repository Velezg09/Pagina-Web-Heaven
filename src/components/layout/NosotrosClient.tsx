'use client'

import { useEffect } from 'react'
import MarqueeTape from '@/components/ui/MarqueeTape'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import Navbar from '@/components/layout/Navbar'

export default function NosotrosClient() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    const obsTimeline = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('visible'), i * 120)
      })
    }, { threshold: 0.15 })
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el))
    document.querySelectorAll('.timeline-item').forEach(el => obsTimeline.observe(el))
    return () => { obs.disconnect(); obsTimeline.disconnect() }
  }, [])

  return (
    <>
      <MarqueeTape />
      <SiteHeader />
      <Navbar />

      <main>
        {/* HERO */}
        <section className="about-hero fade-in" style={{ position: 'relative' }}>
          <img
            src="/img/nosotros-hero.jpg" alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', opacity: 0.12, pointerEvents: 'none' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <span className="hero-tag">— Quiénes somos</span>
          <h1>NOSO<em>TROS</em></h1>
          <p className="hero-sub">Más que una tienda. Un punto de encuentro entre el streetwear europeo y la identidad colombiana.</p>
          <p className="scroll-cue">↓ Descúbrenos</p>
        </section>

        {/* MANIFESTO */}
        <section className="manifesto-section fade-in">
          <div className="manifesto-label">
            <span className="section-label">— Manifiesto</span>
            <h2 className="section-title">Por qué<br />existimos</h2>
          </div>
          <div className="manifesto-body">
            <p><strong>HEVEN nació de una pregunta sencilla:</strong> ¿por qué el streetwear europeo más interesante nunca llegaba a Colombia? Marcas con identidad, con historia, con piezas que van más allá de la tendencia — todas fuera del alcance de quienes las necesitan.</p>
            <div className="manifesto-pullquote">
              &quot;No vendemos ropa.<br />Vendemos <span>punto de vista</span>.&quot;
            </div>
            <p>Somos el puente entre dos mundos. Desde Bogotá conectamos con Barcelona, Madrid y Berlín para traer colecciones de marcas como <strong>Nude Project, Scuffers, Eme Studios y Cold Culture</strong> — seleccionadas a mano, con criterio editorial.</p>
            <p>Cada pieza que llega a HEVEN pasó por un proceso de curación: ¿habla? ¿tiene carácter? ¿le importa a alguien más allá de la moda? Si la respuesta es sí, la traemos.</p>
            <p>No somos fast fashion. No somos genéricos. Somos para quienes ya saben lo que quieren, y solo necesitaban saber dónde encontrarlo.</p>
          </div>
        </section>

        {/* VALORES */}
        <section className="valores-section fade-in">
          <div className="valores-header">
            <span className="section-label">— Lo que nos mueve</span>
            <h2 className="section-title">Nuestros Valores</h2>
          </div>
          <div className="valores-grid">
            {[
              { num: '01', title: 'Curación', desc: 'Cada pieza es elegida con intención. No llenamos un catálogo — construimos una selección que tiene voz propia y coherencia editorial.' },
              { num: '02', title: 'Autenticidad', desc: 'Trabajamos directamente con marcas que tienen historia y propósito. Sin intermediarios innecesarios, sin réplicas, sin compromiso.' },
              { num: '03', title: 'Comunidad', desc: 'HEVEN existe para quienes entienden que el estilo es un lenguaje. Nuestra comunidad construye ese lenguaje junto a nosotros, cada drop.' },
              { num: '04', title: 'Transparencia', desc: 'Precios justos, origen claro, comunicación directa. Creemos que la confianza se construye siendo honestos en cada paso del proceso.' },
            ].map(v => (
              <div className="valor-card" key={v.num}>
                <span className="valor-num">{v.num}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EQUIPO */}
        <section className="equipo-section fade-in">
          <div className="equipo-intro">
            <span className="section-label">— Las personas</span>
            <h2 className="section-title">El Equipo</h2>
            <p>Somos un equipo pequeño y apasionado. Cada uno viene de un mundo distinto — moda, diseño, comunicación — pero compartimos la misma obsesión: el estilo con carácter.</p>
          </div>
          <div className="equipo-grid">
            {[
              { initials: 'JD', name: 'Jacobo Dimian',    rol: 'Fundador & Comprador',    foto: '/img/jacobo.jpg',   desc: 'Pereirano criado entre revistas de moda europeas y visitas a tiendas de segunda mano. Jacobo es quien decide qué merece llegar a Colombia.' },
              { initials: 'SM', name: 'Santiago Montoya', rol: 'Director Creativo',        foto: '/img/santiago.jpg', desc: 'Diseñadora gráfica con paso por Madrid y Medellín. Define la identidad visual de HEVEN: oscura, precisa, urbana.' },
              { initials: 'SV', name: 'Sebastián Velez',  rol: 'Operaciones & Logística', foto: '/img/sebastian.jpg',desc: 'El que hace que todo llegue a tiempo. Sebastián coordina los envíos internacionales y asegura que cada paquete sea una experiencia.' },
            ].map(m => (
              <div className="miembro-card" key={m.name}>
                <div className="miembro-avatar" style={{ overflow: 'hidden', padding: 0 }}>
                  <img
                    src={m.foto} alt={m.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => {
                      const el = e.target as HTMLImageElement
                      el.style.display = 'none'
                      if (el.parentElement) el.parentElement.textContent = m.initials
                    }}
                  />
                </div>
                <h4>{m.name}</h4>
                <span className="miembro-rol">{m.rol}</span>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HISTORIA / TIMELINE */}
        <section className="historia-section fade-in">
          <div className="historia-header">
            <span className="section-label">— Nuestro camino</span>
            <h2 className="section-title">Historia</h2>
          </div>
          <div className="timeline">
            {[
              { year: '— 2024 / Idea',         title: 'Todo empezó con una chaqueta',       desc: 'Jacobo intentó comprar una pieza de Nude Project desde Pereira. El proceso fue tan complicado que decidió que alguien tenía que resolverlo. Ese alguien fue él.' },
              { year: '— 2025 / Primer Drop',   title: '10 prendas. 10 compradores. Sold out.', desc: 'HEVEN hizo su primer drop experimental con 10 piezas de Scuffers. Se agotaron en menos de 48 horas. La comunidad empezó a crecer sola.' },
              { year: '— 2025 / Expansión',     title: 'Cuatro marcas. Una identidad.',      desc: 'Sumamos Eme Studios y Cold Culture al catálogo. Cada una aportó algo diferente: textura, color, historia. HEVEN tomó su forma definitiva.' },
              { year: '— 2026 / Hoy',           title: 'Tienda online. Comunidad real.',     desc: 'Lanzamos la plataforma digital que estás visitando. Más de 200 piezas vendidas, cero devoluciones por decepción, y una comunidad que sigue creciendo cada drop.' },
            ].map(t => (
              <div className="timeline-item" key={t.year}>
                <span className="timeline-year">{t.year}</span>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ALIADOS */}
        <aside className="aliados-section fade-in">
          <div className="aliados-header">
            <span className="section-label">— Partners</span>
            <h2 className="section-title">Marcas Aliadas</h2>
          </div>
          <div className="aliados-grid">
            {[
              { name: 'Nude Project', origin: 'Barcelona · Est. 2019' },
              { name: 'Scuffers',     origin: 'Madrid · Est. 2021' },
              { name: 'Eme Studios',  origin: 'Berlin · Est. 2020' },
              { name: 'Cold Culture', origin: 'Amsterdam · Est. 2022' },
            ].map(a => (
              <div className="aliado-item" key={a.name}>
                <span>{a.name}</span>
                <span>{a.origin}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* CTA */}
        <section className="cta-section fade-in">
          <h2>¿LISTO PARA <span>VESTIRTE</span><br />DIFERENTE?</h2>
          <p>Explora nuestra colección o escríbenos directamente</p>
          <div className="cta-buttons">
            <a href="/tienda" className="btn-cta-primary">Ver Colección →</a>
            <a href="/#contacto" className="btn-cta-ghost">Contáctanos</a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
