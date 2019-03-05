import {store, init} from '../store'
import * as $ from '../symbols/signals'
import {notify} from '../tools/EventBus'
import BSFetch from '../libs/BSFetch'
import {handleArticleList} from '../tools'

export const receiveInput = ({value}) => {
  notify($.$InputWillReceive, {value})
  store.input = value
  notify($.$InputDidReceive, {value})
}

export const clearInput = () => {
  notify($.$InputWillClear)
  notify($.$InputDidClear)
}

export const clickImportArticleButton = () => {
  store.modules.articleselector = !store.modules.articleselector
  notify($.$ArticleImportButtonClicked)
  loadArticleList()
}

export const importArticle = ({article}) => {
  notify($.$ArticleWillImport, {article})
  article = article.replace(/[^\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}]/ug, '')
  store.article = article.trim() || init().article
  notify($.$ArticleDidImport, {article})
  clearInput()
}

export const pasteArticle = ({title, article}) => {
  notify($.$ArticleWillPaste, {rawArticle: article})
  store.rawArticle = article
  store.title = title || init().title
  notify($.$ArticleDidPaste, {rawArticle: article})
  importArticle({article})
}

export const loadArticleList = () => {
  if (!store.articleList.length) {
    notify($.$ArticleListWillLoad)
    BSFetch.get('articles.txt', {restype: 'text'})
        .then(articleList => {
          store.articleList = handleArticleList(articleList)
          notify($.$ArticleListDidLoad)
        })
  }
}

export const selectArticle = ({title, url}) => {
  if (store.articles[url]) {
    pasteArticle(store.articles[url])
  } else {
    BSFetch.get(`articles/${url}.txt`, {restype: 'text'})
        .then(article => {
          store.articles[url] = {title, article}
          pasteArticle({title, article})
        })
  }
}
