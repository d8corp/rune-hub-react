import { useCallback } from 'react'

import { useHub } from '../useHub'

export type Action = (...ar: any[]) => any

export function useAction<T extends Action> (action: T): T {
  const hub = useHub()

  return useCallback(((...args) => hub.use(() => action(...args))) as T, [hub, action])
}
