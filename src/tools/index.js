export const css = (...classNames) => classNames.join(' ')

export const encodeFilename = ({title = '', author = ''} = {}) => btoa(encodeURI(`${title}/${author}`)).slice(0, 16)

export const handleArticleList = rawArticleList =>
    !rawArticleList ? []
        : rawArticleList.split('\n')
            .map(line => {
              if (line.trim().length === 0) return null
              const [title, author, url] = line.split('/')
              return {title, author, url}
            })
