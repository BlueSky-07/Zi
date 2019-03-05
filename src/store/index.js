export const init = () => ({
  modules: {
    toolbar: true,
    articleselector: false,
    textarea: true
  },
  articleList: [],
  articles: {},
  input: '',
  rawArticle: '',
  article: '请导入范文'
})

export const store = init()
