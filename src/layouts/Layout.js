import React, {PureComponent} from 'react'
import TextArea from '../views/TextArea'
import ToolBar from '../views/ToolBar'
import styles from './layout.module.css'

class Layout extends PureComponent {
  render() {
    return (
        <div className={styles.Container}>
          <ToolBar/>
          <TextArea>
              {this.props.article}
          </TextArea>
        </div>
    )
  }
}

export default Layout
