import {
  changeStatusOfItemsCustomized,
  chooseCategory,
  navigatePrevent,
  triedNavigateWhenPrevented,
  modifyTemplate,
  modifyInstance,
  modifyItemsCustomized
} from '../../../actions/dataActionCreators';
import ChosenInstanceDetailModifyComponent from './chosenInstanceDetailModifyComponent'
import { connect } from 'react-redux'
import mySelectors from '../../../container/selectors'

const make_mapStateToProps = () => (state, ownProps) => ({
  state: {
    itemsCustomizedOfChosenInstance: mySelectors.make_get_itemsCustomizedOfChosenInstance()(state.normalizeReducer, ownProps.route.passProps.chosenInstance),
    statusPicker: state.configReducer.picker,
    navigatePrevent: state.configReducer.navigatePrevent,
    triedNavigateWhenPrevented: state.configReducer.triedNavigateWhenPrevented,
    chosenTemplate: state.normalizeReducer.entities.templates[ownProps.route.passProps.chosenInstance.template],
    lastId: state.normalizeReducer.lastId,
  },
  route: ownProps.route,
  navigator: ownProps.navigator
})

const mapDispatchToProps = dispatch => ({
  changeStatusOfItemsCustomized: targetData => dispatch(changeStatusOfItemsCustomized(targetData)),
  chooseCategory: category => dispatch(chooseCategory(category)),
  navigatePreventFn: (routeTitle, statusBoolean) => dispatch(navigatePrevent(routeTitle, statusBoolean)),
  triedNavigateWhenPreventedFn: (__navigatorRouteID, statusBoolean) => dispatch(triedNavigateWhenPrevented(__navigatorRouteID, statusBoolean)),
  modifyTemplate: (targetTemplateId, data) => dispatch(modifyTemplate(targetTemplateId, data)),
  modifyInstance: (targetInstanceId, data) => dispatch(modifyInstance(targetInstanceId, data)),
  modifyItemsCustomized: targetData => dispatch(modifyItemsCustomized(targetData))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  state: {
    ...stateProps.state,
    dataSourceItemsCustomizedOfChosenInstance: mySelectors.make_get_dataSourceItemsOfChosenInstance()(stateProps.state.itemsCustomizedOfChosenInstance, stateProps.state.statusPicker),
    countsOfStatusCompleted: mySelectors.make_get_badgeValueOfStatusOfChosenInstance()(stateProps.state.itemsCustomizedOfChosenInstance),
    itemsCustomizedLength: stateProps.state.itemsCustomizedOfChosenInstance.length,
    itemsCustomizedObjectOfChosenInstance: ((tempResult = {}) => {
      stateProps.state.itemsCustomizedOfChosenInstance.map(value => tempResult[value.itemCustomizedId] = { ...value })
      return tempResult
    })()
  },
  ...dispatchProps
})

export default connect(make_mapStateToProps, mapDispatchToProps, mergeProps)(ChosenInstanceDetailModifyComponent)
