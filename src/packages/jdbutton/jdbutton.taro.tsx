import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { View, Image, ITouchEvent } from '@tarojs/components'
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
  onClick?: (e: ITouchEvent) => void
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
  onClick: (e: ITouchEvent) => {},
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
  } = { ...defaultProps, ...props }

  // 解析样式代码
  const styleInfo = useMemo(() => {
    // 示例: btn_primary_fill_normal, btn_service_fill_xxxlarge, btn_gray_xlarge
    const parts = styleCode?.split('_') || []

    // 处理不同格式的样式代码
    if (parts.length >= 4) {
      // 格式: btn_primary_fill_normal
      return {
        type: parts[1] || 'primary', // primary, service, gray, white
        style: parts[2] || 'fill', // fill, light
        size: parts[3] || 'normal', // xxxlarge, xxlarge, xlarge, large, normal, small, mini
      }
    }
    if (parts.length === 3) {
      // 格式: btn_gray_xlarge (没有style部分)
      return {
        type: parts[1] || 'primary', // gray, white
        style: '', // 空字符串表示没有style
        size: parts[2] || 'normal', // xlarge, large, normal, small, mini
      }
    }

    // 默认值
    return {
      type: 'primary',
      style: 'fill',
      size: 'normal',
    }
  }, [styleCode])

  // 检查是否支持双栏模式（只有48和44号按钮支持）
  const supportsSubText = useMemo(() => {
    return styleInfo.size === 'xxxlarge' || styleInfo.size === 'xxlarge'
  }, [styleInfo.size])

  // 字号映射表
  const fontSizeMap = {
    font_size_xxs: 'nut-jdbutton-font-size-10',
    font_size_s: 'nut-jdbutton-font-size-12',
    font_size_base: 'nut-jdbutton-font-size-14',
    font_size_l: 'nut-jdbutton-font-size-15',
    font_size_xl: 'nut-jdbutton-font-size-18',
    font_size_xxl: 'nut-jdbutton-font-size-24',
  } as const

  // 字重映射表
  const fontWeightMap = {
    font_weight_light: 'nut-jdbutton-font-weight-light',
    font_weight: 'nut-jdbutton-font-weight-regular',
    font_weight_bold: 'nut-jdbutton-font-weight-semibold',
  } as const

  // 圆角映射表
  const borderRadiusMap = {
    radius_xxs: 'nut-jdbutton-border-radius-0',
    radius_xs: 'nut-jdbutton-border-radius-2',
    radius_s: 'nut-jdbutton-border-radius-4',
    radius_base: 'nut-jdbutton-border-radius-6',
    radius_l: 'nut-jdbutton-border-radius-8',
  } as const

  // 处理点击事件
  const handleClick = useCallback(
    (e: ITouchEvent) => {
      if (buttonEnable && !specialDisable && onClick) {
        onClick(e)
      }
    },
    [buttonEnable, specialDisable, onClick]
  )

  // 构建自定义样式
  const customStyle = useMemo(() => {
    const customStyles: React.CSSProperties = {}

    // 只有在设置了backgroundColor时才使用自定义背景色
    if (backgroundColor && backgroundColor.trim() !== '') {
      customStyles.backgroundColor = backgroundColor
    }

    // 只有在设置了borderRadius时才使用自定义圆角
    if (typeof borderRadius === 'number' && borderRadius >= 0) {
      customStyles.borderRadius = borderRadius
    }

    // 只有在设置了width时才使用自定义宽度
    if (width !== undefined && width !== null) {
      customStyles.width = width
      customStyles.minWidth = 'auto'
    }

    return { ...style, ...customStyles }
  }, [style, backgroundColor, borderRadius, width])

  // 构建类名
  const buttonClassNames = classNames(
    'nut-jdbutton',
    // 根据是否有style来生成不同的类名
    styleInfo.style
      ? `nut-jdbutton-${styleInfo.type}-${styleInfo.style}` // 有style: nut-jdbutton-primary-fill
      : `nut-jdbutton-${styleInfo.type}`, // 无style: nut-jdbutton-gray
    `nut-jdbutton-${styleInfo.size}`,
    `nut-jdbutton-theme-${theme}`, // 添加主题类
    {
      // 优先级：普通禁用 > 特殊禁用 > 正常状态
      'nut-jdbutton-disabled': !buttonEnable, // 普通禁用态
      'nut-jdbutton-special-disabled': specialDisable && buttonEnable, // 特殊禁用态（仅在非普通禁用时）
      'nut-jdbutton-with-subtext': !!subText && supportsSubText,
      // 只有在非双行模式下才添加图标相关的CSS类
      'nut-jdbutton-with-left-icon': !!btnLeftImage && !subText,
      'nut-jdbutton-with-right-icon': !!btnRightImage && !subText,
      'nut-jdbutton-full-width': fullWidth,
      // 动态字号类
      [fontSizeMap[fontSize as keyof typeof fontSizeMap]]:
        typeof fontSize === 'string' &&
        fontSizeMap[fontSize as keyof typeof fontSizeMap],
      // 动态字重类
      [fontWeightMap[fontWeight as keyof typeof fontWeightMap]]:
        typeof fontWeight === 'string' &&
        fontWeightMap[fontWeight as keyof typeof fontWeightMap],
      // 动态副文本字号类
      [fontSizeMap[subFontSize as keyof typeof fontSizeMap]]:
        typeof subFontSize === 'string' &&
        fontSizeMap[subFontSize as keyof typeof fontSizeMap],
      // 动态副文本字重类
      [fontWeightMap[subFontWeight as keyof typeof fontWeightMap]]:
        typeof subFontWeight === 'string' &&
        fontWeightMap[subFontWeight as keyof typeof fontWeightMap],
      // 动态圆角类
      [borderRadiusMap[borderRadius as keyof typeof borderRadiusMap]]:
        typeof borderRadius === 'string' &&
        borderRadiusMap[borderRadius as keyof typeof borderRadiusMap],
    },
    className
  )

  // 构建文本样式的通用函数
  const buildTextStyle = useCallback(
    (
      color?: string,
      fontSize?: FontSizeToken | number,
      fontWeight?: FontWeightToken | number,
      fontFamily?: string
    ) => {
      const styles: React.CSSProperties = {}

      // 只有在设置了color时才覆盖默认文字颜色
      if (color && color.trim() !== '') {
        styles.color = color
      }

      // 只有在设置了fontSize时才覆盖默认字体大小
      if (typeof fontSize === 'number' && fontSize > 0) {
        styles.fontSize = fontSize
      }

      // 只有在设置了fontWeight时才覆盖默认字重
      if (typeof fontWeight === 'number' && fontWeight > 0) {
        styles.fontWeight = fontWeight
      }

      // 只有在设置了fontFamily时才覆盖默认字体
      if (fontFamily && fontFamily.trim() !== '') {
        styles.fontFamily = fontFamily
      }

      return styles
    },
    []
  )

  // 构建主文本样式
  const textStyle = useMemo(() => {
    return buildTextStyle(textColor, fontSize, fontWeight, fontFamily)
  }, [buildTextStyle, textColor, fontSize, fontWeight, fontFamily])

  // 构建副文本样式
  const subTextStyle = useMemo(() => {
    return buildTextStyle(subTextColor, subFontSize, subFontWeight, fontFamily)
  }, [buildTextStyle, subTextColor, subFontSize, subFontWeight, fontFamily])

  return (
    <View
      {...rest}
      ref={ref as any}
      className={buttonClassNames}
      style={customStyle}
      onClick={handleClick}
    >
      {/* 只有在非双行模式下才显示左侧图标 */}
      {btnLeftImage && !subText && (
        <Image
          className="nut-jdbutton-left-icon"
          src={btnLeftImage}
          mode="aspectFit"
        />
      )}

      <View className="nut-jdbutton-content">
        <View className="nut-jdbutton-text" style={textStyle}>
          {text}
        </View>
        {subText && supportsSubText && (
          <View className="nut-jdbutton-subtext" style={subTextStyle}>
            {subText}
          </View>
        )}
      </View>

      {/* 只有在非双行模式下才显示右侧图标 */}
      {btnRightImage && !subText && (
        <Image
          className="nut-jdbutton-right-icon"
          src={btnRightImage}
          mode="aspectFit"
        />
      )}
    </View>
  )
})
JDButton.displayName = 'NutJDButton'
