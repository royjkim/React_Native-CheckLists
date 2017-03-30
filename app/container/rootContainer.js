import React from 'react'
import MyTabs from '../components/myTabs'
import { connect } from 'react-redux'
import { navigatePopToTopRequest, navigatePrevent, triedNavigateWhenPrevented } from '../actions/dataActionCreators'

export default connect((state, ownProps) => ({
  state: {
    navigatePopToTopRequest: state.normalizeReducer.configValue.navigatePopToTopRequest,
    navigatePrevent: state.normalizeReducer.configValue.navigatePrevent,
    triedNavigateWhenPrevented: state.normalizeReducer.configValue.triedNavigateWhenPrevented
  }
}), dispatch => ({
  navigatePopToTopRequest: (targetTab, statusBoolean) => dispatch(navigatePopToTopRequest(targetTab, statusBoolean)),
  navigatePrevent: (__navigatorRouteID, statusBoolean) => dispatch(navigatePrevent(__navigatorRouteID, statusBoolean)),
  triedNavigateWhenPrevented: (__navigatorRouteID, statusBoolean) => dispatch(triedNavigateWhenPrevented(__navigatorRouteID, statusBoolean))
}))(MyTabs)
