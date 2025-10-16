import Taro from '@tarojs/taro'
import { getRect, inBrowser } from '@/utils/get-rect'
import { MiniLru } from '@/utils/lru'

const lru = new MiniLru(10)

export interface Rect {
  dataset: Record<string, any>
  id: string
  top: number
  right: number
  bottom: number
  left: number
  width: number
  height: number
}

export function makeRect(width: number, height: number) {
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height,
  } as Rect
}

export const getRectInMultiPlatform = async (
  element: any,
  harmonyId = '',
  useCache = true
): Promise<Rect> => {
  if (element) {
    if (inBrowser) {
      return Promise.resolve(getRect(element))
    }
    // 非H5下的逻辑
    return new Promise((resolve, reject) => {
      // 当 useCache 为 false 时，跳过缓存逻辑
      if (useCache && lru.has(element)) {
        resolve(lru.get(element) as Rect)
        return
      }
      const dom = document.querySelector('#'.concat(harmonyId || element.uid))
      Taro.createSelectorQuery()
        .in(dom as any)
        .select(`#${harmonyId || element.uid}`)
        .boundingClientRect()
        .exec(([rects]) => {
          if (rects) {
            // 只有当 useCache 为 true 时才存入缓存
            if (useCache) {
              lru.set(element, rects)
            }
          }
          resolve(rects)
        })
    })
  }
  return Promise.resolve(makeRect(0, 0))
}
