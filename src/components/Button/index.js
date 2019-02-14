import React, {PureComponent} from 'react'
import styles from './button.module.css'

class Button extends PureComponent {
  render() {
    const { onClick, children } = this.props
    return (
        <div
            onClick={onClick}
            className={styles.Button}
        >
          {children}
        </div>
    )
  }
}

export default Button
