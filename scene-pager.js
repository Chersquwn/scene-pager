(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ScenePager"] = factory();
	else
		root["ScenePager"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tween = {
  ease: function ease(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  }
};

var ScenePager = function () {
  function ScenePager(_ref) {
    var touchEl = _ref.touchEl,
        moveEl = _ref.moveEl,
        items = _ref.items,
        _ref$speed = _ref.speed,
        speed = _ref$speed === undefined ? 400 : _ref$speed,
        _ref$bounce = _ref.bounce,
        bounce = _ref$bounce === undefined ? false : _ref$bounce,
        _ref$loop = _ref.loop,
        loop = _ref$loop === undefined ? false : _ref$loop,
        _ref$autorun = _ref.autorun,
        autorun = _ref$autorun === undefined ? false : _ref$autorun,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 5000 : _ref$duration,
        _ref$easing = _ref.easing,
        easing = _ref$easing === undefined ? 'ease' : _ref$easing,
        _ref$direction = _ref.direction,
        direction = _ref$direction === undefined ? 'horizontal' : _ref$direction,
        _ref$touchStart = _ref.touchStart,
        touchStart = _ref$touchStart === undefined ? function () {} : _ref$touchStart,
        _ref$touchMove = _ref.touchMove,
        touchMove = _ref$touchMove === undefined ? function () {} : _ref$touchMove,
        _ref$touchEnd = _ref.touchEnd,
        touchEnd = _ref$touchEnd === undefined ? function () {} : _ref$touchEnd,
        _ref$animationStart = _ref.animationStart,
        animationStart = _ref$animationStart === undefined ? function () {} : _ref$animationStart,
        _ref$animationEnd = _ref.animationEnd,
        animationEnd = _ref$animationEnd === undefined ? function () {} : _ref$animationEnd;

    _classCallCheck(this, ScenePager);

    this.touchEl = document.querySelector(touchEl);
    this.moveEl = document.querySelector(moveEl);
    this.items = document.querySelectorAll(items);
    this.speed = speed;
    this.bounce = bounce;
    this.loop = loop;
    this.autorun = autorun;
    this.duration = duration;
    this.easing = typeof easing === 'function' ? easing : tween[easing];
    this.direction = direction === 'horizontal' ? true : false;
    this.touchStart = touchStart;
    this.touchMove = touchMove;
    this.touchEnd = touchEnd;
    this.animationStart = animationStart;
    this.animationEnd = animationEnd;

    this.currentPos = 0;
    this.index = 0;
    this.prevIndex = 0;
    this.length = this.items.length;
    this.animating = false;
    this.running = false;
    this.event = {};
    this.raf = null;
    this.interval = null;
    this.queue = [];

    var rect = this.touchEl.getBoundingClientRect();

    this.rectValue = this.direction ? rect.right - rect.left : rect.bottom - rect.top;
    this.lower = -(this.length - 1) * this.rectValue;
    this.upper = 0;

    this.touchEl.addEventListener('touchstart', this.start.bind(this));
    this.touchEl.addEventListener('touchmove', this.move.bind(this));
    this.touchEl.addEventListener('touchend', this.end.bind(this));

    this.autorun && this.run();

    if (this.loop) {
      for (var i = 0; i < this.length; i++) {
        if (i === this.length - 1) {
          this.queue.push(-1);
        } else {
          this.queue.push(i);
        }
      }

      this.adjustPosition();
    }
  }

  _createClass(ScenePager, [{
    key: 'start',
    value: function start(e) {
      var touch = e.touches[0];

      this.x1 = this.x2 = touch.pageX;
      this.y1 = this.y2 = touch.pageY;
      this.isFirstMove = true;
      this.stop();

      e.startX = this.x1;
      e.startY = this.y1;
      e.index = this.index;
      this.touchStart(e);
    }
  }, {
    key: 'move',
    value: function move(e) {
      var touch = e.touches[0];
      var x = touch.pageX;
      var y = touch.pageY;

      if (this.isFirstMove) {
        var diff = Math.abs(this.x1 - x) - Math.abs(this.y1 - y);

        if (diff > 0 && this.direction || diff < 0 && !this.direction) {
          this.locked = true;
        } else {
          this.locked = false;
        }

        this.isFirstMove = false;
      }

      if (this.locked) {
        e.preventDefault();

        var dx = x - this.x2;
        var dy = y - this.y2;
        var delta = this.direction ? dx : dy;

        if (!this.loop) {
          if (this.currentPos >= this.upper && delta > 0 || this.currentPos <= this.lower && delta < 0) {
            if (this.bounce) {
              delta *= 0.2;
            } else {
              delta = 0;
            }
          }
        }

        this.currentPos += delta;
        this.x2 = x;
        this.y2 = y;
        e.startX = this.x1;
        e.startY = this.y1;
        e.x = this.x2;
        e.y = this.y2;
        e.index = this.index;
        e.prevIndex = this.prevIndex;
        e.currentPos = this.currentPos;
        this.translateTo(this.currentPos);
        this.touchMove(e);
      }
    }
  }, {
    key: 'end',
    value: function end(e) {
      if (this.locked) {
        var moveX = this.x2 - this.x1;
        var moveY = this.y2 - this.y1;
        var bounceRange = this.rectValue * 0.3;
        var delta = this.direction ? moveX : moveY;
        var toIndex = this.index;

        if (!this.loop) {
          if (this.currentPos < this.upper && this.currentPos > this.lower) {
            if (delta >= bounceRange) {
              toIndex = this.index - 1;
            } else if (delta <= -bounceRange) {
              toIndex = this.index + 1;
            }
          }
        } else {
          if (delta >= bounceRange) {
            toIndex = (this.index - 1 + this.length) % this.length;
          } else if (delta <= -bounceRange) {
            toIndex = (this.index + 1 + this.length) % this.length;
          }
        }

        e.startX = this.x1;
        e.startY = this.y1;
        e.x = this.x2;
        e.y = this.y2;
        e.index = toIndex;
        e.prevIndex = this.prevIndex;
        e.currentPos = this.currentPos;

        this.touchEnd(e);
        this.to(toIndex);
      }
    }
  }, {
    key: 'translateTo',
    value: function translateTo(pos) {
      this.moveEl.style.transform = this.moveEl.style.webkitTransform = this.direction ? 'translate3d(' + pos + 'px, 0, 0)' : 'translate3d(0, ' + pos + 'px, 0)';
    }
  }, {
    key: 'to',
    value: function to(index) {
      var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var self = this;
      var timestamp = Date.now();
      var step = index - this.index;
      if (step <= -(this.length - 1)) {
        step = step + this.length;
      } else if (step >= this.length - 1) {
        step = step - this.length;
      }
      var end = this.loop ? -step * this.rectValue : -index * this.rectValue;
      var start = this.currentPos;
      var ds = end - start;

      this.animating = true;
      this.event.prevIndex = this.prevIndex = this.index;
      this.event.index = this.index = index;

      if (animate) {
        this.animationStart(this.event);(function animate() {
          var dt = Date.now() - timestamp;

          if (dt >= self.speed) {
            if (self.event.index !== self.event.prevIndex) {
              if (self.loop) {
                step > 0 ? self.queue.unshift(self.queue.pop()) : self.queue.push(self.queue.shift());
                self.adjustPosition();
                self.currentPos = 0;
                self.translateTo(self.currentPos);
              }
              self.animationEnd(self.event);
            }
            if (self.autorun && !self.running) {
              self.run();
            }
            return;
          } else {
            self.currentPos = ds * self.easing(dt / self.speed) + start;
            if (Math.abs(dt - self.speed) < 20) {
              self.currentPos = end;
            }
          }

          self.translateTo(self.currentPos);
          self.raf = requestAnimationFrame(animate);
        })();
      } else {
        self.currentPos = end;
        self.translateTo(self.currentPos);
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      clearInterval(this.interval);
      !this.loop && cancelAnimationFrame(this.raf);
      this.running = false;
      this.event.prevIndex = this.prevIndex;
      this.event.index = this.index;
      this.animating && this.animationEnd(this.event);
    }
  }, {
    key: 'run',
    value: function run() {
      var _this = this;

      this.running = true;
      this.interval = setInterval(function () {
        _this.to((_this.index + 1) % _this.length);
      }, this.duration);
    }
  }, {
    key: 'adjustPosition',
    value: function adjustPosition() {
      var _this2 = this;

      this.queue.forEach(function (item, i) {
        _this2.items[i].style.transform = _this2.items[i].style.webkitTransform = _this2.direction ? 'translate3d(' + item * _this2.rectValue + 'px, 0, 0)' : 'translate3d(0, ' + item * _this2.rectValue + 'px, 0)';
      });
    }
  }]);

  return ScenePager;
}();

exports.default = ScenePager;

/***/ })
/******/ ]);
});