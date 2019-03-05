/* eslint-disable */
/**
 * Browser-Simple-EventEmitter
 * @BlueSky
 *
 * Version Alpha, 0.2
 *
 * Last updated: 2018/8/24
 *
 */

class EventBundle {
  constructor() {
    this.funs = []
  }
  
  push(f, once) {
    this.funs.push({
      f, once
    })
  }
  
  handle(args) {
    this.funs.forEach(fun => {
      fun.f.call(null, ...args)
    })
    this.funs = this.funs.filter(fun => !fun.once)
  }
  
  remove(f) {
    this.funs = this.funs.filter(fun => fun.f !== f)
  }
  
  clear() {
    this.funs = []
  }
  
}

class BSEvent {
  constructor(name = '') {
    this.events = {}
    
    BSEvent[name] = this
  }
  
  on(name = '', callbacks = new Function(), once = false) {
    if (!name) {
      throw new Error('name must be a string')
    }
    if (!this.events[name]) {
      this.events[name] = new EventBundle()
    }
    if (!(callbacks instanceof Array)) {
      callbacks = [callbacks]
    }
    for (const callback of callbacks) {
      if (!(callback instanceof Function)) {
        throw new Error('callback must be a function')
      }
      this.events[name].push(callback, once)
    }
  }
  
  once(name, callbacks) {
    this.on(name, callbacks, true)
  }
  
  emit(name = '', ...args) {
    if (this.events[name]) {
      this.events[name].handle(args)
    } else {
      throw new Error(`${name} has not been registered`)
    }
  }
  
  remove(name, callback) {
    if (this.events[name]) {
      this.events[name].remove(callback)
    } else {
      throw new Error(`${name} has not been registered`)
    }
  }
  
  clear(name) {
    if (this.events[name]) {
      this.events[name].clear()
    } else {
      throw new Error(`${name} has not been registered`)
    }
  }
}

export default BSEvent
