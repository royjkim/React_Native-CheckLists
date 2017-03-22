// import * as dataActionCreators from '../../../actions/dataActionCreators'
import { modifyItemsCustomized } from '../../../actions/dataActionCreators'
import ChosenInstanceDetailsComponent from './chosenInstanceDetailsComponent'

import { bindActionCreators } from 'redux'
// import { modifyItemsCustomized } from '../../../actions/dataActionCreators'
// import '../../../actions/dataActionCreators'
import { connect } from 'react-redux'


import mySelectors from '../../../container/selectors'

const make_mapStateToProps = () => {
  const make_get_ItemsCustomizedOfChosenInstance = mySelectors.make_get_ItemsCustomizedOfChosenInstance()
  // const make_get_dataSourceItemsOfChosenInstance = mySelectors.make_get_dataSourceItemsOfChosenInstance()
  const mapStateToProps = (state, ownProps) => {
    // console.log(`instanceListContainer - mapStateToProps - state : ${JSON.stringify(state, null, 1)}`)
    // console.log(`chosen - container - ownProps.route.passProps.chosenInstance : ${JSON.stringify(ownProps.route.passProps.chosenInstance, null, 1)}`)
    console.log(`mapStateToProps - state.normalizeReducer.entities.templates[ownProps.route.passProps.chosenInstance.template]`)
    console.log(state.normalizeReducer.entities.templates[ownProps.route.passProps.chosenInstance.template])
    // console.log(`${JSON.stringify(state.normalizeReducer.entities.templates[ownProps.route.passProps.chosenInstance.template], null, 1)}`)
    return {
      state: {
        chosenTemplate: {
          ...state.normalizeReducer.entities.templates[ownProps.route.passProps.chosenInstance.template]
        },
        get_ItemsCustomizedOfChosenInstance: make_get_ItemsCustomizedOfChosenInstance(state.normalizeReducer.entities, ownProps.route.passProps.chosenInstance)
        // dataSourceItemsCustomizedOfChosenInstance: make_get_dataSourceItemsOfChosenInstance(state.normalizeReducer.entities, ownProps.route.passProps.chosenInstance)
      },
      route: ownProps.route,
      navigator: ownProps.navigator
    }
  }
  return mapStateToProps
}

// console.log(`dataActionCreators : ${JSON.stringify(dataActionCreators, null, 1)}`)
const mapDispatchToProps = dispatch => {
  return {
    modifyItemsCustomized: targetData => dispatch(modifyItemsCustomized(targetData))
  }
}

// const make_mergeProps = () => {
//   const mergeProps = (stateProps, dispatchProps, ownProps) => {
//     return {
//       ...ownProps,
//       ...stateProps,
//       ...dispatchProps
//     }
//   }
//   return mergeProps
// }

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  // console.log(`mergeProps - stateProps : ${JSON.stringify(stateProps, null, 1)}`)
  // console.log('mergeProps - stateProps : ', stateProps)
  // console.log('mergeProps - stateProps.state.chosenTemplate : ', stateProps.state.chosenTemplate)
  // console.log('mergeProps - dispatchProps : ', dispatchProps)
  // console.log('stateProps.state.get_ItemsCustomizedOfChosenInstance : ', stateProps.state.get_ItemsCustomizedOfChosenInstance)
  const make_get_dataSourceItemsOfChosenInstance = mySelectors.make_get_dataSourceItemsOfChosenInstance()
  const get_countsOfStatusCompleted = mySelectors.get_countsOfStatusCompleted()
  return {
    ...ownProps,
    state: {
      ...stateProps.state,
      dataSourceItemsCustomizedOfChosenInstance: make_get_dataSourceItemsOfChosenInstance(stateProps.state.get_ItemsCustomizedOfChosenInstance),
      countsOfStatusCompleted: get_countsOfStatusCompleted(stateProps.state.get_ItemsCustomizedOfChosenInstance)
    },
    ...dispatchProps
  }
}

export default connect(make_mapStateToProps, mapDispatchToProps, mergeProps)(ChosenInstanceDetailsComponent)
