'use client'

import { useEffect } from 'react'
import { useCart } from '@/lib/CartContext'
import Toast from '@/components/ui/Toast'

function formatPriceCOP(n: number) {
  return '$' + n.toLocaleString('es-CO')
}

export default function GlobalShell({ children }: { children: React.ReactNode }) {
  const { items, isOpen, closeCart, removeItem, clearCart, cartCount, cartTotal, toast, showToast } = useCart()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) closeCart() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, closeCart])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <div id="cart-overlay" className={isOpen ? 'active' : ''} onClick={closeCart} />

      <div id="cart-panel" className={isOpen ? 'active' : ''} role="dialog" aria-modal="true" aria-label="Carrito de compras">
        <div className="cart-panel-header">
          <div>
            <div className="cart-deco-line" />
            <h2>CARRI<span>TO</span></h2>
          </div>
          <button className="cart-close-btn" onClick={closeCart} aria-label="Cerrar carrito">
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="cart-count-label">
          <span>{cartCount}</span> ítem(s) en tu carrito
        </div>

        <div id="cart-items-list">
          {items.length === 0 ? (
            <div className="cart-empty">
              <i className="bi bi-bag-x" />
              <p>Tu carrito está vacío.<br />Añade piezas a tu selección.</p>
              <em>HEVEN</em>
            </div>
          ) : items.map((item, idx) => (
            <div className="cart-item" key={item.id} style={{ animationDelay: `${idx * 0.05}s` }}>
              <div className="cart-item-info">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-price">
                  {item.priceStr || formatPriceCOP(item.priceNum) + ' COP'}
                </span>
                <span className="cart-item-qty">Cant: {item.qty}</span>
              </div>
              <button
                className="cart-item-remove"
                onClick={() => removeItem(item.id)}
                aria-label={`Eliminar ${item.name}`}
              >
                <i className="bi bi-x" />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-panel-footer">
          <div className="cart-total-row">
            <span className="cart-total-label">Total</span>
            <span className="cart-total-amount">
              {formatPriceCOP(cartTotal)}<span>COP</span>
            </span>
          </div>
          <button
            className="btn-checkout"
            disabled={items.length === 0}
            onClick={() => showToast('Redirigiendo al pago...', 2000)}
          >
            Proceder al pago →
          </button>
          {items.length > 0 && (
            <button className="btn-clear-cart" onClick={clearCart}>
              Vaciar carrito
            </button>
          )}
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} />

      {children}
    </>
  )
}
