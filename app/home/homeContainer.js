import React from 'react'
import { connect } from 'react-redux'
import HomeComponent from './homeComponent'
import { bindActionCreators } from 'redux'

import mySelectors from '../container/selectors'
import Reactotron from 'reactotron-react-native'

const make_mapStateToProps = () => {
  const make_get_dataSourceTemplateList = mySelectors.make_get_dataSourceTemplateList()
  const make_get_badgeValueOfTemplateList = mySelectors.make_get_badgeValueOfTemplateList()
  const mapStateToProps = (state, ownProps) => {
    return {
      dataState: {
        ...state.dataReducer,
        dataSourceTemplateList: make_get_dataSourceTemplateList(state.dataReducer),
        badgeValueOfTemplateList: make_get_badgeValueOfTemplateList(state.dataReducer)
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
//       ...state.dataReducer,
//       dataSourceTemplateList: mySelectors.get_dataSourceTemplateList(state.dataReducer),
//       badgeValueOfTemplateList: mySelectors.get_badgeValueOfTemplateList(state.dataReducer)
//       // dataSourceCustomerList: mySelectors.get_dataSourceCustomerList(state.dataReducer),
//       // dataSourceItemsOnEachTemplate: mySelectors.get_dataSourceItemsOnEachTemplate(state.dataReducer),
//       // dataSourceTemplateCategoryList: mySelectors.get_dataSourceTemplateCategoryList(state.dataReducer)
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
