import React, {PureComponent} from 'react'
import styles from './textarea.module.css'
import {receiveInput} from '../../actions'
import {$ArticleDidImport, $InputDidReceive, $InputWillClear} from '../../symbols/signals'
import {store, update, reg} from '../../tools/StateManager'

class TextArea extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {...store}
    update.call(this, $InputDidReceive)
  }
  
  render() {
    return (
        <div className={styles.TextArea}>
          <div
              className={styles.Editor}
              onInput={e => receiveInput({value: e.target.innerText})}
              ref={node => this.editorRef = node}
          />
          <div className={styles.Viewer} ref={node => this.viewerRef = node}>
            {this.props.children}
          </div>
        </div>
    )
  }
  
  componentDidMount() {
    this.actions = [
        reg($InputWillClear, () => {
          this.editorRef.innerText = ''
        }),
        reg($ArticleDidImport, () => {
          setTimeout(() => {
            this.editorRef.style.height = this.viewerRef.offsetHeight + 'px'
          }, 0)
        })
    ]
    this.actions.forEach(action => action.wait())
  }
  
  componentWillUnmount() {
    this.actions.forEach(action => action.stop())
  }
}

export default TextArea
