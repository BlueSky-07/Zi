import React, {PureComponent} from 'react'
import Button from '../Button'
import styles from './radiobutton.module.css'
import {css} from '../../tools'

class RadioButton extends PureComponent {
  render() {
    const { className, onClick, children, checked } = this.props
    return (
        <Button
          onClick={onClick}
          className={css(className, checked ? styles.RadioButtonChecked : styles.RadioButtonUnchecked)}
        >
          {children}
        </Button>
    )
  }
}

export default RadioButton
