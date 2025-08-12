import React from 'react'
import JDButton from '../../index.taro'

const Demo1 = () => {
  return (
    <div className="demo">
      <div style={{ padding: '16px' }}>
        <JDButton
          text="主要按钮"
          styleCode="btn_primary_fill_normal"
          onClick={() => console.log('点击了主要按钮')}
        />
      </div>
      <div style={{ padding: '16px' }}>
        <JDButton
          text="次要按钮"
          styleCode="btn_primary_light_normal"
          onClick={() => console.log('点击了次要按钮')}
        />
      </div>
      <div style={{ padding: '16px' }}>
        <JDButton
          text="禁用状态"
          styleCode="btn_primary_fill_normal"
          buttonEnable={false}
          onClick={() => console.log('这个按钮被禁用了')}
        />
      </div>
      <div style={{ padding: '16px' }}>
        <JDButton
          text="老人模式"
          styleCode="btn_primary_fill_normal"
          elderMode
          onClick={() => console.log('点击了老人模式按钮')}
        />
      </div>
    </div>
  )
}

export default Demo1
