import React from 'react'
import { connect } from 'react-redux'
import ItemsListsAllComponent from './itemListsAllComponent'
import { bindActionCreators } from 'redux'
import { modifyItemsCustomized, searchBarText, navigatePopToTopRequest } from '../actions/dataActionCreators'
import mySelectors from '../container/selectors'

const make_mapStateToProps = () => (state, ownProps) => ({
  state: {
    instances: state.normalizeReducer.entities.instances,
    templates: state.normalizeReducer.entities.templates,
    items: state.normalizeReducer.entities.items,
    dataSourceAllItems: mySelectors.make_get_dataSourceItems()(state.normalizeReducer),
    navigatePopToTopRequest: state.configReducer.navigatePopToTopRequest
  },
  route: ownProps.route,
  navigator: ownProps.navigator
})

const mapDispatchToProps = dispatch => ({
  modifyItemsCustomized: targetData => dispatch(modifyItemsCustomized(targetData)),
  searchBarText: (searchText, attr) => dispatch(searchBarText(searchText, attr)),
  navigatePopToTopRequest: (targetTab, statusBoolean) => dispatch(navigatePopToTopRequest(targetTab, statusBoolean))
})

export default connect(make_mapStateToProps, mapDispatchToProps)(ItemsListsAllComponent)
