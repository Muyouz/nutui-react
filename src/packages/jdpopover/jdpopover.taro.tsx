/* eslint-disable react/self-closing-comp */
import { Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import React, {
  CSSProperties,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useUuid } from '@/hooks/use-uuid'
import { useRtl } from '@/packages/configprovider/index.taro'
import Popup from '@/packages/popup/index.taro'
import {
  ClickType,
  PopoverList,
  TaroPopoverProps,
  WrapperPosition,
} from '@/types'
import { getRectInMultiPlatform } from '@/utils/taro/get-rect'
import { pxTransform } from '@/utils/taro/px-transform'
import { ComponentDefaults } from '@/utils/typings'

const defaultProps = {
  ...ComponentDefaults,
  list: [],
  theme: 'light',
  location: 'bottom',
  visible: false,
  offset: [0, 8],
  areaOffset: [0, 0],
  arrowOffset: 0,
  targetId: '',
  showArrow: true,
  closeOnOutsideClick: true,
  closeOnActionClick: true,
  overlay: false,
  onClick: () => {},
  onOpen: () => {},
  onClose: () => {},
  useCachePosition: true,
  contentStyle: {},
}

const arrowIconDarkBase64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAAABHNCSVQICAgIfAhkiAAAAOtJREFUSImt1CFPw0AchvHfsgRTNTMUph4Dpp9ifoqPMDR+agY+AB8FBQYNHk391MzMHRnN0t317k0qer30fXKX/zMzLUts0Ib3L7ziN/dHs4nlL2gG63s85kLMJ5RvsTjz7QodPgNMdYBYfj2ypwkQbzjUBtjiJmFfgzu8p0CkAmxwn7hXuKJFuI5igDVWGeUxcUK+SwDW4Zma20sQYwArPBSUn0L0+MkBaPFUoTymC6fQpwAssQtzXTMdPoaOGAKMiaY0Z0V1quIGzxdEUyN9GOu9wQnsEkVTmn+iigC5oinNn6jmBaIpTQtHYOclaG7VXRwAAAAASUVORK5CYII='
const arrowIconLightBase64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAAABHNCSVQICAgIfAhkiAAAALpJREFUSInF1EENg0AURdE7pAKQgATqoE6Kg0pAQiUgoRKQgARwQB28Ljo/IaFNh2GG3oQVCedveBCRpEpSL2n2z0NSFfOtWHzWujn7ER4fP+DWmO2IAHx5RJnjgCEAt4akR0jqNuBWlwpvI3Cr/Se+7whJtwS4dd2K1wlx6xKKfxuavf0eqg3/emyroXILvAQGIPemT8DZOfcEKBYv+gNwvNHbUBX4oQHqA3CrBu4AJ73/0+ZA3GokTS+sSfWiGJoBWQAAAABJRU5ErkJggg=='
const classPrefix = `jdtaro-popover`
export const JDPopover: FunctionComponent<
  Partial<TaroPopoverProps> &
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>
> = (props) => {
  const rtl = useRtl()
  const {
    children,
    list,
    theme,
    location,
    visible,
    offset,
    arrowOffset,
    targetId,
    overlay,
    closeOnOutsideClick,
    closeOnActionClick,
    className,
    showArrow,
    style,
    onClick,
    onOpen,
    onClose,
    onSelect,
    areaOffset,
    useCachePosition,
    contentStyle,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  }

  const popoverRef = useRef<HTMLDivElement>(null)
  const popoverContentRef = useRef<HTMLDivElement>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [popWidth, setPopWidth] = useState(0)
  const [popHeight, setPopHeight] = useState(0)
  const [wrapperPosition, setWrapperPosition] = useState<WrapperPosition>()
  const uid = useUuid()
  const popoverId = `jdtaro-popover-${uid}`
  const popoverContentId = `jdtaro-popover-content-${uid}`

  useEffect(() => {
    const getWrapperPosition = async () => {
      Taro.nextTick(async () => {
        const rect = targetId
          ? await getRectInMultiPlatform(
              document.querySelector(`#${targetId}`),
              targetId,
              useCachePosition
            )
          : await getRectInMultiPlatform(
              popoverRef.current,
              popoverId,
              useCachePosition
            )
        const { width, height, right, left, top } = rect
        setWrapperPosition({
          width,
          height,
          left: rtl ? right : left,
          top,
          right: rtl ? left : right,
        })
        getPopoverContentW()
      })
    }

    const getPopoverContentW = async () => {
      Taro.nextTick(async () => {
        const rectContent = await getRectInMultiPlatform(
          popoverContentRef.current,
          popoverContentId,
          useCachePosition
        )
        setPopWidth(rectContent.width)
        setPopHeight(rectContent.height)
      })
    }

    setShowPopup(visible)
    if (visible) {
      getWrapperPosition()
    } else if (!useCachePosition) {
      // 不使用缓存位置信息时，关闭jdpopover时清空位置信息
      setWrapperPosition(undefined)
    }
  }, [visible, targetId, rtl, popoverId, popoverContentId, useCachePosition])

  const clickAway = (e: any) => {
    if (closeOnOutsideClick) {
      onClick?.(e, ClickType.Outside)
      onClose?.()
    }
  }

  const classes = classNames(
    classPrefix,
    {
      [`${classPrefix}-${theme}`]: theme === 'dark',
    },
    className
  )

  const popoverArrow = () => {
    const prefixCls = `${classPrefix}-arrow`
    const direction = location.split('-')[0]
    if (location !== direction) {
      return `${prefixCls} ${prefixCls}-${direction} ${prefixCls}-${location}`
    }
    return `${prefixCls} ${prefixCls}-${direction}`
  }

  const getPopoverPosition = () => {
    const styles: CSSProperties = {}
    if (!wrapperPosition) {
      // styles.visibility = 'hidden'
      return styles
    }
    const { width, height, left, top, right } = wrapperPosition
    const direction = location.split('-')[0]
    const skew = location.split('-')[1]

    let cross = 0 // 沿着弹出方向的偏移量
    let parallel = 0 // 垂直弹出方向的偏移量

    if (Array.isArray(offset) && offset.length === 2) {
      const rtloffset = rtl ? -offset[0] : offset[0]
      cross += +offset[1]
      parallel += +rtloffset
    }
    if (width) {
      const dir = rtl ? 'right' : 'left'
      if (['bottom', 'top'].includes(direction)) {
        const h = direction === 'bottom' ? height + cross : -(popHeight + cross)
        styles.top = pxTransform(top + h + areaOffset[1])

        if (!skew) {
          styles[dir] = pxTransform(
            -(popWidth - width) / 2 + wrapperPosition[dir] + parallel
          )
        }
        if (skew === 'left') {
          styles.left = pxTransform(left + parallel + areaOffset[0])
        }
        if (skew === 'right') {
          // styles.left = pxTransform(right - popWidth + parallel)
          // TODO: 能实现效果，但有点奇怪，怀疑是鸿蒙css的bug
          styles.left = pxTransform(right - parallel + areaOffset[0])
        }
      }
      if (['left', 'right'].includes(direction)) {
        const contentW =
          direction === 'left' ? -(popWidth + cross) : width + cross
        styles.left = pxTransform(left + contentW + areaOffset[0])
        if (!skew) {
          styles.top = pxTransform(
            top - popHeight / 2 + height / 2 - 4 + parallel + areaOffset[1]
          )
        }
        if (skew === 'top') {
          styles.top = pxTransform(top + parallel + areaOffset[1])
        }
        if (skew === 'bottom') {
          styles.top = pxTransform(top + height + parallel + areaOffset[1])
        }
      }
    }

    // styles.visibility = popWidth === 0 ? 'hidden' : 'initial'
    return styles
  }

  const popoverArrowStyle = () => {
    const styles: CSSProperties = {}
    const direction = location.split('-')[0]
    const skew = location.split('-')[1]
    const base = 16

    if (arrowOffset !== 0) {
      const dir = rtl ? 'right' : 'left'
      const dir2 = rtl ? 'left' : 'right'
      if (['bottom', 'top'].includes(direction)) {
        if (!skew) {
          styles[dir] = `calc(50% + ${arrowOffset}px)`
        }
        if (skew === 'left') {
          styles[dir] = `${base + arrowOffset}px`
        }
        if (skew === 'right') {
          styles[dir2] = `${base - arrowOffset}px`
        }
      }

      if (['left', 'right'].includes(direction)) {
        if (!skew) {
          styles.top = `calc(50% - ${arrowOffset}px)`
        }
        if (skew === 'top') {
          styles.top = `${base - arrowOffset}px`
        }
        if (skew === 'bottom') {
          styles.bottom = `${base + arrowOffset}px`
        }
      }
    }
    return styles
  }

  const handleSelect = (item: PopoverList, index: number) => {
    if (!item.disabled) {
      onSelect?.(item, index)
    }
    if (closeOnActionClick) {
      onClick?.()
      onClose?.()
    }
  }

  return (
    <>
      {!targetId && (
        <View
          className={`${classPrefix}-wrapper`}
          ref={popoverRef}
          id={popoverId}
          onClick={(e) => {
            props?.onClick?.(e, ClickType.Target)
            if (!visible) {
              onOpen?.()
            } else {
              onClose?.()
            }
          }}
          style={style}
        >
          {Array.isArray(children) ? children[0] : children}
        </View>
      )}
      {showPopup && wrapperPosition && (
        <View className={classes} style={{ ...getPopoverPosition(), ...style }}>
          <Popup
            className={`${classPrefix}-content ${classPrefix}-content-${location}`}
            position="none"
            overlay={overlay}
            visible={showPopup}
            {...rest}
          >
            <View
              className={`${classPrefix}-content-group ${classPrefix}-content-group-${theme}`}
              id={popoverContentId}
              ref={popoverContentRef}
              style={{ ...(contentStyle || {}) }}
            >
              {showArrow && (
                <View className={popoverArrow()} style={popoverArrowStyle()}>
                  <View
                    style={{
                      width: '8px',
                      height: '4px',
                      backgroundSize: '100% 100%',
                      backgroundImage: `url(${theme === 'dark' ? arrowIconDarkBase64 : arrowIconLightBase64})`,
                    }}
                  ></View>
                </View>
              )}
              {Array.isArray(children) ? children[1] : null}
              {list.map((item, index) => {
                return (
                  <View
                    className={classNames({
                      [`${classPrefix}-item`]: true,
                      [`${classPrefix}-item-disabled`]: item.disabled,
                    })}
                    style={{ ...(item?.style || {}) }}
                    key={item.key || index}
                    onClick={() => handleSelect(item, index)}
                  >
                    {item.icon && (
                      <View
                        className={`${classPrefix}-item-icon`}
                        style={{ ...(item?.iconStyle || {}) }}
                      >
                        {item.icon}
                      </View>
                    )}
                    <Text
                      className={`${classPrefix}-item-name`}
                      style={{ ...(item?.nameStyle || {}) }}
                    >
                      {item.name}
                    </Text>
                    {item.action?.icon && (
                      <View
                        className={`${classPrefix}-item-action-icon`}
                        onClick={(e) => item.action?.onClick?.(e)}
                        style={{ ...(item?.action?.style || {}) }}
                      >
                        {item.action.icon}
                      </View>
                    )}
                  </View>
                )
              })}
            </View>
          </Popup>
        </View>
      )}
      {showPopup && closeOnOutsideClick && (
        <View
          className={`${classPrefix}-content-bg`}
          onClick={clickAway}
          onTouchMove={clickAway}
        />
      )}
    </>
  )
}

JDPopover.displayName = 'JdTaroPopover'
