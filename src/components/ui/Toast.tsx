'use client'

import { useEffect, useRef } from 'react'

interface ToastProps {
  message: string
  visible: boolean
}

export default function Toast({ message, visible }: ToastProps) {
  return (
    <div id="heven-toast" className={visible ? 'visible' : ''}>
      {message}
    </div>
  )
}
