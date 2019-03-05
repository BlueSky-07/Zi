import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {$WindowDidResize} from './symbols/signals'
import {notify} from './tools/EventBus'

ReactDOM.render(<App/>, document.getElementById('root'))

window.addEventListener('resize', () => {
  notify($WindowDidResize)
})
