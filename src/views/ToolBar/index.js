import React, {PureComponent} from 'react'
import Button from '../../components/Button'
import RadioButton from '../../components/RadioButton'
import styles from './toolbar.module.css'
import {clickImportArticleButton} from '../../actions'

class ToolBar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      boolean: false
    }
  }

  render() {
    return (
        <div className={styles.ToolBar}>
          <Button
            className={styles.ToolBarButton}
            onClick={() => clickImportArticleButton()}
          >
            导入范文
          </Button>
          <RadioButton
            className={styles.ToolBarButton}
            checked={this.state.boolean}
            onClick={() => {this.setState({boolean: !this.state.boolean})}}
          >
            夜间模式
          </RadioButton>
        </div>
    )
  }
}

export default ToolBar
