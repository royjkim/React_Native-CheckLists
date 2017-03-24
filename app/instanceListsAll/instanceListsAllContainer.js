import React from 'react'
import { connect } from 'react-redux'
import InstanceListsAllComponent from './instanceListsAllComponent'
import { bindActionCreators } from 'redux'
import { modifyItemsCustomized } from '../actions/dataActionCreators'
import mySelectors from '../container/selectors'
import Reactotron from 'reactotron-react-native'

const make_mapStateToProps = () => (state, ownProps) => ({
  state: {
    templatesLength: state.normalizeReducer.result.templates.length,
    // dataSourceTemplates: mySelectors.make_get_dataSourceTemplates()(state.normalizeReducer.entities),
    dataSourceForAllInstances: mySelectors.make_get_dataSourceForAllInstances()(state.normalizeReducer.entities),
    badgeValueOfInstancesOfChosenTemplates: mySelectors.make_get_badgeValueOfInstancesOfChosenTemplates()(state.normalizeReducer.entities),
    badgeValueOfStatusOfAllInstances: mySelectors.make_get_badgeValueOfStatusOfAllInstances()(state.normalizeReducer.entities),
    instances: state.normalizeReducer.entities.instances,
    templates: state.normalizeReducer.entities.templates
  },
  route: ownProps.route,
  navigator: ownProps.navigator
})

const mapDispatchToProps = dispatch => ({
  modifyItemsCustomized: targetData => dispatch(modifyItemsCustomized(targetData))
})

export default connect(make_mapStateToProps, mapDispatchToProps)(InstanceListsAllComponent)
