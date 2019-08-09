// 深拷贝
const extend = function() {
  // 深拷贝 例子 extend(true, target, source)
  // 浅拷贝 例子 extend(target, source)
  let option
  let target = arguments[0] || {}
  let i = 1
  let length = arguments.length
  let deep = false
  // 判断是否为深拷贝
  if (typeof(target) === 'boolean') {
    deep = target
    target = arguments[1] || {}
    i++
  }
  // 判断被拷贝对象是Object
  // 陷阱！！typeof(null) === 'object' true
  if (typeof(target) !== 'object' || target === null) {
    target = {}
  }
  // 判断是非为只传了一个参数
  // 只传一个就返回参数的拷贝,因此i从第0个开始
  if (i === length) {
    target = {}
    i--
  }
  // 开始拷贝
  for (; i < length; i++) {
    // 拷贝者需要为一个Object
    option = arguments[i] // {a : 1, b : 2}
    if (option !== null && typeof(option) === 'object') {
      for (var name in option) {
        // 获取被拷贝对象的同名键值
        var src = target[name]
        // 拷贝对象的键值
        var copy = option[name]
        // 防止环引用
        // 如果拷贝对象的键值===被拷贝对象
        // 被拷贝对象可以通过自身的键不停的去找到自身，形成死循环
        if (target === copy) {
          continue
        }
        if (deep && typeof(copy) === 'object' && copy !== null) {
          if (Array.isArray(copy)) {
            src = src && Array.isArray(src) ? src : []
          } else {
            src = src && typeof(src) === 'object' && !Array.isArray(src) ? src : {}
          }
          target[name] = extend(deep, src, copy)
        } else {
          target[name] = copy
        }
      }
    }
  }
  return target
}
// 双向循环链表对象
class Node {
  constructor(element) {
    this.element = element
    this.next = null
    this.prev = null
  }
}
class CircularList {
  constructor() {
    // 头部element
    this.head = null
    // 尾部element
    this.tail = null
    // 指针
    this.current = null
    // 链表长度
    this.length = 0
  }
  // 添加element
  append(element) {
    const node = new Node(element)
    if (this.head === null) {
      this.head = node
      this.tail = node
      this.current = node
      this.tail.prev = this.head
      this.tail.next = this.head
      this.head.prev = this.head
      this.head.next = this.tail
    } else {
      let current = this.head
      let prev = null
      while (current.next != this.head) {
        current = current.next
      }
      current.next = node
      this.tail = node
      this.tail.next = this.head
      this.tail.prev = current
      this.head.prev = this.tail
    }
    this.length++
  }
  // 将指针移到下一个element
  next() {
    this.current = this.current.next
  }
  // 将指针移到上一个element
  prev() {
    this.current = this.current.prev
  }
  // 移除指定位置的element
  removeAt(position) {
    if (position > -1 && position < this.length) {
      let current = this.head
      let prev
      let index = 0
      if (position === 0) {
        if (this.current === this.head) {
          this.current = current.next
        }
        this.head = current.next
        this.head.prev = this.tail
        this.tail.next = this.head
      } else {
        while (index++ < position) {
          prev = current
          current = current.next
        }
        if (this.current === current) {
          this.current = current.next
        }
        prev.next = current.next
        prev.next.prev = prev
        if (position === this.length - 1) {
          this.tail = prev
          this.head.prev = this.tail
        }
      }
      this.length--
      return current.element
    } else {
      return null
    }
  }
  // 在指定位置插入element
  insert(position, element) {
    let node = new Node(element)
    if (position > -1 && position < this.length) {
      let current = this.head
      let prev
      let index = 0
      if (position === 0) {
        this.head.prev = node
        node.next = this.head
        this.head = node
        this.head.prev = this.tail
        this.tail.next = this.head
      } else {
        while (index++ < position) {
          prev = current
          current = current.next
        }
        prev.next = node
        node.prev = prev
        node.next = current
        current.prev = node
        if (position === this.length - 1) {
          this.tail = prev
          this.tail.next = this.head
          this.head.prev = this.tail
        }
      }
      this.length++
      return true
    } else {
      return false
    }
  }
  // 获取指定element所在位置
  indexOf(element) {
    let current = this.head
    let index = 0
    while (current.next != this.head) {
      if (current.element === element) {
        return index
      }
      index++
      current = current.next
    }
    return -1
  }
  // 移除指定element
  remove(element) {
    let position = this.indexOf(element)
    return this.removeAt(position)
  }
  // 获取头部element
  getHead() {
    return this.head
  }
  // 获取尾部element
  getTail() {
    return this.tail
  }
  // 获取指针所在element
  getCurrent() {
    return this.current
  }
  // 判断链表是否为空
  isEmpty() {
    return this.length === 0
  }
  // 获取链表长度
  size() {
    return this.length
  }
}
// 私有变量
var _circularList = null
var _index = 0
var _list = []
// 环形滑动类
class SlideSwiper {
  constructor (list = [], classList = []) {
    this.list = list
    this.classList = classList
    _circularList = new CircularList()
    for (let i = 0; i < this.list.length; i++) {
      _circularList.append(this.list[i])
    }
  }
  init () {
    return this.slide()
  }
  slide (direction = 0) {
    _index += direction
    if (_index > 4) {
      _index = 0
    }
    if (_index < 0) {
      _index = 4
    }
    if (direction > 0) {
      _circularList.next()
    }
    if (direction < 0) {
      _circularList.prev()
    }
    const arr = [
      extend(true, {}, _circularList.getCurrent().prev.prev.element),
      extend(true, {}, _circularList.getCurrent().prev.element),
      extend(true, {}, _circularList.getCurrent().element),
      extend(true, {}, _circularList.getCurrent().next.element),
      extend(true, {}, _circularList.getCurrent().next.next.element)
    ]
    for (let i = 0; i < 5; i++) {
      let idx = i - _index
      if (idx > 4) {
        idx = idx - 5
      }
      if (idx < 0) {
        idx = 5 + idx
      }
      _list[i] = arr[idx]
      _list[i].className = this.classList[idx]
    }
    return _list
  }
}

export default SlideSwiper