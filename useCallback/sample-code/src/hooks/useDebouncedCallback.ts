import { useCallback, useEffect, useRef } from 'react'

export function useDebouncedCallback<T extends (...args: any[]) => void>(fn: T, delay: number) {
  const fnRef = useRef(fn)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  const cancel = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const debounced = useCallback((...args: Parameters<T>) => {
    cancel()
    timerRef.current = window.setTimeout(() => {
      fnRef.current(...args)
    }, delay)
  }, [delay, cancel])

  useEffect(() => cancel, [cancel])

  return [debounced, cancel] as const
}
