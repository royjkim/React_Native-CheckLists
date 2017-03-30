import { modifyItemsCustomized, chooseCategory, navigatePrevent, triedNavigateWhenPrevented } from '../../../actions/dataActionCreators'
import ChosenInstanceDetailsComponent from './chosenInstanceDetailsComponent'
import { connect } from 'react-redux'
import mySelectors from '../../../container/selectors'

const make_mapStateToProps = () => (state, ownProps) => ({
  state: {
    chosenTemplate: {
      ...state.normalizeReducer.entities.templates[ownProps.route.passProps.chosenInstance.template]
    },
    itemsCustomizedOfChosenInstance: mySelectors.make_get_itemsCustomizedOfChosenInstance()(state.normalizeReducer, ownProps.route.passProps.chosenInstance),
    statusPicker: state.normalizeReducer.configValue.picker,
    navigatePrevent: state.normalizeReducer.configValue.navigatePrevent,
    triedNavigateWhenPrevented: state.normalizeReducer.configValue.triedNavigateWhenPrevented
  },
  route: ownProps.route,
  navigator: ownProps.navigator
})

const mapDispatchToProps = dispatch => ({
  modifyItemsCustomized: targetData => dispatch(modifyItemsCustomized(targetData)),
  chooseCategory: category => dispatch(chooseCategory(category)),
  navigatePrevent: (routeTitle, statusBoolean) => dispatch(navigatePrevent(routeTitle, statusBoolean)),
  triedNavigateWhenPrevented: (__navigatorRouteID, statusBoolean) => dispatch(triedNavigateWhenPrevented(__navigatorRouteID, statusBoolean))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  state: {
    ...stateProps.state,
    dataSourceItemsCustomizedOfChosenInstance: mySelectors.make_get_dataSourceItemsOfChosenInstance()(stateProps.state.itemsCustomizedOfChosenInstance, stateProps.state.statusPicker),
    countsOfStatusCompleted: mySelectors.make_get_badgeValueOfStatusOfChosenInstance()(stateProps.state.itemsCustomizedOfChosenInstance),
    itemsCustomizedLength: stateProps.state.itemsCustomizedOfChosenInstance.length
  },
  ...dispatchProps
})

export default connect(make_mapStateToProps, mapDispatchToProps, mergeProps)(ChosenInstanceDetailsComponent)
