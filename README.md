# scene-pager
A javascript library for carousel，view-pager or H5 slide-show.

## Demo
[https://chersquwn.github.io/scene-pager/](https://chersquwn.github.io/scene-pager/)

## Install
```
npm install scene-pager
// or
yarn add scene-pager
```

## Usage
```javascript
import ScenePager from 'scene-pager'
const sp = new ScenePager({
  touchEl: '.touch-box',
  moveEl: '.move-box',
  items: '.item'
})
```

## Api
```javascript
new ScenePager({
  // 触摸操作的元素
  touchEl: '.touch-box',

  // 执行运动的元素
  moveEl: '.move-box',

  // 执行运动的元素的子元素
  items: '.item',

  // 动画的速度，默认400ms
  speed: 400,
  
  // 到达临界时是否需要回弹效果，默认为false
  bounce: false,

  // 是否启动循环，默认为false，如果轮播中需要可以启用（功能暂未加入）
  loop: false,

  // 是否启动自动轮播，默认为false，如果轮播中需要可以启用
  autorun: false,

  // 自动轮播的间隔时间，如果autorun为true，默认值为5000ms
  duration: 5000,

  // 动画的缓动效果，默认为ease（暂时只有ease效果）
  easing: 'ease',

  // 移动的方向，默认为水平方向
  direction: 'horizontal',

  // touchstart阶段的回调
  touchStart: function(e) {

  },

  // touchmove阶段的回调
  touchMove: function(e) {

  },

  // touchend阶段的回调
  touchEnd: function(e) {

  },

  // 动画开始之前的回调
  animationStart: function(e) {

  },

  // 动画完成的回调
  animationEnd: function(e) {

  }
})
```

`to(index, animate)`
- 跳转到某一个页面
- index: `Number`
- animate: `Boolean`，是否启用动画效果，默认为true

`event事件对象`
- `event.prevIndex`: 上一页的序号
- `event.index`: 当前页的序号
- `event.startX`: 触摸开始位置的x坐标
- `event.startY`: 触摸开始位置的y坐标
- `event.x`: 当前触摸位置的x坐标
- `event.y`: 当前触摸位置的y坐标
- `event.currentPos`: 当前移动元素的位置

## TODO
- 完善各阶段回调函数的调用，以及事件对象
- 添加滑动循环的功能
