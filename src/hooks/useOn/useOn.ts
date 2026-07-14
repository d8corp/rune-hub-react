import { useEffect } from 'react'
import type { Rune } from 'rune-hub'

import { useSlot } from '../useSlot'

export function useOn (rune: Rune) {
  const slot = useSlot(rune)

  useEffect(() => slot.on(), [slot])
}
