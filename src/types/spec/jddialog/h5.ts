import { ReactNode } from 'react'
import { JDBaseDialog, JDBaseContentProps } from './base'

export interface JDWebContentProps extends JDBaseContentProps {
  header: ReactNode
  onClick: (event: MouseEvent) => void
}
export interface JDWebDialogProps extends JDBaseDialog {}
