import { ITouchEvent } from '@tarojs/components'
import { ReactNode } from 'react'
import { BaseDialog, BaseContentProps } from './base'
import { UITheme } from '../../base/atoms'

export interface TaroContentProps extends BaseContentProps {
  onClick: (event: ITouchEvent) => void
  onClose: (event: ITouchEvent) => void
  titleIcon: ReactNode // 标题图标
  subTitle: string // 副标题
  description: string // 描述
}

export interface TaroDialogProps
  extends Omit<BaseDialog, 'onOverlayClick' | 'onClick'> {
  onClick: (event: ITouchEvent) => void
  onOverlayClick: (event: ITouchEvent) => boolean | void
  theme: UITheme // 主题
  titleIcon: ReactNode // 标题图标
  subTitle: string // 副标题
  description: string // 描述
}
