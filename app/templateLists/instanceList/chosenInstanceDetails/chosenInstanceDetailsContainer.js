import { modifyItemsCustomized } from '../../../actions/dataActionCreators'
import ChosenInstanceDetailsComponent from './chosenInstanceDetailsComponent'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import mySelectors from '../../../container/selectors'

const make_mapStateToProps = () => {
  const make_get_ItemsCustomizedOfChosenInstance = mySelectors.make_get_ItemsCustomizedOfChosenInstance()
  // const make_get_dataSourceItemsOfChosenInstance = mySelectors.make_get_dataSourceItemsOfChosenInstance()
  const mapStateToProps = (state, ownProps) => {
    // console.log(`instanceListContainer - mapStateToProps - state : ${JSON.stringify(state, null, 1)}`)
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

const mapDispatchToProps = dispatch => {
  return {
    modifyItemsCustomized: targetData => dispatch(modifyItemsCustomized(targetData))
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const make_get_dataSourceItemsOfChosenInstance = mySelectors.make_get_dataSourceItemsOfChosenInstance()
  const make_get_badgeValueOfStatusOfChosenInstance = mySelectors.make_get_badgeValueOfStatusOfChosenInstance()
  return {
    ...ownProps,
    state: {
      ...stateProps.state,
      dataSourceItemsCustomizedOfChosenInstance: make_get_dataSourceItemsOfChosenInstance(stateProps.state.get_ItemsCustomizedOfChosenInstance),
      countsOfStatusCompleted: make_get_badgeValueOfStatusOfChosenInstance(stateProps.state.get_ItemsCustomizedOfChosenInstance)
    },
    ...dispatchProps
  }
}

export default connect(make_mapStateToProps, mapDispatchToProps, mergeProps)(ChosenInstanceDetailsComponent)
