import { useRef } from 'react'

type Callback = (...args: any) => any

const useThrottle = (callback: Callback, delay: number) => {
  const isThrottle = useRef(false)

  /*const throttleCallback = useCallback((...args) => {
    if (isThrottle.current) return
    callback(...args)
    isThrottle.current = true
    setTimeout(() => {
      isThrottle.current = false
    }, delay);
  })*/
  const throttleCallback = (...args: any) => {
    if (isThrottle.current) return
    callback(...args)
    isThrottle.current = true
    setTimeout(() => {
      isThrottle.current = false
    }, delay);
  }

  return throttleCallback
}

export default useThrottle