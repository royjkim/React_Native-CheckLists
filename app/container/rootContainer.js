import React from 'react'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import * as dataActionCreators from '../actions/dataActionCreators'
// import * as navigationActionCreators from '../actions/navigationActionCreators'
import MyTabs from '../components/myTabs'

// import Reactotron from 'reactotron-react-native'
//
// import mySelectors from './selectors'

// export default connect(state => {
//   // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
//   console.log(`rootContainer - mapStateToProps - state : ${JSON.stringify(state, null, 3)}`)
//   return {
//     // dataState: {
//     //   ...state.originaldataReducer,
//     //   dataSourceTemplateList: mySelectors.get_dataSourceTemplateList(state.originaldataReducer),
//     //   dataSourceCustomerList: mySelectors.get_dataSourceCustomerList(state.originaldataReducer),
//     //   dataSourceItemsOnEachTemplate: mySelectors.get_dataSourceItemsOnEachTemplate(state.originaldataReducer),
//     //   dataSourceTemplateCategoryList: mySelectors.get_dataSourceTemplateCategoryList(state.originaldataReducer)
//     //   // // BadgeValueOfTemplateList = state.reducers.customerList.filter((element, index, array) => index == array.findIndex(data => data.templateTitle == element.templateTitle))
//     // },
//     navigationState: state.navigationReducer
//   }
// }, dispatch => ({
//   // dataActions: bindActionCreators(dataActionCreators, dispatch),
//   navigationActions: bindActionCreators(navigationActionCreators, dispatch)
// }))(MyTabs)

export default MyTabs

// export default connect(state => ({
//   state: state.reducers,
//   ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
// }), dispatch => ({
//   actions: bindActionCreators(actionCreators, dispatch)
// }))(MyTabs)
