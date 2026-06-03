'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useCart } from '@/lib/CartContext'

export default function Navbar() {
  const pathname = usePathname()
  const navbarRef = useRef<HTMLElement>(null)
  const { toggleCart, cartCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        navbarRef.current.style.boxShadow = window.scrollY > 80
          ? '0 2px 20px rgba(33,18,10,0.8)'
          : 'none'
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="navbar navbar-expand-lg" ref={navbarRef}>
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">HEVEN</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-menu">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="nav-menu">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link${pathname === '/' ? ' active-page' : ''}`} href="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link${pathname === '/tienda' ? ' active-page' : ''}`} href="/tienda">Tienda</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link${pathname === '/nosotros' ? ' active-page' : ''}`} href="/nosotros">Nosotros</Link>
            </li>
          </ul>

          <button className="btn-cart position-relative" onClick={toggleCart} type="button" aria-label="Abrir carrito">
            <i className="bi bi-cart me-1" />
            Carrito
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              id="cart-badge"
            >
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}
