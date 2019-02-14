import React, {PureComponent} from 'react'
import styles from './button.module.css'

class Button extends PureComponent {
  render() {
    return (
        <div
            onClick={this.props.handleClick}
            className={styles.Button}
        >
          {this.props.name}
        </div>
    )
  }
}

export default Button
