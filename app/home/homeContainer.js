import React from 'react'
import { connect } from 'react-redux'
import HomeComponent from './homeComponent'
import {
  searchBarText,
  navigatePopToTopRequest,
  // triedNavigateWhenPrevented,
} from '../actions/dataActionCreators';

import mySelectors from '../container/selectors'

const make_mapStateToProps = () => (state, ownProps) => {
  const configReducer = state.configReducer,
        normalizeReducer = state.normalizeReducer,
        entities = normalizeReducer.entities,
        checkbadgeValueOfStatusOfAllInstancesEmptyOrNot = Object.keys(entities.itemsCustomized).length == 0;

  return {
    dataSourceForAllInstances: mySelectors.make_get_dataSourceInstances()(normalizeReducer),
    badgeValueOfStatusOfAllInstances: checkbadgeValueOfStatusOfAllInstancesEmptyOrNot ? {} : mySelectors.make_get_badgeValueOfStatusOfAllInstances()(normalizeReducer),
    // checkbadgeValueOfStatusOfAllInstancesEmptyOrNot,
    instances: entities.instances,
    templates: entities.templates,
    navigatePrevent: configReducer.navigatePrevent,
    navigatePopToTopRequest: configReducer.navigatePopToTopRequest,
    triedNavigateWhenPrevented: configReducer.triedNavigateWhenPrevented,
    checkTemplateEmptyOrNot: Object.keys(entities.templates).length == 0,
    checkInstanceEmptyOrNot: Object.keys(entities.instances).length == 0,
    allItemslength: normalizeReducer.result.items.length,
    route: ownProps.route,
    navigator: ownProps.navigator
  }
}

const mapDispatchToProps = dispatch => ({
  searchBarText: (searchText, attr) => dispatch(searchBarText(searchText, attr)),
  navigatePopToTopRequestFn: (targetTab, statusBoolean) => dispatch(navigatePopToTopRequest(targetTab, statusBoolean)),
  // triedNavigateWhenPrevented: (parentTab, statusBoolean) => dispatch(triedNavigateWhenPrevented(parentTab, statusBoolean))
})

export default connect(make_mapStateToProps, mapDispatchToProps)(HomeComponent)
