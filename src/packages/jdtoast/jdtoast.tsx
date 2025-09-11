import classNames from 'classnames'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { WebJdToastProps } from '@/types'
import { Timeout } from '@/utils'
import { mergeProps } from '@/utils/merge-props'

const ICON_BASE64_MAP = {
  tips: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABHNCSVQICAgIfAhkiAAAA9xJREFUaIHVW+1xGkEM1d64gCuBDqCD0EFSAqkgdGBcge0K7HSQVACpAKgAXAGkgpcf0dmL0N6ntJzfDDM+34f0VlrtrlYbyAkASiKaE9GEiKZENCOikq9jHPl3JqI9EW2IaBdCOHvpZgYAJYB7AGsMxxrAAoBsoNsDwNyIZB35uYWuYShRIrpn123CWfwqTBQ3T+FIRN9DCJueKvcDgEkLix4APLV1SwAzAN/4nW3Dt1+yuTqAHwBOCUVOAFYWynCjvnLDpRp0YcNKV6AE8FgjfMmR2UP2oob4o4fAMuFmlUVdiCp6rBKkt2Yuzq6lta6dEBt9DoP1qfn4kxmD/rpp1j4M8raEG69MNR+ABOltL9KJADUashUSpLsFMo6KoydbIUF62fZlrd+OlmwFnrDEOLUKYjyLiXHIorEBlJizbnphrriG2dDD08d4lnawWhTQh3fKWWD6+96unOhr3jJ0KyvWNXflTIRLxXDvVi6iZ+/Fuw+WiuQCZ0qexb8vubHvu1qXPrwobv0TgJmDnFLpy2X8gBx3X6yVyA2l+6zim3IxP748UkcoXruubpTixvbWylpBCV5lwenTGH9upJ8HfovreaEk4PImyHyxE9eTgpPkMY4ekvE/X61BDoeWkMabXgUsL8kNWU63FJEYnraFyAm7WJdxq62TWG55l5HwM+8tkYgbZ+d9pIuk/52joAvwbsGG3fcU3ZKBxRoXjVmkn3ODHAb3OYVLwjnyy1KGZze6QiEE5iAsLezt0hcxqpBRzFk4KeO+d/S+Ihz3oTLDwuHi+yEENwsrS8+/heJSZjmmBGIlcrozEdFO9mGpkCmUFn/zksW4WicUynzzq6MCMkZ4W/iLlFfwLCcmPXHsx9kiNHOI5W1CCOdqHJZrYK+dddmQnhFarsJ+vv+lZD1OHisYZcXkuUqS2Y6JfEAq024zqpsSMpO4tixJiuTIpOR1Ml5LxFtaQPGiGL+s5JBuXb1BFSub7Qo0EK7f9OomR2ZW0jl2xcrtthzbK5MqSjFpWCU1m7Zu9JK08qdJ2yqu3LyhkNhytK+FMobmyq29k4vMJDyzi4OgkEXnKj2lhGCUpBNku5dV1VTfjYZ0gmz/mJPYXB4F6URZlWs13vCP99dH8zw7fWqEZLN2dLxAK13uV33XQqgWyOBZu8xElzXlw0+u1bwNtcsHq2p19qqURcH/N1/g1CnzmlAkdrNHLutvTBvxNxf8TqpBK6z7NqrFIY+Xjoc0ZB48/jVhQ0QP2Q95SHymYzymiNzS6qCW+fGCQS5dB1Z0xqnSaXQMTzuKd+aE3p6vN15bqP8ASS7588IvRr8AAAAASUVORK5CYII=',
  loading:
    'data:image/png;base64,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',
}

const defaultProps: WebJdToastProps = {
  theme: 'light',
  visible: false,
  duration: 2000, // 时长,duration为0则一直展示
  icon: null,
  title: '',
  content: '',
  onClose: () => {},

  iconStyle: {},
  iconWrapperStyle: {},
  titleStyle: {},
  contentStyle: {},
  containerStyle: {},
  overlayStyle: {},
  onClick: (e: any) => {},
  hasOverlay: true,
  onOverlayClick: (e: any) => {},
}

export const JdToast: FunctionComponent<
  Partial<WebJdToastProps> &
    Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>
> = (props) => {
  const {
    theme,
    visible,
    duration,
    icon,
    title,
    content,
    onClose,

    iconStyle,
    iconWrapperStyle,
    titleStyle,
    contentStyle,
    containerStyle,
    overlayStyle,
    onClick,
    hasOverlay,
    onOverlayClick,
  } = mergeProps(defaultProps, props)

  const classPrefix = 'jdtaro-toast'
  const timer = useRef<Timeout | null>(null)

  const [innerVisible, setInnerVisible] = useState(visible)

  // 当 visible 属性变化时，更新内部状态
  useEffect(() => {
    setInnerVisible(visible)
  }, [visible])

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
        timer.current = null
      }
    }
  }, [])

  // 当组件显示时，设置自动关闭定时器
  useEffect(() => {
    if (innerVisible && duration > 0) {
      // 清除之前的定时器
      if (timer.current) {
        clearTimeout(timer.current)
      }

      // 设置新的定时器
      timer.current = setTimeout(() => {
        setInnerVisible(false)
        onClose?.()
      }, duration)
    } else if (innerVisible && duration === 0) {
      // duration 为 0 时，清除可能存在的定时器，但不自动关闭
      if (timer.current) {
        clearTimeout(timer.current)
        timer.current = null
      }
    }

    // 清理函数：组件卸载或依赖项变化时清除定时器
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
        timer.current = null
      }
    }
  }, [innerVisible, duration])

  // 手动关闭函数
  const handleClose = () => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
    setInnerVisible(false)
    onClose?.()
  }

  // 点击遮罩层关闭
  const handleOverlayClick = (e: any) => {
    onOverlayClick?.(e)
    handleClose()
  }

  // 点击内容区域
  const handleClick = (e: any) => {
    onClick?.(e)
  }

  const hasIcon = icon != null && icon !== ''
  const hasTitle = title != null && title !== ''
  const hasContent = content != null && content !== ''

  const renderIcon = () => {
    if (!hasIcon) {
      return null
    }

    if (typeof icon === 'string' && icon in ICON_BASE64_MAP) {
      const iconUrl = ICON_BASE64_MAP[icon as keyof typeof ICON_BASE64_MAP]
      return (
        <img
          src={iconUrl}
          className={`${classPrefix}-icon`}
          style={iconStyle}
          alt=""
        />
      )
    }
    // 自定义icon
    return (
      <div className={`${classPrefix}-icon-wrapper`} style={iconWrapperStyle}>
        {icon}
      </div>
    )
  }

  const renderTitle = () => {
    if (!hasTitle) {
      return null
    }

    if (typeof title === 'string') {
      const titleClasses = classNames(
        `${classPrefix}-title`,
        `${classPrefix}-title-${hasIcon ? 'unfirst' : 'first'}`
      )
      return (
        <div className={titleClasses} style={titleStyle}>
          {title}
        </div>
      )
    }

    return title
  }

  const renderContent = () => {
    if (!hasContent) {
      return null
    }

    if (typeof content === 'string') {
      const contentClasses = classNames(`${classPrefix}-text`, {
        [`${classPrefix}-text-after-title`]: hasTitle,
        [`${classPrefix}-text-after-icon`]: hasIcon && !hasTitle,
        [`${classPrefix}-text-only`]: !hasTitle && !hasIcon,
      })
      return (
        <span className={contentClasses} style={contentStyle}>
          {content}
        </span>
      )
    }

    return content
  }

  return (
    innerVisible && (
      <>
        {hasOverlay && (
          <div
            className={`${classPrefix}-overlay`}
            style={overlayStyle}
            onClick={handleOverlayClick}
          />
        )}
        <div
          className={`${classPrefix} ${classPrefix}-${theme}`}
          style={containerStyle}
          onClick={handleClick}
        >
          {renderIcon()}
          {renderTitle()}
          {renderContent()}
        </div>
      </>
    )
  )
}

export interface JdToastOptions
  extends Partial<Omit<WebJdToastProps, 'visible'>> {}

JdToast.displayName = 'JDTaroToast'

export default JdToast
