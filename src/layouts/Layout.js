import React, {PureComponent} from 'react'
import ToolBar from '../views/ToolBar'
import ArticleSelector from '../views/ArticleSelector'
import Copyright from '../views/Copyright'
import TextArea from '../views/TextArea'
import styles from './layout.module.css'

class Layout extends PureComponent {
  render() {
    const {title, modules} = this.props
    return (
        <div className={styles.Container}>
          <h1 className={styles.Title}>{title}</h1>
          <Copyright />
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
