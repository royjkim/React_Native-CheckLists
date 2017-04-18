import React from 'react'
import { connect } from 'react-redux'
import ItemsListsAllComponent from './itemListsAllComponent'
import { bindActionCreators } from 'redux'
import { searchBarText, navigatePopToTopRequest } from '../actions/dataActionCreators'
import mySelectors from '../container/selectors'

const mapStateToProps = (state, ownProps) => {
  const entities = state.normalizeReducer.entities;
  return {
    instances: entities.instances,
    templates: entities.templates,
    items: entities.items,
    dataSourceAllItems: mySelectors.make_get_dataSourceItems()(state.normalizeReducer),
    navigatePopToTopRequest: state.configReducer.navigatePopToTopRequest,
    route: ownProps.route,
    navigator: ownProps.navigator
  }
}

const mapDispatchToProps = dispatch => ({
  searchBarText: (searchText, attr) => dispatch(searchBarText(searchText, attr)),
  navigatePopToTopRequestFn: (targetTab, statusBoolean) => dispatch(navigatePopToTopRequest(targetTab, statusBoolean))
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemsListsAllComponent)
