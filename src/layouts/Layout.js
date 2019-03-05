import React, {PureComponent} from 'react'
import ToolBar from '../views/ToolBar'
import TextArea from '../views/TextArea'
import ArticleSelector from '../views/ArticleSelector'
import styles from './layout.module.css'

class Layout extends PureComponent {
  render() {
    const {modules} = this.props
    return (
        <div className={styles.Container}>
          {modules.toolbar && <ToolBar/>}
          {modules.articleselector && <ArticleSelector/>}
          {modules.textarea &&
          <TextArea>
              {this.props.article}
          </TextArea>
          }
        </div>
    )
  }
}

export default Layout
