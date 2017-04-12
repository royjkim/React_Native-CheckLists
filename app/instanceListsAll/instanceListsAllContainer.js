import React from 'react'
import { connect } from 'react-redux'
import InstanceListsAllComponent from './instanceListsAllComponent'
import { bindActionCreators } from 'redux'
import { changeStatusOfItemsCustomized, searchBarText } from '../actions/dataActionCreators'
import mySelectors from '../container/selectors'

const make_mapStateToProps = () => (state, ownProps) => ({
  state: {
    itemsCustomizedOfAllItems: mySelectors.make_get_itemsCustomizedOfAllItems()(state.normalizeReducer),
    badgeValueOfInstancesOfChosenTemplates: mySelectors.make_get_badgeValueOfInstancesOfChosenTemplates()(state.normalizeReducer),
    badgeValueOfStatusOfAllInstances: mySelectors.make_get_badgeValueOfStatusOfAllInstances()(state.normalizeReducer),
    instances: state.normalizeReducer.entities.instances,
    templates: state.normalizeReducer.entities.templates,
    navigatePopToTopTab: state.configReducer.navigatePopToTopTab
  },
  route: ownProps.route,
  navigator: ownProps.navigator
})

const mapDispatchToProps = dispatch => ({
  changeStatusOfItemsCustomized: targetData => dispatch(changeStatusOfItemsCustomized(targetData)),
  searchBarText: (searchText, attr) => dispatch(searchBarText(searchText, attr))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  state: {
    ...stateProps.state,
    dataSourceForAllInstances: mySelectors.make_get_dataSourceForAllInstances()(stateProps.state.itemsCustomizedOfAllItems),
    // instacesLength: stateProps.state.dataSourceForAllInstances.sectionIdentities.length
  },
  ...dispatchProps,
  ...ownProps
})

export default connect(make_mapStateToProps, mapDispatchToProps, mergeProps)(InstanceListsAllComponent)
