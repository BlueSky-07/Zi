import React, {PureComponent} from 'react'
import styles from './copyright.module.css'
import {css} from '../../tools'

const QRCODE_LINKS = {
  ALIPAY: 'https://api.ihint.me/qr.php?HTTPS://QR.ALIPAY.COM/FKX05370OGFIX8QOBKXS35',
  WXPAY: 'https://api.ihint.me/wxpay.jpg'
}

class Copyright extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      alipay: false,
      wxpay: false
    }
  }
  
  render() {
    return (
        <div className={styles.Copyright}>
          <p className={styles.Line}>@ BlueSky | v1.0.0 2019.3.6 更新</p>
          <p className={styles.Line}>
            <a className={styles.Link} href="https://github.com/BlueSky-07/Zi" target="_blank" rel="noopener noreferrer">https://github.com/BlueSky-07/Zi</a>
          </p>
          <p className={css(styles.Line, styles.Larger)}>
            <span className={styles.Bolder}>支持开发者</span>
            <span className={css(styles.Pay, styles.Alipay)} onClick={() => {this.setState({alipay: true})}}>支付宝</span>
            <span className={css(styles.Pay, styles.Wxpay)} onClick={() => {this.setState({wxpay: true})}}>微信</span>
          </p>
          {(this.state.alipay || this.state.wxpay) &&
          <img
              className={styles.QRCode}
              src={this.state.alipay ? QRCODE_LINKS.ALIPAY : QRCODE_LINKS.WXPAY}
              onClick={() => {this.setState({alipay: false, wxpay: false})}}
              alt="扫描二维码 支持开发者"
          />
          }
        </div>
    )
  }
  
  componentDidMount() {
  }
  
  componentWillUnmount() {
  }
}

export default Copyright
