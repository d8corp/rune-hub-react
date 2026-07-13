import { useMemo } from 'react'
import type { Rune, Slot } from 'rune-hub'
import { slot } from 'rune-hub'

import { useHub } from '../useHub'

export function useSlot<T> (rune: Rune<T>): Slot<T> {
  const hub = useHub()

  return useMemo(() => hub.use(() => slot(rune)), [rune, hub])
}
