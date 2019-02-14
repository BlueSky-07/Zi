import React, {PureComponent} from 'react'
import TextArea from '../views/TextArea/TextArea'
import ToolBar from '../views/ToolBar/ToolBar'
import styles from './layout.module.css'

class Layout extends PureComponent {
  render() {
    return (
        <div className={styles.Container}>
          <ToolBar/>
          <TextArea
              text={this.props.text}
          />
        </div>
    )
  }
}

export default Layout
