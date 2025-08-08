import { BaseProps } from '../../base/props'

// 字号枚举类型
export type FontSizeToken =
  | 'font_size_xxs'
  | 'font_size_s'
  | 'font_size_base'
  | 'font_size_l'
  | 'font_size_xl'
  | 'font_size_xxl'

// 字重枚举类型
export type FontWeightToken =
  | 'font_weight_light'
  | 'font_weight'
  | 'font_weight_bold'

// 圆角枚举类型
export type BorderRadiusToken =
  | 'radius_xxs'
  | 'radius_xs'
  | 'radius_s'
  | 'radius_base'
  | 'radius_l'

// JDButton 样式类型
export type JDButtonStyleCode =
  | 'btn_primary_fill_xxxlarge'
  | 'btn_service_fill_xxxlarge'
  | 'btn_primary_light_xxxlarge'
  | 'btn_primary_fill_xxlarge'
  | 'btn_service_fill_xxlarge'
  | 'btn_primary_light_xxlarge'
  | 'btn_primary_fill_xlarge'
  | 'btn_primary_light_xlarge'
  | 'btn_gray_xlarge'
  | 'btn_white_xlarge'
  | 'btn_primary_fill_large'
  | 'btn_primary_light_large'
  | 'btn_gray_large'
  | 'btn_white_large'
  | 'btn_primary_fill_normal'
  | 'btn_primary_light_normal'
  | 'btn_gray_normal'
  | 'btn_white_normal'
  | 'btn_primary_fill_small'
  | 'btn_primary_light_small'
  | 'btn_gray_small'
  | 'btn_white_small'
  | 'btn_primary_fill_mini'
  | 'btn_primary_light_mini'
  | 'btn_gray_mini'
  | 'btn_white_mini'

export interface BaseJDButton extends BaseProps {
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
  onClick?: (e: any) => void
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
