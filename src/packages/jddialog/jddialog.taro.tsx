import React, { FunctionComponent, MouseEvent } from 'react'
// import { CSSTransition } from 'react-transition-group'
import { View, ITouchEvent } from '@tarojs/components'
import Button from '@/packages/button/index.taro'
import { JDTaroDialogProps } from '@/types'
import { Content, defaultContentProps } from './content.taro'
import { useConfig } from '@/packages/configprovider/configprovider.taro'
import Overlay from '@/packages/overlay/index.taro'
import { defaultOverlayProps } from '@/packages/overlay/overlay.taro'
import { useParams } from '@/hooks/taro/use-custom-event'
import { useLockScrollTaro } from '@/hooks/taro/use-lock-scoll'
import { mergeProps } from '@/utils/merge-props'
import { harmony } from '@/utils/taro/platform'

const defaultProps = {
  ...defaultOverlayProps,
  ...defaultContentProps,
  title: '',
  content: '',
  footer: '',
  confirmText: '',
  cancelText: '',
  theme: 'light',
  titleIcon: '',
  subTitle: '',
  description: '',
  hideConfirmButton: false,
  hideCancelButton: false,
  footerDirection: 'horizontal',
  overlay: true,
  overlayStyle: {},
  overlayClassName: 'nut-dialog-overlay',
  zIndex: 1200,
  beforeCancel: () => true,
  onCancel: () => {},
  onClose: () => {},
  onConfirm: () => {},
  onOverlayClick: () => true,
}

export const BaseDialog: FunctionComponent<Partial<JDTaroDialogProps>> = (
  props
) => {
  const {
    params: {
      id,
      closeOnOverlayClick,
      confirmText,
      cancelText,
      children,
      className,
      content,
      theme,
      titleIcon,
      subTitle,
      description,
      footer,
      footerDirection,
      hideConfirmButton,
      hideCancelButton,
      lockScroll,
      overlay,
      overlayStyle,
      overlayClassName,
      style,
      title,
      visible,
      zIndex,
      beforeCancel,
      onClose,
      onCancel,
      onConfirm,
      onOverlayClick,
    },
    setParams,
  } = useParams(mergeProps(defaultProps, props))
  const classPrefix = 'nut-dialog'
  const { locale } = useConfig()

  const refObject = useLockScrollTaro(!!(visible && lockScroll))
  const renderFooter = () => {
    if (footer === null) return ''

    const handleCancel = (e: ITouchEvent | MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (!beforeCancel?.()) return
      onCancel()
    }

    const handleOk = async (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      try {
        await onConfirm?.(e)
        onClose()
      } catch {
        onClose()
      }
    }

    const btnClass =
      hideCancelButton || hideConfirmButton ? `${classPrefix}-footer-block` : ''

    const renderCancelOfVertical = () => {
      return (
        !hideCancelButton && (
          <View
            className={`${classPrefix}-footer-cancel ${btnClass}`}
            onClick={(e) => handleCancel(e)}
          >
            {cancelText || locale.cancel}
          </View>
        )
      )
    }

    const renderCancel = () => {
      return (
        !hideCancelButton && (
          <Button
            type="default"
            size="large"
            className={`${classPrefix}-footer-cancel ${btnClass}`}
            onClick={(e) => handleCancel(e)}
          >
            {cancelText || locale.cancel}
          </Button>
        )
      )
    }

    const renderConfirm = () => {
      return (
        !hideConfirmButton && (
          <Button
            type="primary"
            size="large"
            className={`${btnClass}`}
            onClick={(e) => handleOk(e)}
          >
            {confirmText || locale.confirm}
          </Button>
        )
      )
    }

    return (
      footer || (
        <>
          {footerDirection === 'vertical' ? (
            <>
              {renderConfirm()}
              {renderCancelOfVertical()}
            </>
          ) : (
            <>
              {renderCancel()}
              {renderConfirm()}
            </>
          )}
        </>
      )
    )
  }

  const onHandleClickOverlay = (e: ITouchEvent) => {
    if (closeOnOverlayClick && visible && e.target === e.currentTarget) {
      const closed = onOverlayClick && onOverlayClick(e)
      closed && onCancel()
    }
  }

  const renderContent = () => {
    const contentZIndex = harmony() ? zIndex + 1 : zIndex // 解决harmony层级问题

    // 鸿蒙当前不支持CSSTransition，所以直接返回Content
    return (
      <Content
        className={className}
        style={{ zIndex: contentZIndex, ...style }}
        title={title}
        footer={renderFooter()}
        footerDirection={footerDirection}
        visible={visible}
        onClose={onClose}
        titleIcon={titleIcon}
        subTitle={subTitle}
        description={description}
      >
        {content || children}
      </Content>
    )

    // return (
    //   <CSSTransition
    //     in={visible}
    //     timeout={300}
    //     classNames="fadeDialog"
    //     unmountOnExit
    //     appear
    //   >
    //     <Content
    //       className={className}
    //       style={{ zIndex: contentZIndex, ...style }}
    //       title={title}
    //       header={header}
    //       close={renderCloseIcon()}
    //       footer={renderFooter()}
    //       footerDirection={footerDirection}
    //       visible={visible}
    //     >
    //       {content || children}
    //     </Content>
    //   </CSSTransition>
    // )
  }

  return (
    <View
      style={{ display: visible ? 'block' : 'none' }}
      ref={refObject}
      catchMove={lockScroll}
    >
      {overlay && (
        <Overlay
          zIndex={zIndex}
          visible={visible}
          style={overlayStyle}
          className={overlayClassName}
          closeOnOverlayClick={closeOnOverlayClick}
          lockScroll={lockScroll}
          onClick={onHandleClickOverlay}
        />
      )}
      {renderContent()}
    </View>
  )
}

BaseDialog.displayName = 'NutDialog'
