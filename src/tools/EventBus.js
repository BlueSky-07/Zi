import BSEvent from '../libs/BSEvent'

export const EventBus = new BSEvent('events')

export const listen = (signal, callbacks) => EventBus.on(signal, callbacks)
export const notify = (signal, ...args) => { try { EventBus.emit(signal, args) } catch (e) { } }
export const listenOnce = (signal, callbacks) => EventBus.once(signal, callbacks)
export const stop = (signal, callback) => EventBus.remove(signal, callback)
export const stopAll = (signal) => EventBus.clear(signal)
