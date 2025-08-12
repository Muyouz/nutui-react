import React from 'react'
import { useTranslate } from '@/sites/assets/locale'
import Demo1 from './demos/h5/demo1'

const JDButtonDemo = () => {
  const [translated] = useTranslate({
    'zh-CN': {
      basicUsage: '基础用法',
      buttonType: '按钮类型',
      buttonSize: '按钮尺寸',
      buttonState: '按钮状态',
    },
    'zh-TW': {
      basicUsage: '基礎用法',
      buttonType: '按鈕類型',
      buttonSize: '按鈕尺寸',
      buttonState: '按鈕狀態',
    },
    'en-US': {
      basicUsage: 'Basic Usage',
      buttonType: 'Button Type',
      buttonSize: 'Button Size',
      buttonState: 'Button State',
    },
  })
  return (
    <>
      <div className="demo">
        <h2>{translated.basicUsage}</h2>
        <Demo1 />
      </div>
    </>
  )
}

export default JDButtonDemo
