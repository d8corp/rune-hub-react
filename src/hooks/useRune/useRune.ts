import { useCallback, useSyncExternalStore } from 'react'
import type { Rune } from 'rune-hub'

import { useSlot } from '../useSlot'

export function useRune<T extends Rune> (rune: T): ReturnType<T> {
  const slot = useSlot<ReturnType<T>>(rune)

  const subscribe = useCallback((callback: () => void) => {
    const destroy = slot.on('change', callback)
    const off = slot.on()

    return () => {
      off()
      destroy()
    }
  }, [slot])

  return useSyncExternalStore<ReturnType<T>>(
    subscribe,
    () => slot.raw,
  )
}
