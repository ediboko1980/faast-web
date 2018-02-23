import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { replace } from 'react-router-redux'
import { connect } from 'react-redux'
import Balances from 'Components/Balances'
import { isValidAddress } from 'Utilities/wallet'
import { toChecksumAddress } from 'Utilities/convert'
import toastr from 'Utilities/toastrWrapper'
import { createViewOnlyPortfolio } from 'Actions/portfolio'

class View extends Component {
  constructor () {
    super()
    this._setAddress = this._setAddress.bind(this)
  }

  componentWillMount () {
    this._setAddress(this.props.match.params.address)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.address !== this.props.match.params.address) {
      this._setAddress(nextProps.match.params.address)
    }
  }

  _setAddress (address) {
    const { historyReplace, createViewOnlyPortfolio } = this.props
    if (!isValidAddress(address)) {
      toastr.error('Not a valid address')
      historyReplace('/')
    } else {
      createViewOnlyPortfolio(toChecksumAddress(address), true)
    }
  }

  render () {
    return <Balances />
  }
}

View.propTypes = {
  match: PropTypes.object.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  historyReplace: replace,
  createViewOnlyPortfolio
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
