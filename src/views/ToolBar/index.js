import React, {PureComponent} from 'react'
import Button from '../../components/Button'
import styles from './toolbar.module.css'
import {importArticle} from '../../actions'

class ToolBar extends PureComponent {
  render() {
    return (
        <div className={styles.ToolBar}>
          <Button onClick={() => {
            importArticle({
              article: prompt('请粘贴范文，将仅提取汉字：')
            })
          }}>
            导入范文
          </Button>
        </div>
    )
  }
}

export default ToolBar
