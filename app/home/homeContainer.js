import React from 'react'
import { connect } from 'react-redux'
import HomeComponent from './homeComponent'
import { bindActionCreators } from 'redux'

import mySelectors from '../container/selectors'
import Reactotron from 'reactotron-react-native'

// this.normalizedData : {
//   "entities": {
//     "templateList": {
//       "1": {
//         "id": 1,
//         "title": "GoingFishing",
//         "category": "Hobby"
//       },
//     },
//     "instanceList": {
//       "1": {
//         "id": 1,
//         "name": "Jack",
//         "template": "GoingFishing"
//       },
//     },
//     "items": {
//       "1": {
//         "id": 1,
//         "desc": "Wear life vest",
//         "template": "GoingFishing",
//         "orderNum": 5
//       },
//     },
//     "templateCategoryList": {
//       "1": {
//         "id": 1,
//         "title": "Hobby"
//       },
//   },

const make_mapStateToProps = () => {
  const make_get_dataSourceTemplates = mySelectors.make_get_dataSourceTemplates(),
        make_get_badgeValueOfTemplates = mySelectors.make_get_badgeValueOfTemplates(),
        make_get_dataSourceForHome_SortByInstances = mySelectors.make_get_dataSourceForHome_SortByInstances();
  const mapStateToProps = (state, ownProps) => ({
    state: {
      templatesLength: state.normalizeReducer.result.templates.length,
      // dataSourceTemplates: make_get_dataSourceTemplates(state.normalizeReducer.entities),
      dataSourceForHome_SortByInstances: make_get_dataSourceForHome_SortByInstances(state.normalizeReducer.entities),
      badgeValueOfTemplates: make_get_badgeValueOfTemplates(state.normalizeReducer.entities),
      instances: state.normalizeReducer.entities.instances,
      templates: state.normalizeReducer.entities.templates
    },
    route: ownProps.route,
    navigator: ownProps.navigator
  })
  return mapStateToProps
}

export default connect(make_mapStateToProps)(HomeComponent)
