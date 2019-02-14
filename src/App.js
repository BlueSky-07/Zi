import React, {PureComponent} from 'react'
import Layout from './layouts/Layout'
import events from './tools/EventBus'

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      text: '请导入范文'
    }
  }
  
  
  render() {
    return (
        <Layout
            text={this.state.text}
        />
    )
  }
  
  componentDidMount() {
    events.on('importArticle', article => {
      console.log(article)
      this.setState({
        text: article || '请导入范文'
      })
    })
  }
}

export default App
