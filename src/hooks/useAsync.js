import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Generic async data fetcher hook.
 * Handles loading, error, and cancellation cleanly.
 */
export function useAsync(asyncFn, deps = []) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  })

  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    setState({ data: null, loading: true, error: null })

    asyncFn()
      .then(data => {
        if (isMounted.current) {
          setState({ data, loading: false, error: null })
        }
      })
      .catch(err => {
        if (isMounted.current) {
          setState({ data: null, loading: false, error: err.message || 'Something went wrong' })
        }
      })

    return () => {
      isMounted.current = false
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  const refetch = useCallback(() => {
    setState({ data: null, loading: true, error: null })
    asyncFn()
      .then(data => isMounted.current && setState({ data, loading: false, error: null }))
      .catch(err => isMounted.current && setState({ data: null, loading: false, error: err.message }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { ...state, refetch }
}
