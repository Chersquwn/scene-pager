const tween = {
  ease(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2))
  }
}

export default class ScenePager {

  constructor({
    touchEl,
    moveEl,
    items,
    speed = 400,
    bounce = false,
    loop = false,
    autorun = false,
    duration = 5000,
    easing = 'ease',
    direction = 'horizontal',
    touchStart = function() {

    },
    touchMove = function() {

    },
    touchEnd = function() {

    },
    animationStart = function() {
      
    },
    animationEnd = function() {
      
    }
  }) {
    this.touchEl = document.querySelector(touchEl)
    this.moveEl = document.querySelector(moveEl)
    this.items = document.querySelectorAll(items)
    this.speed = speed
    this.bounce = bounce
    this.loop = loop
    this.autorun = autorun
    this.duration = duration
    this.easing = typeof easing === 'function' ? easing : tween[easing]
    this.direction = direction === 'horizontal' ? true : false
    this.touchStart = touchStart
    this.touchMove = touchMove
    this.touchEnd = touchEnd
    this.animationStart = animationStart
    this.animationEnd = animationEnd

    this.currentPos = 0
    this.index = 0
    this.prevIndex = 0
    this.length = this.items.length
    this.animating = false
    this.running = false
    this.event = {}
    this.raf = null
    this.interval = null
    this.queue = []

    const rect = this.touchEl.getBoundingClientRect()

    this.rectValue = this.direction ? 
      rect.right - rect.left :
      rect.bottom - rect.top
    this.lower = -(this.length - 1) * this.rectValue
    this.upper = 0

    this.touchEl.addEventListener('touchstart', this.start.bind(this))
    this.touchEl.addEventListener('touchmove', this.move.bind(this))
    this.touchEl.addEventListener('touchend', this.end.bind(this))

    this.autorun && this.run()

    if (this.loop) {
      for (let i = 0; i < this.length; i++) {
        if (i === this.length - 1) {
          this.queue.push(-1)
        } else {
          this.queue.push(i)
        }
      }

      this.adjustPosition()
    }
  }

  start(e) {
    const touch = e.touches[0]

    this.x1 = this.x2 = touch.pageX
    this.y1 = this.y2 = touch.pageY
    this.isFirstMove = true
    this.stop()

    e.startX = this.x1
    e.startY = this.y1
    e.index = this.index
    this.touchStart(e)
  }

  move(e) {
    const touch = e.touches[0]
    const x = touch.pageX
    const y = touch.pageY

    if (this.isFirstMove) {
      const diff = Math.abs(this.x1 - x) - Math.abs(this.y1 - y)

      if (diff > 0 && this.direction || diff < 0 && !this.direction) {
        this.locked = true
      } else {
        this.locked = false
      }

      this.isFirstMove = false
    }

    if (this.locked) {
      e.preventDefault()

      const dx = x - this.x2
      const dy = y - this.y2
      let delta = this.direction ? dx : dy

      if (!this.loop) {
        if ((this.currentPos >= this.upper && delta > 0) || (this.currentPos <= this.lower) && delta < 0) {
          if (this.bounce) {
            delta *= 0.2
          } else {
            delta = 0
          }
        }
      }

      this.currentPos += delta
      this.x2 = x
      this.y2 = y
      e.startX = this.x1
      e.startY = this.y1
      e.x = this.x2
      e.y = this.y2
      e.index = this.index
      e.prevIndex = this.prevIndex
      e.currentPos = this.currentPos
      this.translateTo(this.currentPos)
      this.touchMove(e)
    }
  }

  end(e) {
    if (this.locked) {
      const moveX = this.x2 - this.x1
      const moveY = this.y2 - this.y1
      const bounceRange = this.rectValue * 0.3
      const delta = this.direction ? moveX : moveY
      let toIndex = this.index

      if (!this.loop) {
        if (this.currentPos < this.upper && this.currentPos > this.lower) {
          if (delta >= bounceRange) {
            toIndex = this.index - 1
          } else if (delta <= -bounceRange) {
            toIndex = this.index + 1
          }
        }
      } else {
        if (delta >= bounceRange) {
          toIndex = (this.index - 1 + this.length) % this.length
        } else if (delta <= -bounceRange) {
          toIndex = (this.index + 1 + this.length) % this.length
        }
      }

      e.startX = this.x1
      e.startY = this.y1
      e.x = this.x2
      e.y = this.y2
      e.index = toIndex
      e.prevIndex = this.prevIndex
      e.currentPos = this.currentPos

      this.touchEnd(e)
      this.to(toIndex)
    }
  }

  translateTo(pos) {
    this.moveEl.style.transform = 
    this.moveEl.style.webkitTransform = 
    this.direction ? 
    `translate3d(${pos}px, 0, 0)` :
    `translate3d(0, ${pos}px, 0)`
  }

  to(index, animate = true) {
    const self = this
    const timestamp = Date.now()
    let step = index - this.index
    if (step <= -(this.length - 1)) {
      step = step + this.length
    } else if (step >= this.length - 1) {
      step = step - this.length
    }
    const end = this.loop ? -step * this.rectValue : -index * this.rectValue
    const start = this.currentPos
    const ds = end - start

    this.animating = true
    this.event.prevIndex = this.prevIndex = this.index
    this.event.index = this.index = index

    if (animate) {
      this.animationStart(this.event)

      ;(function animate() {
        const dt = Date.now() - timestamp

        if (dt >= self.speed) {
          if (self.event.index !== self.event.prevIndex) {
            if (self.loop) {
              step > 0 ? self.queue.unshift(self.queue.pop()) : self.queue.push(self.queue.shift())
              self.adjustPosition()
              self.currentPos = 0
              self.translateTo(self.currentPos)
            }
            self.animationEnd(self.event)
          }
          if (self.autorun && !self.running) {
            self.run()
          }
          return
        } else {
          self.currentPos = ds * self.easing(dt / self.speed) + start
          if (Math.abs(dt - self.speed) < 20) {
            self.currentPos = end
          }
        }

        self.translateTo(self.currentPos)
        self.raf = requestAnimationFrame(animate)
      })()
    } else {
      self.currentPos = end
      self.translateTo(self.currentPos)
    }
    
  }

  stop() {
    clearInterval(this.interval)
    !this.loop && cancelAnimationFrame(this.raf)
    this.running = false
    this.event.prevIndex = this.prevIndex
    this.event.index = this.index
    this.animating && this.animationEnd(this.event)
  }

  run() {
    this.running = true
    this.interval = setInterval(() => {
      this.to((this.index + 1) % this.length)
    }, this.duration)
  }

  adjustPosition() {
    this.queue.forEach((item, i) => {
      this.items[i].style.transform = 
      this.items[i].style.webkitTransform = 
      this.direction ? 
      `translate3d(${item * this.rectValue}px, 0, 0)` :
      `translate3d(0, ${item * this.rectValue}px, 0)`
    })
  }

}
