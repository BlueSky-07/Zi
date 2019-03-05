import {listen, stop} from './EventBus'
import {store} from '../store'

export {store, init as initState} from '../store'

/**
 * listen signals to update one component's states
 * immediately works when calling without args
 *
 * @param {[Symbol]} signals Nullable, event triggers
 *
 * example:
 * class TestComponent extends React.Component {
 *   constructor(props) {
 *     super(props)
 *     this.state = initState()
 *     update.call(this, $SIGNAL_A, $SIGNAL_B)
 *   }
 * }
 */
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

/**
 * multiple signals support for listen function
 *
 * @param {[Symbol]} signals event triggers
 * @param {[Function]} callbacks functions
 *
 * example:
 * class TestComponent extends React.Component {
 *   componentDidMount() {
 *     wait([$SIGNAL_A, $SIGNAL_B], [() => {}])
 *   }
 * }
 */
function wait(signals, ...callbacks) {
  if (!Array.isArray(signals)) {
    signals = [signals]
  }
  signals.forEach(signal => {
    listen(signal, callbacks)
  })
}

/**
 * register action in React
 *
 * @param {[Symbol]} signals event triggers
 * @param {[Function]} callbacks functions
 *
 * example:
 * class TestComponent extends React.Component {
 *   componentDidMount() {
 *     this.actions = [
 *       reg([[$SIGNAL_A, $SIGNAL_B], [() => {}]),
 *       reg([[$SIGNAL_A, $SIGNAL_B], [() => {}]),
 *     ]
 *     this.actions.forEach(action => action.wait())
 *   }
 *
 *   componentWillUnmount() {
 *     this.actions.forEach(action => action.stop())
 *   }
 * }
 */
export function reg(signals, ...callbacks) {
  return {
    wait: () => {
      wait(signals, ...callbacks)
    },
    stop: () => {
      if (!Array.isArray(signals)) {
        signals = [signals]
      }
      signals.forEach(signal => {
        callbacks.forEach(callback => {
          stop(signal, callback)
        })
      })
    }
  }
}
