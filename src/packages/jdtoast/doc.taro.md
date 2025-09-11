# JDToast 京东吐司

用于轻提示的京东风格组件。

## 引入

```tsx
import { JDToast } from '@nutui/nutui-react-taro'
```

## 基础用法

### 文字提示

:::demo

<CodeBlock src='taro/demo1.tsx'></CodeBlock>

:::

### 带标题的提示

:::demo

<CodeBlock src='taro/demo2.tsx'></CodeBlock>

:::

### 设置展示时长

:::demo

<CodeBlock src='taro/demo3.tsx'></CodeBlock>

:::

### 内置图标

:::demo

<CodeBlock src='taro/demo4.tsx'></CodeBlock>

:::

### 自定义图标

:::demo

<CodeBlock src='taro/demo5.tsx'></CodeBlock>

:::

## JDToast

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示 | `boolean` | `false` |
| theme | 主题样式 | `light` \| `dark` | `light` |
| duration | 展示时长（毫秒），值为 0 时，toast 不会自动消失 | `number` | `2000` |
| icon | 图标，支持内置图标或自定义图标 | `'tips'` \| `'loading'` \| `ReactNode` | `null` |
| title | 标题 | `string` \| `ReactNode` | `''` |
| content | 内容 | `string` \| `ReactNode` | `''` |
| onClose | 关闭时触发的事件 | `() => void` | `() => {}` |
| iconStyle | 图标样式 | `CSSProperties` | `{}` |
| iconWrapperStyle | 图标容器样式 | `CSSProperties` | `{}` |
| titleStyle | 标题样式 | `CSSProperties` | `{}` |
| contentStyle | 内容样式 | `CSSProperties` | `{}` |
| containerStyle | 容器样式 | `CSSProperties` | `{}` |
| overlayStyle | 遮罩层样式 | `CSSProperties` | `{}` |
| onClick | 点击内容区域时触发 | `(e: any) => void` | `(e: any) => {}` |
| hasOverlay | 是否有遮罩层 | `boolean` | `true` |
| onOverlayClick | 点击遮罩层时触发 | `(e: any) => void` | `(e: any) => {}` |
| ifCloseOnOverlayClick | 是否在点击遮罩层后关闭提示 | `boolean` | `true` |

### 内置图标

| 图标 | 说明 |
| --- | --- |
| `tips` | 提示图标 |
| `loading` | 加载图标（带旋转动画） |

<Contribution name="JDToast" />
