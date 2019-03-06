import React, {PureComponent} from 'react'
import Button from '../../components/Button'
import RadioButton from '../../components/RadioButton'
import styles from './toolbar.module.css'
import {clickImportArticleButton, switchDarkMode} from '../../actions'
import {store, update} from '../../tools/StateManager'
import {$DarkModeDidDisable, $DarkModeDidEnable} from '../../symbols/signals'

class ToolBar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {...store}
    update.call(this, $DarkModeDidEnable, $DarkModeDidDisable)
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
            checked={this.state.darkMode}
            onClick={() => switchDarkMode()}
          >
            夜间模式
          </RadioButton>
        </div>
    )
  }
}

export default ToolBar
