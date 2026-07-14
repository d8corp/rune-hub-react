import { useCallback } from 'react'
import type { Fn } from 'rune-hub'

import { useHub } from '../useHub'

export function useAction<T extends Fn> (action: T): T {
  const hub = useHub()

  return useCallback(((...args) => hub.use(() => action(...args))) as T, [hub, action])
}
