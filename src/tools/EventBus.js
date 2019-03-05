import BSEvent from '../libs/BSEvent'

export const EventBus = new BSEvent('events')

export const listen = (signal, callbacks) => EventBus.on(signal.toString(), callbacks)
export const notify = (signal, ...args) => { try { EventBus.emit(signal.toString(), args) } catch (e) { if (!e.message.endsWith(' has not been registered')) throw e } }
export const listenOnce = (signal, callbacks) => EventBus.once(signal.toString(), callbacks)
export const stop = (signal, callback) => EventBus.remove(signal.toString(), callback)
export const stopAll = (signal) => EventBus.clear(signal.toString())
