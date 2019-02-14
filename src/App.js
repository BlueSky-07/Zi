import React, {PureComponent} from 'react'
import Layout from './layouts/Layout'
import {$ArticleDidImport} from './symbols/signals'
import {initState, update} from './tools/StateManager'

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = initState()
    update.call(this, $ArticleDidImport)
  }
  
  render() {
    return (
        <Layout
            article={this.state.article}
        />
    )
  }
}

export default App
