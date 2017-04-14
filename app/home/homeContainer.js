import React from 'react'
import { connect } from 'react-redux'
import HomeComponent from './homeComponent'
import {
  searchBarText,
  navigatePopToTopRequest,
  triedNavigateWhenPrevented,
  savelocal,
  loadlocal,
  deleteAll,
  deleteLocalStorage,
} from '../actions/dataActionCreators'

import mySelectors from '../container/selectors'

const make_mapStateToProps = () => (state, ownProps) => {
  const configReducer = state.configReducer,
        normalizeReducer = state.normalizeReducer,
        entities = normalizeReducer.entities;

  return {
    state: {
      dataSourceForAllInstances: mySelectors.make_get_dataSourceInstances()(normalizeReducer),
      badgeValueOfStatusOfAllInstances: mySelectors.make_get_badgeValueOfStatusOfAllInstances()(normalizeReducer),
      instances: entities.instances,
      templates: entities.templates,
      navigatePrevent: configReducer.navigatePrevent,
      navigatePopToTopRequest: configReducer.navigatePopToTopRequest,
      triedNavigateWhenPrevented: configReducer.triedNavigateWhenPrevented
    },
    route: ownProps.route,
    navigator: ownProps.navigator
  }
}

const mapDispatchToProps = dispatch => ({
  searchBarText: (searchText, attr) => dispatch(searchBarText(searchText, attr)),
  navigatePopToTopRequest: (targetTab, statusBoolean) => dispatch(navigatePopToTopRequest(targetTab, statusBoolean)),
  triedNavigateWhenPrevented: (parentTab, statusBoolean) => dispatch(triedNavigateWhenPrevented(parentTab, statusBoolean)),
  savelocal: () => dispatch(savelocal()),
  loadlocal: () => dispatch(loadlocal()),
  deleteAll: () => dispatch(deleteAll()),
  deleteLocalStorage: () => dispatch(deleteLocalStorage())
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    state: {
      ...stateProps.state,
      templateLength: stateProps.state.dataSourceForAllInstances._cachedRowCount
    },
    ...dispatchProps,
    ...ownProps,
  }
}

export default connect(make_mapStateToProps, mapDispatchToProps, mergeProps)(HomeComponent)
