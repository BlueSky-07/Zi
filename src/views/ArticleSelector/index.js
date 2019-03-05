import React, {PureComponent} from 'react'
import styles from './articleselector.module.css'
import {pasteArticle, selectArticle} from '../../actions'
import {$ArticleListDidLoad, $ArticleDidPaste} from '../../symbols/signals'
import {store, update, reg} from '../../tools/StateManager'

class ArticleSelector extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {...store}
    update.call(this, $ArticleListDidLoad)
  }
  
  render() {
    return (
        <div className={styles.ArticleSelector}>
          <ul className={styles.List}>
            {this.state.articleList.map(article =>
                article &&
                <li
                    key={article.url}
                    author={article.author}
                    className={styles.ListItem}
                    onClick={() => selectArticle(article)}
                >
                  {article.title}
                </li>
            )}
          </ul>
          <textarea
              className={styles.Editor}
              placeholder="请在此粘贴范文"
              onChange={e => pasteArticle({article: e.target.value, title: ''})}
              ref={node => this.textareaRef = node}
          >
          </textarea>
        </div>
    )
  }
  
  componentDidMount() {
    this.textareaRef.value = this.state.rawArticle
    this.actions = [
        reg($ArticleDidPaste, ([{rawArticle}]) => {
          this.textareaRef.value = rawArticle
        })
    ]
    this.actions.forEach(action => action.wait())
  }
  
  componentWillUnmount() {
    this.actions.forEach(action => action.stop())
  }
}

export default ArticleSelector
