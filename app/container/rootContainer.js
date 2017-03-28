import React from 'react'
import MyTabs from '../components/myTabs'
import { connect } from 'react-redux'
import { navigatePopToTopRequest } from '../actions/dataActionCreators'

export default connect(null, dispatch => ({
  navigatePopToTopRequest: targetTab => dispatch(navigatePopToTopRequest(targetTab))
}))(MyTabs)
