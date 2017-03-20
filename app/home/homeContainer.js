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
  const make_get_dataSourceTemplates = mySelectors.make_get_dataSourceTemplates()
  const make_get_badgeValueOfTemplates = mySelectors.make_get_badgeValueOfTemplates()
  const mapStateToProps = (state, ownProps) => {
    console.log(`homeContainer - mapStateToProps - state : ${JSON.stringify(state, null, 1)}`)
    // const state = state.normalizeReducer
    return {
      state: {
        templatesLength: state.normalizeReducer.result.templates.length,
        dataSourceTemplates: make_get_dataSourceTemplates(state.normalizeReducer.entities),
        badgeValueOfTemplates: make_get_badgeValueOfTemplates(state.normalizeReducer.entities)
      },
      route: ownProps.route,
      navigator: ownProps.navigator
      // dataState: {
      //   // ...state.originaldataReducer.entities,
      //   templatesLength : state.originaldataReducer.result.templateList.length,
      //   dataSourceTemplates: make_get_dataSourceTemplates(state.originaldataReducer),
      //   // dataSourceCustomerList: make_get_chosenTemplate_of_dataSourceInstances(state.originaldataReducer),
      //   badgeValueOfTemplates: make_get_badgeValueOfTemplates(state.originaldataReducer),
      // },
      // route: ownProps.route,
      // navigator: ownProps.navigator
    }
  }
  return mapStateToProps
}
// const mapStateToProps = (state, ownProps) => {
//   // console.log(`homeContainer - mapStateToProps - state : ${JSON.stringify(state, null, 2)}`)
//   return {
//     // navigationState: state.navigationReducer,
//     dataState: {
//       ...state.originaldataReducer,
//       dataSourceTemplates: mySelectors.get_dataSourceTemplates(state.originaldataReducer),
//       badgeValueOfTemplates: mySelectors.get_badgeValueOfTemplates(state.originaldataReducer)
//       // dataSourceCustomerList: mySelectors.get_dataSourceCustomerList(state.originaldataReducer),
//       // dataSourceItemsOnEachTemplate: mySelectors.get_dataSourceItemsOnEachTemplate(state.originaldataReducer),
//       // dataSourceTemplateCategoryList: mySelectors.get_dataSourceTemplateCategoryList(state.originaldataReducer)
//     },
//     route: ownProps.route,
//     navigator: ownProps.navigator
//   }
// }

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   navigationActions: bindActionCreators(navigationActionCreators, dispatch)
// })

// export default connect(mapStateToProps)(HomeComponent)
export default connect(make_mapStateToProps)(HomeComponent)
