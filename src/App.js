import React, {PureComponent} from 'react'
import Layout from './layouts/Layout'
import {$ArticleDidImport, $ArticleImportButtonClicked} from './symbols/signals'
import {store, update, reg} from './tools/StateManager'

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {...store, ...store.modules}
    update.call(this, $ArticleDidImport)
  }
  
  render() {
    const {toolbar, articleselector, textarea} = this.state
    return (
        <Layout
            title={this.state.title}
            modules={{
              toolbar, articleselector, textarea
            }}
            article={this.state.article}
        />
    )
  }
  
  componentDidMount() {
    this.actions = [
      reg($ArticleImportButtonClicked, () => {
        this.setState({...store.modules})
      })
    ]
    this.actions.forEach(action => action.wait())
  }
  
  componentWillUnmount() {
    this.actions.forEach(action => action.stop())
  }
}

export default App
