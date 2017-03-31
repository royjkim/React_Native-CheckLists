import React from 'react'
import { connect } from 'react-redux'
import HomeComponent from './homeComponent'
import { searchBarText, navigatePopToTopRequest, triedNavigateWhenPrevented } from '../actions/dataActionCreators'

import mySelectors from '../container/selectors'

const make_mapStateToProps = () => (state, ownProps) => ({
  state: {
    dataSourceForAllInstances: mySelectors.make_get_dataSourceInstances()(state.normalizeReducer),
    badgeValueOfStatusOfAllInstances: mySelectors.make_get_badgeValueOfStatusOfAllInstances()(state.normalizeReducer),
    instances: state.normalizeReducer.entities.instances,
    templates: state.normalizeReducer.entities.templates,
    navigatePrevent: state.configReducer.navigatePrevent,
    navigatePopToTopRequest: state.configReducer.navigatePopToTopRequest,
    triedNavigateWhenPrevented: state.configReducer.triedNavigateWhenPrevented
  },
  route: ownProps.route,
  navigator: ownProps.navigator
})

const mapDispatchToProps = dispatch => ({
  searchBarText: (searchText, attr) => dispatch(searchBarText(searchText, attr)),
  navigatePopToTopRequest: (targetTab, statusBoolean) => dispatch(navigatePopToTopRequest(targetTab, statusBoolean)),
  triedNavigateWhenPrevented: (parentTab, statusBoolean) => dispatch(triedNavigateWhenPrevented(parentTab, statusBoolean))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  state: {
    ...stateProps.state,
    templateLength: stateProps.state.dataSourceForAllInstances._cachedRowCount
  },
  ...dispatchProps,
  ...ownProps,
})

export default connect(make_mapStateToProps, mapDispatchToProps, mergeProps)(HomeComponent)
