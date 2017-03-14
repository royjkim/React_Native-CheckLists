import React from 'react'
// import { ListView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as dataActionCreators from '../actions/dataActionCreators'
import MyTabs from '../components/myTabs'

import Reactotron from 'reactotron-react-native'

import mySelectors from './selectors'

export default connect(state => {
  // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  console.log(`rootContainer - mapStateToProps - state : ${JSON.stringify(state, null, 3)}`)
  return {
    dataState: {
      ...state.dataReducer,
      dataSourceTemplateList: mySelectors.get_dataSourceTemplateList(state.dataReducer),
      dataSourceCustomerList: mySelectors.get_dataSourceCustomerList(state.dataReducer),
      dataSourceItemsOnEachTemplate: mySelectors.get_dataSourceItemsOnEachTemplate(state.dataReducer),
      dataSourceTemplateCategoryList: mySelectors.get_dataSourceTemplateCategoryList(state.dataReducer)
      // dataSourceTemplateList: ds.cloneWithRows(state.reducers.templateList),
      // // BadgeValueOfTemplateList = state.reducers.customerList.filter((element, index, array) => index == array.findIndex(data => data.templateTitle == element.templateTitle))
      // dataSourceCustomerList: ds.cloneWithRows(state.reducers.customerList),
      // dataSourceItemsOnEachTemplate: ds.cloneWithRows(state.reducers.itemsOnEachTemplate),
      // dataSourceTemplateCategoryList: ds.cloneWithRows(state.reducers.templateCategoryList)
    }
  }
}, dispatch => ({
  actions: bindActionCreators(dataActionCreators, dispatch)
}))(MyTabs)


// export default connect(state => ({
//   state: state.reducers,
//   ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
// }), dispatch => ({
//   actions: bindActionCreators(actionCreators, dispatch)
// }))(MyTabs)
