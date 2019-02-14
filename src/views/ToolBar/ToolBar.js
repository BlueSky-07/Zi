import React, {PureComponent} from 'react'
import Button from './Button'
import styles from './toolbar.module.css'
import events from '../../tools/EventBus'

class ToolBar extends PureComponent {
  render() {
    return (
        <div className={styles.ToolBar}>
          <Button
              name={'导入范文'}
              handleClick={this.importArticle.bind(this)}
          />
        </div>
    )
  }
  
  importArticle() {
    const raw = prompt('请粘贴范文，将仅提取汉字：')
    // const article = raw.replace(/[^\p{Unified_Ideograph}]+/ug, ' ')
    const article = raw.match(/[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}]/ug, '').join('')
    console.log({raw, article})
    events.emit('importArticle', article)
  }
}

export default ToolBar
