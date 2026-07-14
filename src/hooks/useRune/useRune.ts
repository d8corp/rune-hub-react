import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react'
import type { Rune } from 'rune-hub'

import { useSlot } from '../useSlot'

export function useRune<T extends Rune> (rune: T): ReturnType<T> {
  const slot = useSlot<ReturnType<T>>(rune)
  const stop = useMemo(() => slot.on(), [slot])

  useEffect(() => stop, [stop])

  const subscribe = useCallback((callback: () => void) => {
    return slot.on('change', callback)
  }, [slot])

  return useSyncExternalStore<ReturnType<T>>(
    subscribe,
    () => slot.raw,
  )
}
