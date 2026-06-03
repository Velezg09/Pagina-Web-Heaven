'use client'

import { useEffect } from 'react'

export interface CartItem {
  id: number
  name: string
  priceStr: string
  priceNum: number
  qty: number
}

interface CartPanelProps {
  isOpen: boolean
  items: CartItem[]
  onClose: () => void
  onRemove: (id: number) => void
  onClear: () => void
  onCheckout: () => void
}

function formatPriceCOP(num: number) {
  return '$' + num.toLocaleString('es-CO')
}

export default function CartPanel({ isOpen, items, onClose, onRemove, onClear, onCheckout }: CartPanelProps) {
  const totalCount = items.reduce((a, i) => a + i.qty, 0)
  const totalAmount = items.reduce((a, i) => a + i.priceNum * i.qty, 0)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <div id="cart-overlay" className={isOpen ? 'active' : ''} onClick={onClose}></div>
      <div id="cart-panel" className={isOpen ? 'active' : ''} role="dialog" aria-modal="true" aria-label="Carrito de compras">
        <div className="cart-panel-header">
          <div>
            <div className="cart-deco-line"></div>
            <h2>CARRI<span>TO</span></h2>
          </div>
          <button className="cart-close-btn" id="cart-close-btn" onClick={onClose} aria-label="Cerrar carrito">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="cart-count-label">
          <span id="cart-count-text">{totalCount}</span> ítem(s) en tu carrito
        </div>

        <div id="cart-items-list">
          {items.length === 0 ? (
            <div className="cart-empty" id="cart-empty-state">
              <i className="bi bi-bag-x"></i>
              <p>Tu carrito está vacío.<br />Añade piezas a tu selección.</p>
              <em>HEVEN</em>
            </div>
          ) : (
            items.map((item, idx) => (
              <div className="cart-item" key={item.id} style={{ animationDelay: `${idx * 0.05}s` }}>
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">{item.priceStr || formatPriceCOP(item.priceNum) + ' COP'}</span>
                  <span className="cart-item-qty">Cant: {item.qty}</span>
                </div>
                <button className="cart-item-remove" onClick={() => onRemove(item.id)} aria-label={`Eliminar ${item.name}`}>
                  <i className="bi bi-x"></i>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-panel-footer">
          <div className="cart-total-row">
            <span className="cart-total-label">Total</span>
            <span className="cart-total-amount" id="cart-total">
              {formatPriceCOP(totalAmount)}<span>COP</span>
            </span>
          </div>
          <button className="btn-checkout" id="btn-checkout" disabled={items.length === 0} onClick={onCheckout}>
            Proceder al pago →
          </button>
          {items.length > 0 && (
            <button className="btn-clear-cart" id="btn-clear-cart" onClick={onClear}>
              Vaciar carrito
            </button>
          )}
        </div>
      </div>
    </>
  )
}
