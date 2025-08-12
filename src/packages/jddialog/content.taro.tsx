import React, { FunctionComponent, HTMLAttributes } from 'react'
import classNames from 'classnames'
import { View, ITouchEvent, Image, Text } from '@tarojs/components'
import { TaroContentProps } from '@/types'

export const defaultContentProps = {
  visible: false,
  title: '',
  header: '',
  footer: '',
  close: '',
  footerDirection: 'horizontal',
  onClick: () => {},
}

const newcloseBase64 =
  'data:image/png;base64,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'

export const Content: FunctionComponent<
  Partial<TaroContentProps> &
    Omit<HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'>
> = (props) => {
  const {
    visible,
    title,
    header,
    footer,
    close,
    footerDirection,
    children,
    style,
    className,
    onClick,
    onClose,
    titleIcon,
    subTitle,
    description,
  } = { ...defaultContentProps, ...props }

  const classPrefix = 'nut-dialog'

  const renderHeader = () => {
    return (
      title && (
        <View className={`${classPrefix}-header`}>
          {titleIcon}
          <Text className={`${classPrefix}-title`}>{title}</Text>
        </View>
      )
    )
  }

  const renderFooter = () => {
    return (
      footer && (
        <View
          className={classNames(`${classPrefix}-footer`, {
            [footerDirection]: footerDirection,
          })}
        >
          {footer}
        </View>
      )
    )
  }

  const handleClick = (e: ITouchEvent) => {
    onClick(e)
  }

  return (
    <View
      className={classNames(`${classPrefix}-outer`, className)}
      style={style}
      onClick={(e: ITouchEvent) => handleClick(e)}
    >
      {close}
      {header}
      <View
        className={classPrefix}
        style={{ display: visible ? 'flex' : 'none' }}
      >
        {renderHeader()}
        {subTitle && (
          <Text className={`${classPrefix}-subTitle`}>{subTitle}</Text>
        )}
        {description && (
          <Text className={`${classPrefix}-description`}>{description}</Text>
        )}
        <View className={`${classPrefix}-content`}>{children}</View>
        {renderFooter()}
      </View>

      {/* 底部关闭按钮 */}
      <Image
        src={newcloseBase64}
        className={`${classPrefix}-newclose`}
        onClick={(e: ITouchEvent) => {
          onClose && onClose(e)
        }}
      />
    </View>
  )
}

Content.displayName = 'NutContent'
