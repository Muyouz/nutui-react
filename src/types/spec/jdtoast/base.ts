import { CSSProperties, ReactNode } from 'react'

export type JdToastIcon = 'tips' | 'loading' | ReactNode

export type BaseJdToast = {
  theme: 'light' | 'dark'
  visible: boolean
  duration: number // <=0 表示一直显示; >0 表示显示时长(毫秒)
  icon: JdToastIcon
  title: string | ReactNode
  content: string | ReactNode
  onClose: () => void // 通知父组件关闭

  iconStyle?: CSSProperties
  iconWrapperStyle?: CSSProperties
  titleStyle?: CSSProperties
  contentStyle?: CSSProperties
  containerStyle?: CSSProperties
  overlayStyle?: CSSProperties
  onClick?: (e: any) => void // 点击内容区
  hasOverlay?: boolean // 是否有遮罩层，默认有
  onOverlayClick?: (e: any) => void // 点击遮罩层
}
