class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }

  text(text) {
    if ( typeof text !== 'undefined') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }

  clear() {
    this.html('')
    return this
  }
  find(selector) {
    return $(this.$el.querySelector(selector))
  }
  on(eventType, callback) {
    // console.log(eventType === 'mousemove')
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }
  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')

      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }
  closest(selector) {
    return $(this.$el.closest(selector))
  }
  get data() {
    return this.$el.dataset
  }
  getCoords() {
    return this.$el.getBoundingClientRect()
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  css(styles= {}) {
    Object.keys(styles).forEach(styless => {
      this.$el.style[styless] = styles[styless]
    })
    // styles.width && this.$el.style = styles.width
  }

  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s]
      return res
    }, {})
  }
  addClass(className) {
    this.$el.classList.add(className)
    return this
  }
  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }
}
$('div').html('<h1></h1>')
export function $(selector) {
  return new Dom(selector)
}
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}