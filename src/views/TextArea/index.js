import React, {PureComponent} from 'react'
import styles from './textarea.module.css'
import {receiveInput} from '../../actions'
import {$InputDidReceive, $InputWillClear} from '../../symbols/signals'
import {initState, update, wait} from '../../tools/StateManager'

class TextArea extends PureComponent {
  constructor(props) {
    super(props)
    this.state = initState()
    update.call(this, $InputDidReceive)
  }
  
  render() {
    return (
        <div className={styles.TextArea}>
          <div
              className={styles.Editor}
              onInput={e => receiveInput({value: e.target.innerText})}
              ref={node => this.inputRef = node}
          />
          <div className={styles.Viewer}>
            {this.props.children}
          </div>
        </div>
    )
  }
  
  componentDidMount() {
    wait($InputWillClear, () => {
      this.inputRef.innerText = ''
    })
  }
}

export default TextArea
