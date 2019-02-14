import React, {PureComponent} from 'react'
import styles from './textarea.module.css'

class TextArea extends PureComponent {
  render() {
    const {text, editor} = this.props
    return (
        <div className={styles.TextArea}>
          <div className={styles.Editor}>
            {editor}
          </div>
          <div className={styles.Viewer}>
            {text}
          </div>
        </div>
    )
  }
  
}

export default TextArea
