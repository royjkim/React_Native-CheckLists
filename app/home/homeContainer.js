import React from 'react'
import { connect } from 'react-redux'
import HomeComponent from './homeComponent'

import mySelectors from '../container/selectors'

let temp_count = 1
const make_mapStateToProps = () => (state, ownProps) => ({
  state: {
    templatesLength: state.normalizeReducer.result.templates.length,
    // dataSourceTemplates: mySelectors.make_get_dataSourceTemplates()(state.normalizeReducer.entities),
    // dataSourceForAllInstances: mySelectors.make_get_dataSourceForAllInstances()(state.normalizeReducer.entities),
    dataSourceForAllInstances: mySelectors.make_get_dataSourceInstances()(state.normalizeReducer.entities),
    badgeValueOfStatusOfAllInstances: mySelectors.make_get_badgeValueOfStatusOfAllInstances()(state.normalizeReducer.entities),
    // badgeValueOfInstancesOfChosenTemplates: mySelectors.make_get_badgeValueOfInstancesOfChosenTemplates()(state.normalizeReducer.entities),
    instances: state.normalizeReducer.entities.instances,
    templates: state.normalizeReducer.entities.templates
  },
  route: ownProps.route,
  navigator: ownProps.navigator
})

export default connect(make_mapStateToProps)(HomeComponent)
