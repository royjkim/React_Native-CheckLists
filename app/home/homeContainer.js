import React from 'react'
import { connect } from 'react-redux'
import HomeComponent from './homeComponent'
import { searchBarTextInstanceList, navigateTabCountReset } from '../actions/dataActionCreators'

import mySelectors from '../container/selectors'

const make_mapStateToProps = () => (state, ownProps) => ({
  state: {
    dataSourceForAllInstances: mySelectors.make_get_dataSourceInstances()(state.normalizeReducer),
    badgeValueOfStatusOfAllInstances: mySelectors.make_get_badgeValueOfStatusOfAllInstances()(state.normalizeReducer),
    instances: state.normalizeReducer.entities.instances,
    templates: state.normalizeReducer.entities.templates,
    searchBarText: state.normalizeReducer.searchBarText.searchBarTextInstanceList,
    // navigatePopToTopRequest: state.normalizeReducer.configValue.navigatePopToTopRequest
    navigatePopToTopRequest_home: state.normalizeReducer.configValue.navigatePopToTopRequest_home
  },
  route: ownProps.route,
  navigator: ownProps.navigator
})

const mapDispatchToProps = dispatch => ({
  searchBarTextInstanceList: searchText => dispatch(searchBarTextInstanceList(searchText)),
  navigateTabCountReset: targetTab => dispatch(navigateTabCountReset(targetTab))
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
