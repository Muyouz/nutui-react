import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { BasicComponent, ComponentDefaults } from '@/utils/typings'
import type {
  FontSizeToken,
  FontWeightToken,
  BorderRadiusToken,
  JDButtonStyleCode,
} from '@/types/spec/jdbutton/base'

// 重新导出类型
export type {
  JDButtonStyleCode,
  FontSizeToken,
  FontWeightToken,
  BorderRadiusToken,
} from '@/types/spec/jdbutton/base'

export interface JDButtonProps extends BasicComponent {
  /** 按钮主文本 */
  text: string
  /** 按钮副文本，不为空就是两行，否则显示单行 */
  subText?: string
  /** 按钮样式代码 */
  styleCode: JDButtonStyleCode
  /** 按钮是否可用 */
  buttonEnable?: boolean
  /** 是否为特殊禁用 */
  specialDisable?: boolean
  /** 左侧图标 */
  btnLeftImage?: string
  /** 右侧图标 */
  btnRightImage?: string
  /** 点击事件 */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  /** 是否为通栏模式（仅48/44高度按钮支持） */
  fullWidth?: boolean
  /** 按钮文本颜色 */
  textColor?: string
  /** 按钮副文本颜色 */
  subTextColor?: string
  /** 按钮文本字体大小 */
  fontSize?: FontSizeToken | number
  /** 按钮副文本字体大小 */
  subFontSize?: FontSizeToken | number
  /** 按钮圆角 */
  borderRadius?: BorderRadiusToken | number
  /** 按钮背景色 */
  backgroundColor?: string
  /** 按钮宽度 */
  width?: number | string
  /** 按钮主文本字重 */
  fontWeight?: FontWeightToken | number
  /** 按钮副文本字重 */
  subFontWeight?: FontWeightToken | number
  /** 按钮字体 */
  fontFamily?: string
  /** 主题模式 */
  theme?: 'light' | 'dark'
}

const defaultProps: Partial<JDButtonProps> = {
  ...ComponentDefaults,
  text: '',
  subText: '',
  styleCode: 'btn_primary_fill_normal',
  buttonEnable: true,
  specialDisable: false,
  btnLeftImage: '',
  btnRightImage: '',
  onClick: (e: React.MouseEvent<HTMLDivElement>) => {},
  fullWidth: false,
  textColor: undefined,
  subTextColor: undefined,
  fontSize: undefined,
  subFontSize: undefined,
  borderRadius: undefined,
  backgroundColor: undefined,
  width: undefined,
  fontWeight: undefined,
  subFontWeight: undefined,
  fontFamily: undefined,
  theme: 'light',
}

export const JDButton = React.forwardRef<
  HTMLDivElement,
  Partial<JDButtonProps>
>((props, ref) => {
  const {
    text,
    subText,
    styleCode,
    buttonEnable,
    specialDisable,
    btnLeftImage,
    btnRightImage,
    className,
    style,
    onClick,
    fullWidth,
    textColor,
    subTextColor,
    fontSize,
    subFontSize,
    borderRadius,
    backgroundColor,
    width,
    fontWeight,
    subFontWeight,
    fontFamily,
    theme,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  }

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!buttonEnable || specialDisable) return
      onClick?.(e)
    },
    [buttonEnable, specialDisable, onClick]
  )

  const buttonClass = useMemo(() => {
    return classNames(
      'nut-jdbutton',
      {
        [`nut-jdbutton--${styleCode}`]: styleCode,
        'nut-jdbutton--disabled': !buttonEnable || specialDisable,
        'nut-jdbutton--full-width': fullWidth,
        [`nut-jdbutton--theme-${theme}`]: theme,
      },
      className
    )
  }, [styleCode, buttonEnable, specialDisable, fullWidth, theme, className])

  const buttonStyle = useMemo(() => {
    const styles: React.CSSProperties = {
      ...style,
    }

    if (textColor) styles.color = textColor
    if (subTextColor) (styles as any)['--sub-text-color'] = subTextColor
    if (fontSize)
      styles.fontSize =
        typeof fontSize === 'number' ? `${fontSize}px` : fontSize
    if (subFontSize)
      (styles as any)['--sub-font-size'] =
        typeof subFontSize === 'number' ? `${subFontSize}px` : subFontSize
    if (borderRadius)
      styles.borderRadius =
        typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius
    if (backgroundColor) styles.backgroundColor = backgroundColor
    if (width) styles.width = typeof width === 'number' ? `${width}px` : width
    if (fontWeight)
      styles.fontWeight =
        typeof fontWeight === 'number' ? fontWeight : fontWeight
    if (subFontWeight)
      (styles as any)['--sub-font-weight'] =
        typeof subFontWeight === 'number' ? subFontWeight : subFontWeight
    if (fontFamily) styles.fontFamily = fontFamily

    return styles
  }, [
    style,
    textColor,
    subTextColor,
    fontSize,
    subFontSize,
    borderRadius,
    backgroundColor,
    width,
    fontWeight,
    subFontWeight,
    fontFamily,
  ])

  return (
    <div
      ref={ref}
      className={buttonClass}
      style={buttonStyle}
      onClick={handleClick}
      {...rest}
    >
      {btnLeftImage && (
        <img
          src={btnLeftImage}
          alt="left icon"
          className="nut-jdbutton__left-icon"
        />
      )}
      <div className="nut-jdbutton__content">
        <div className="nut-jdbutton__text">{text}</div>
        {subText && <div className="nut-jdbutton__sub-text">{subText}</div>}
      </div>
      {btnRightImage && (
        <img
          src={btnRightImage}
          alt="right icon"
          className="nut-jdbutton__right-icon"
        />
      )}
    </div>
  )
})

JDButton.displayName = 'JDButton'
