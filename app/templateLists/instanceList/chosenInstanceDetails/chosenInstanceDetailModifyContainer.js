import {
  changeStatusOfItemsCustomized,
  chooseCategory,
  navigatePrevent,
  triedNavigateWhenPrevented,
  modifyTemplate,
  modifyInstance,
  modifyItemsCustomized,
  addItemsCustomized,
  delInstance,
} from '../../../actions/dataActionCreators';
import ChosenInstanceDetailModifyComponent from './chosenInstanceDetailModifyComponent'
import { connect } from 'react-redux'
import mySelectors from '../../../container/selectors'

const make_mapStateToProps = () => (state, ownProps) => {
  const normalizeReducer = state.normalizeReducer,
        configReducer = state.configReducer,
        passProps = ownProps.route.passProps,
        chosenInstance = passProps.chosenInstance;
  return {
    itemsCustomizedOfChosenInstance: mySelectors.make_get_itemsCustomizedOfChosenInstance()(state.normalizeReducer, chosenInstance),
    statusPicker: configReducer.picker,
    navigatePrevent: configReducer.navigatePrevent,
    triedNavigateWhenPrevented: configReducer.triedNavigateWhenPrevented,
    chosenTemplate: normalizeReducer.entities.templates[chosenInstance.template],
    lastId: normalizeReducer.lastId,
    chosenInstance,
    parentTab: passProps.parentTab,
    route: ownProps.route,
    navigator: ownProps.navigator
  }
}

const mapDispatchToProps = dispatch => ({
  changeStatusOfItemsCustomized: targetData => dispatch(changeStatusOfItemsCustomized(targetData)),
  chooseCategory: category => dispatch(chooseCategory(category)),
  navigatePreventFn: (routeTitle, statusBoolean) => dispatch(navigatePrevent(routeTitle, statusBoolean)),
  triedNavigateWhenPreventedFn: (__navigatorRouteID, statusBoolean) => dispatch(triedNavigateWhenPrevented(__navigatorRouteID, statusBoolean)),
  modifyTemplate: (targetTemplateId, data) => dispatch(modifyTemplate(targetTemplateId, data)),
  modifyInstance: (targetInstanceId, data) => dispatch(modifyInstance(targetInstanceId, data)),
  modifyItemsCustomized: targetData => dispatch(modifyItemsCustomized(targetData)),
  addItemsCustomized: (lastId, newData) => dispatch(addItemsCustomized(lastId, newData)),
  delInstance: targetData => dispatch(delInstance(targetData))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  // state: {
  ...stateProps,
  dataSourceItemsCustomizedOfChosenInstance: mySelectors.make_get_dataSourceItemsOfChosenInstance()(stateProps.itemsCustomizedOfChosenInstance, stateProps.statusPicker),
  // countsOfStatusCompleted: mySelectors.make_get_badgeValueOfStatusOfChosenInstance()(stateProps.itemsCustomizedOfChosenInstance),
  // itemsCustomizedLength: stateProps.itemsCustomizedOfChosenInstance.length,
  itemsCustomizedObjectOfChosenInstance: ((tempResult = {}) => {
    stateProps.itemsCustomizedOfChosenInstance.map(value => tempResult[value.itemCustomizedId] = { ...value })
    return tempResult
  })(),
  lastOrderNum: stateProps.itemsCustomizedOfChosenInstance.length > 0 ? stateProps.itemsCustomizedOfChosenInstance.slice(-1)[0].orderNum : 0,
  // },
  ...dispatchProps
})

export default connect(make_mapStateToProps, mapDispatchToProps, mergeProps)(ChosenInstanceDetailModifyComponent)
