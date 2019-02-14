import {listen} from './EventBus'
import {store, init} from '../store'

export const initState = init

export function update(...signals) {
  if (signals) {
    signals.forEach(signal => {
      listen(signal, () => {
        this.setState(store)
      })
    })
  } else {
    this.setState(store)
  }
}

export function wait(signal, callback) {
  listen(signal, callback)
}
