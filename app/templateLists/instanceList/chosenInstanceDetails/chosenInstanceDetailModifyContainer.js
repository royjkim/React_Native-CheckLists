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

const mapStateToProps = (state, ownProps) => {
  const normalizeReducer = state.normalizeReducer,
        entities = normalizeReducer.entities,
        configReducer = state.configReducer,
        passProps = ownProps.route.passProps,
        chosenInstance = passProps.chosenInstance,
        existOrNot_chosenTemplate = mySelectors.make_get_existOrNot_chosenTemplate()(entities.templates, chosenInstance.template);
        existOrNot_chosenInstance = mySelectors.make_get_existOrNot_chosenInstance()(entities.instances, chosenInstance.instanceId);
  return {
    // itemsCustomizedOfChosenInstanceArray: mySelectors.make_get_itemsCustomizedOfChosenInstance()(state.normalizeReducer, chosenInstance),
    itemsCustomizedOfChosenInstanceObject: existOrNot_chosenInstance ? mySelectors.make_get_itemsCustomizedOfChosenInstance()(state.normalizeReducer, chosenInstance) : {},
    statusPicker: configReducer.picker,
    navigatePrevent: configReducer.navigatePrevent,
    triedNavigateWhenPrevented: configReducer.triedNavigateWhenPrevented,
    chosenTemplate: existOrNot_chosenTemplate ? entities.templates[chosenInstance.template] : {},
    // chosenTemplate: entities.templates.hasOwnProperty(chosenInstance.template) ? entities.templates[chosenInstance.template] : {},
    lastId: normalizeReducer.lastId,
    chosenInstance: existOrNot_chosenInstance ? chosenInstance : {},
    existOrNot_chosenTemplate,
    existOrNot_chosenInstance,
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
  ...stateProps,
  dataSourceItemsCustomizedOfChosenInstance: mySelectors.make_get_dataSourceItemsOfChosenInstance()(stateProps.itemsCustomizedOfChosenInstanceObject, stateProps.statusPicker),
  // itemsCustomizedObjectOfChosenInstanceObject: ((tempResult = {}) => {
  //   stateProps.itemsCustomizedOfChosenInstanceArray.map(value => tempResult[value.itemCustomizedId] = { ...value })
  //   return tempResult
  // })(),
  // lastOrderNum: stateProps.itemsCustomizedOfChosenInstanceArray.length > 0 ? stateProps.itemsCustomizedOfChosenInstanceArray.slice(-1)[0].orderNum : 0,
  lastOrderNum: stateProps.existOrNot_chosenInstance ? Object.values(stateProps.itemsCustomizedOfChosenInstanceObject).sort((data1, data2) => data2.orderNum - data1.orderNum)[0].orderNum || 0 : 0,
  // tempResult.sort((data1, data2) => data1.orderNum - data2.orderNum);
  ...dispatchProps
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps, { pure: false })(ChosenInstanceDetailModifyComponent)
