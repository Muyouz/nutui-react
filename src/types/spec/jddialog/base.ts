import { ReactNode, ForwardRefExoticComponent, PropsWithChildren } from 'react'
import type { MouseEvent, CSSProperties } from 'react'
import { WebOverlayProps } from '@/types'
import { BasicComponent } from '@/utils/typings'

export type JDDialogConfigType = {
  prefixCls?: string
  simple?: boolean
}

export type JDDialogCloseIconPosition = 'top-right' | 'top-left' | 'bottom'
export type JDDialogFooterDirection = 'horizontal' | 'vertical'
export interface JDBaseContentProps extends BasicComponent {
  visible: boolean
  title: ReactNode
  footer: ReactNode
  footerDirection: JDDialogFooterDirection
}
export interface JDDialogWrapProps
  extends WebOverlayProps,
    Omit<JDBaseContentProps, 'onClick'> {
  visible: boolean
  overlay: boolean
  overlayStyle: CSSProperties
  overlayClassName: string
  onCancel: () => void
  onClose: () => void
  onOverlayClick: (e: MouseEvent) => boolean | void
}

export interface JDBaseDialog extends JDDialogWrapProps {
  content: ReactNode
  confirmText: ReactNode
  cancelText: ReactNode
  hideConfirmButton: boolean
  hideCancelButton: boolean
  beforeCancel: () => boolean
  onConfirm: (e?: MouseEvent<HTMLButtonElement>) => PromiseLike<any> | void
}

export type JDDialogReturnProps = {
  update: (newConfig: Partial<JDBaseDialog>) => void
  close: () => void
}

export interface JDDialogComponent
  extends ForwardRefExoticComponent<PropsWithChildren<Partial<JDBaseDialog>>> {
  confirm: (props: Partial<JDBaseDialog>) => JDDialogReturnProps
  alert: (props: Partial<JDBaseDialog>) => JDDialogReturnProps
  config: (config: JDDialogConfigType) => void
  destroyAll: () => void
}

export const jdDestroyList: Array<() => void> = []
