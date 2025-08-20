import { ITouchEvent } from '@tarojs/components'
import { ReactNode } from 'react'
import { JDBaseDialog, JDBaseContentProps } from './base'
import { UITheme } from '../../base/atoms'

export interface JDTaroContentProps extends JDBaseContentProps {
  onClick: (event: ITouchEvent) => void
  onClose: (event: ITouchEvent) => void
  titleIcon: ReactNode // 标题图标
  subTitle: string // 副标题
  description: string // 描述
}

export interface JDTaroDialogProps
  extends Omit<JDBaseDialog, 'onOverlayClick' | 'onClick'> {
  onClick: (event: ITouchEvent) => void
  onOverlayClick: (event: ITouchEvent) => boolean | void
  theme: UITheme // 主题
  titleIcon: ReactNode // 标题图标
  subTitle: string // 副标题
  description: string // 描述
}
