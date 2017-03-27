import { modifyItemsCustomized } from '../../../actions/dataActionCreators'
import ChosenInstanceDetailsComponent from './chosenInstanceDetailsComponent'
import { connect } from 'react-redux'
import mySelectors from '../../../container/selectors'

const make_mapStateToProps = () => (state, ownProps) => ({
  state: {
    chosenTemplate: {
      ...state.normalizeReducer.entities.templates[ownProps.route.passProps.chosenInstance.template]
    },
    get_ItemsCustomizedOfChosenInstance: mySelectors.make_get_itemsCustomizedOfChosenInstance()(state.normalizeReducer, ownProps.route.passProps.chosenInstance)
    // dataSourceItemsCustomizedOfChosenInstance: make_get_dataSourceItemsOfChosenInstance(state.normalizeReducer.entities, ownProps.route.passProps.chosenInstance)
  },
  route: ownProps.route,
  navigator: ownProps.navigator
})

const mapDispatchToProps = dispatch => ({
  modifyItemsCustomized: targetData => dispatch(modifyItemsCustomized(targetData))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  state: {
    ...stateProps.state,
    dataSourceItemsCustomizedOfChosenInstance: mySelectors.make_get_dataSourceItemsOfChosenInstance()(stateProps.state.get_ItemsCustomizedOfChosenInstance),
    countsOfStatusCompleted: mySelectors.make_get_badgeValueOfStatusOfChosenInstance()(stateProps.state.get_ItemsCustomizedOfChosenInstance)
  },
  ...dispatchProps
})

export default connect(make_mapStateToProps, mapDispatchToProps, mergeProps)(ChosenInstanceDetailsComponent)
