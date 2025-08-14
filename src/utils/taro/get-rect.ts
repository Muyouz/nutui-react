import Taro from '@tarojs/taro'
import { MiniLru } from '@/utils/lru'
import { getRect, inBrowser } from '@/utils/get-rect'

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
  harmonyId = ''
): Promise<Rect> => {
  if (element) {
    if (inBrowser) {
      return Promise.resolve(getRect(element))
    }
    // 非H5下的逻辑
    return new Promise((resolve, reject) => {
      if (lru.has(element)) {
        console.log(
          'getRectInMultiPlatform try get rect from lru===>',
          JSON.stringify(lru.get(element))
        )
        resolve(lru.get(element) as Rect)
        return
      }
      Taro.createSelectorQuery()
        .select(`#${harmonyId || element.uid}`)
        .boundingClientRect()
        .exec(([rects]) => {
          console.log(
            'getRectInMultiPlatform exec result===>',
            JSON.stringify(rects)
          )
          if (rects) {
            lru.set(element, rects)
          }
          resolve(rects)
        })
    })
  }
  return Promise.resolve(makeRect(0, 0))
}
