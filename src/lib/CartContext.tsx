'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export interface CartItem {
  id: number
  name: string
  priceStr: string
  priceNum: number
  qty: number
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addItem: (name: string, priceStr: string) => void
  removeItem: (id: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
  toast: { message: string; visible: boolean }
  showToast: (msg: string, duration?: number) => void
}

const CartContext = createContext<CartContextType | null>(null)

let toastTimer: ReturnType<typeof setTimeout>

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [toast, setToast] = useState({ message: '', visible: false })

  const cartCount = items.reduce((a, i) => a + i.qty, 0)
  const cartTotal = items.reduce((a, i) => a + i.priceNum * i.qty, 0)

  const showToast = useCallback((msg: string, duration = 2500) => {
    setToast({ message: msg, visible: true })
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => setToast(t => ({ ...t, visible: false })), duration)
  }, [])

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  const toggleCart = () => setIsOpen(o => !o)

  const addItem = useCallback((name: string, priceStr: string) => {
    const priceNum = parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0
    setItems(prev => {
      const ex = prev.find(i => i.name === name)
      if (ex) return prev.map(i => i.name === name ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { id: Date.now(), name, priceStr, priceNum, qty: 1 }]
    })
    setIsOpen(true)
    showToast(`"${name}" añadido al carrito`)
  }, [showToast])

  const removeItem = useCallback((id: number) => {
    const name = items.find(i => i.id === id)?.name
    setItems(prev => prev.filter(i => i.id !== id))
    if (name) showToast(`"${name}" eliminado`)
  }, [items, showToast])

  const clearCart = useCallback(() => {
    setItems([])
    showToast('Carrito vaciado')
  }, [showToast])

  return (
    <CartContext.Provider value={{
      items, isOpen, openCart, closeCart, toggleCart,
      addItem, removeItem, clearCart,
      cartCount, cartTotal, toast, showToast
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
