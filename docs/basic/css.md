# CSS

## CSS 包含块中百分比的计算

1. 如果 position 属性为 static、relative 或 sticky，包含块就是该元素最近的祖先块级元素的 content 决定
2. 如果 position 属性为 absolute、fixed，包含块还要额外算上 padding,即 content + padding。
<https://www.nowcoder.com/test/question/done?tid=49821751&qid=2049837#summary>

## Position 定位

1. static 没有定位，元素出现在正常的流中
2. relative 生成相对定位的元素，相对于其正常位置进行定位
3. fixed 生成绝对定位的元素，相对于浏览器窗口进行定位
4. absolute 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位
