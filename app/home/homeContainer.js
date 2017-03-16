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
  const make_get_dataSourceTemplateList = mySelectors.make_get_dataSourceTemplateList()
  const make_get_badgeValueOfTemplateList = mySelectors.make_get_badgeValueOfTemplateList()
  const mapStateToProps = (state, ownProps) => {
    // console.log(`homeContainer - mapStateToProps - state : ${JSON.stringify(state, null, 1)}`)
    // const state = state.originaldataReducer
    return {
      dataState: {
        // ...state.originaldataReducer.entities,
        templateListLength : state.originaldataReducer.result.templateList.length,
        dataSourceTemplateList: make_get_dataSourceTemplateList(state.originaldataReducer),
        // dataSourceCustomerList: make_get_chosenTemplate_of_dataSourceInstanceList(state.originaldataReducer),
        badgeValueOfTemplateList: make_get_badgeValueOfTemplateList(state.originaldataReducer),
      },
      route: ownProps.route,
      navigator: ownProps.navigator
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
//       dataSourceTemplateList: mySelectors.get_dataSourceTemplateList(state.originaldataReducer),
//       badgeValueOfTemplateList: mySelectors.get_badgeValueOfTemplateList(state.originaldataReducer)
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
