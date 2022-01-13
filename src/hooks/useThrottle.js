import { useRef, useCallback } from 'react'

const useThrottle = (callback, delay) => {
  const isThrottle = useRef(null)

  const throttleCallback = useCallback((...args) => {
    if (isThrottle.current) return
    callback(...args)
    isThrottle.current = true
    setTimeout(() => {
      isThrottle.current = false
    }, delay);
  })

  return throttleCallback
}

export default useThrottle