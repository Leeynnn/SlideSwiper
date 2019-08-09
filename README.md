# SlideSwiper
滑动Swiper对象，该对象返回一个滑动数组供页面渲染

#这是一个环形的滑动对象，并且在需要循环的数组长度大于0的情况下都可以进行循环

#使用者可以不过于关心实现的逻辑，只需知道怎么使用即可
#简单使用操作就是
#1. var slideSwiper = new SlideSwiper(list, classList)
#2. slideSwiper.init()
#3. slideSwiper.slide(1 或者 -1)

#使用实例

#需要滑动循环的数组
var list = [
  {title: '1'},
  {title: '2'},
  {title: '3'},
  {title: '4'},
  {title: '5'},
  {title: '6'}
]

#滑动数组长度为5，需自定义从最左边至最右边的区块样式名
var classList = [
  'class0',
  'class1',
  'class2',
  'class3',
  'class4'
]

#实例化SlideSwiper对象，传入参数为循环的数组和样式数组
var slideSwiper = new SlideSwiper(list, classList)

#SlideSwiper对象有两个方法：init和slide

#初始化对象，返回一个初次渲染的数组,该实例为
  [
    {title: 5, className: 'class0'},
    {title: 6, className: 'class1'},
    {title: 1, className: 'class2'},
    {title: 2, className: 'class3'},
    {title: 3, className: 'class4'}
  ]
slideSwiper.init()

#滑动数组，使用slide方法，传入参数为1或者-1，1表示左划，-1表示右划
slideSwiper.slide(1)
返回值为
  [
    {title: 4, className: 'class4'},
    {title: 6, className: 'class0'},
    {title: 1, className: 'class1'},
    {title: 2, className: 'class2'},
    {title: 3, className: 'class3'}
  ]
