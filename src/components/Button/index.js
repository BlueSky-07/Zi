import React, {PureComponent} from 'react'
import styles from './button.module.css'
import {css} from '../../tools'

class Button extends PureComponent {
  render() {
    const { className, onClick, children } = this.props
    return (
        <div
            onClick={onClick}
            className={css(className, styles.Button)}
        >
          {children}
        </div>
    )
  }
}

export default Button
