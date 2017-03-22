import React from 'react'
import { connect } from 'react-redux'
import InstanceListsAllComponent from './instanceListsAllComponent'
import { bindActionCreators } from 'redux'
import { modifyItemsCustomized } from '../actions/dataActionCreators'
import mySelectors from '../container/selectors'
import Reactotron from 'reactotron-react-native'

const make_mapStateToProps = () => {
  const make_get_dataSourceTemplates = mySelectors.make_get_dataSourceTemplates(),
        make_get_badgeValueOfTemplates = mySelectors.make_get_badgeValueOfTemplates(),
        make_get_dataSourceForAllInstances = mySelectors.make_get_dataSourceForAllInstances(),
        make_get_badgeValueOfStatusOfAllInstances = mySelectors.make_get_badgeValueOfStatusOfAllInstances();
  const mapStateToProps = (state, ownProps) => ({
    state: {
      templatesLength: state.normalizeReducer.result.templates.length,
      // dataSourceTemplates: make_get_dataSourceTemplates(state.normalizeReducer.entities),
      dataSourceForAllInstances: make_get_dataSourceForAllInstances(state.normalizeReducer.entities),
      badgeValueOfTemplates: make_get_badgeValueOfTemplates(state.normalizeReducer.entities),
      badgeValueOfStatusOfAllInstances: make_get_badgeValueOfStatusOfAllInstances(state.normalizeReducer.entities),
      instances: state.normalizeReducer.entities.instances,
      templates: state.normalizeReducer.entities.templates
    },
    route: ownProps.route,
    navigator: ownProps.navigator
  })
  return mapStateToProps
}

const mapDispatchToProps = dispatch => ({
  modifyItemsCustomized: targetData => dispatch(modifyItemsCustomized(targetData))
})

export default connect(make_mapStateToProps, mapDispatchToProps)(InstanceListsAllComponent)
