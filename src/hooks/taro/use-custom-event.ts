import Taro from '@tarojs/taro'
import { useEffect, useRef } from 'react'
import isEqual from 'react-fast-compare'
import { useForceUpdate } from '@/hooks/use-force-update'

export function useCustomEventsPath(selector?: string) {
  selector = selector || ''
  const path = Taro.getCurrentInstance().router?.path
  return path ? `${path}__${selector}` : selector
}

export function useCustomEvent(selector: string, cb: any) {
  const path = useCustomEventsPath(selector)
  useEffect(() => {
    Taro.eventCenter.on(path, cb)
    return () => {
      Taro.eventCenter.off(path)
    }
  }, [])
  const trigger = <T = any>(args: T) => {
    Taro.eventCenter.trigger(path, args)
  }
  const off = () => {
    Taro.eventCenter.off(path)
  }
  return [trigger, off]
}

export function useParams<T = any>(args: T) {
  const forceUpdate = useForceUpdate()
  const stateRef = useRef(args)

  const currentRef = useRef<T>()
  const previousRef = useRef<T>()

  if (!isEqual(currentRef.current, args)) {
    previousRef.current = currentRef.current
    currentRef.current = args
    stateRef.current = args
  }

  const setParams = (args: T) => {
    stateRef.current = { ...stateRef.current, ...args }
    forceUpdate()
  }

  const params = stateRef.current
  return { params, setParams }
}
