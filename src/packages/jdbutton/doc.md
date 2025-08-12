# JDButton 京东按钮

京东风格的按钮组件，支持多种尺寸和填充状态。

## 引入

```tsx
import { JDButton } from '@nutui/nutui-react-h5'
```

## 示例代码

### 基础用法

:::demo

<CodeBlock src='demo1.tsx'></CodeBlock>

:::

### 自定义样式

:::demo

<CodeBlock src='demo2.tsx'></CodeBlock>

:::

## JDButton

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 按钮主文本 | String | - |
| subText | 按钮副文本，不为空就是两行，否则显示单行 | String | - |
| styleCode | 按钮样式代码 | JDButtonStyleCode | 'btn_primary_fill_normal' |
| buttonEnable | 按钮是否可用 | Boolean | true |
| specialDisable | 是否为特殊禁用 | Boolean | false |
| btnLeftImage | 左侧图标 | String | - |
| btnRightImage | 右侧图标 | String | - |
| onClick | 点击事件 | Function | - |
| fullWidth | 是否为通栏模式（仅48/44高度按钮支持） | Boolean | false |
| textColor | 按钮文本颜色（优先级高于styleCode默认样式） | String | - |
| subTextColor | 按钮副文本颜色（优先级高于styleCode默认样式） | String | - |
| fontSize | 按钮文本字体大小（优先级高于styleCode默认样式） | FontSizeToken \| Number | - |
| subFontSize | 按钮副文本字体大小（优先级高于styleCode默认样式） | FontSizeToken \| Number | - |
| borderRadius | 按钮圆角（优先级高于styleCode默认样式） | BorderRadiusToken \| Number | - |
| backgroundColor | 按钮背景色（优先级高于styleCode默认样式） | String | - |
| width | 按钮宽度（优先级高于styleCode默认样式） | Number \| String | - |
| fontWeight | 按钮主文本字重（优先级高于styleCode默认样式） | FontWeightToken \| Number | - |
| subFontWeight | 按钮副文本字重（优先级高于styleCode默认样式） | FontWeightToken \| Number | - |
| fontFamily | 按钮字体（优先级高于styleCode默认样式） | String | - |
| theme | 主题模式 | 'light' \| 'dark' | 'light' |
| elderMode | 老人模式，开启后组件放大1.2倍 | Boolean | false |

### JDButtonStyleCode 类型

| 值 | 说明 |
| --- | --- |
| btn_primary_fill_xxxlarge | 红色填充 48px |
| btn_service_fill_xxxlarge | 金色填充 48px |
| btn_primary_light_xxxlarge | 浅红填充 48px |
| btn_primary_fill_xxlarge | 红色填充 44px |
| btn_service_fill_xxlarge | 金色填充 44px |
| btn_primary_light_xxlarge | 浅红填充 44px |
| btn_primary_fill_xlarge | 红色填充 40px |
| btn_primary_light_xlarge | 浅红填充 40px |
| btn_gray_xlarge | 灰底 40px |
| btn_white_xlarge | 白底 40px |
| btn_primary_fill_large | 红色填充 36px |
| btn_primary_light_large | 浅红填充 36px |
| btn_gray_large | 灰底 36px |
| btn_white_large | 白底 36px |
| btn_primary_fill_normal | 红色填充 32px |
| btn_primary_light_normal | 浅红填充 32px |
| btn_gray_normal | 灰底 32px |
| btn_white_normal | 白底 32px |
| btn_primary_fill_small | 红色填充 28px |
| btn_primary_light_small | 浅红填充 28px |
| btn_gray_small | 灰底 28px |
| btn_white_small | 白底 28px |
| btn_primary_fill_mini | 红色填充 24px |
| btn_primary_light_mini | 浅红填充 24px |
| btn_gray_mini | 灰底 24px |
| btn_white_mini | 白底 24px |

## 样式优先级

JDButton组件支持通过自定义参数覆盖默认样式：

1. **默认样式**：根据`styleCode`自动应用对应的样式（颜色、字体大小、圆角等）
2. **自定义样式**：通过`textColor`、`fontSize`、`borderRadius`等参数可以覆盖默认样式
3. **优先级**：自定义样式参数 > styleCode默认样式

### 使用示例

```tsx
// 使用默认样式
<JDButton text="默认按钮" styleCode="btn_primary_fill_normal" />

// 自定义样式
<JDButton
  text="自定义按钮"
  styleCode="btn_primary_fill_normal"
  textColor="#ff0000"
  fontSize={16}
  borderRadius={8}
/>

// 禁用状态
<JDButton
  text="禁用按钮"
  buttonEnable={false}
/>

// 通栏模式
<JDButton
  text="通栏按钮"
  fullWidth={true}
  styleCode="btn_primary_fill_xxlarge"
/>
```

## 注意事项

1. **平台兼容性**：此组件在H5和Taro环境中均可使用
2. **样式覆盖**：自定义样式参数会覆盖`styleCode`的默认样式
3. **事件处理**：`onClick`事件在按钮禁用时不会触发
4. **图标支持**：支持左右两侧图标，通过`btnLeftImage`和`btnRightImage`设置
5. **主题支持**：支持light和dark两种主题模式
