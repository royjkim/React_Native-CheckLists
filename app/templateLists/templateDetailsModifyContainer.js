import TemplateDetailsModifyComponent from './templateDetailsModifyComponent'
import { connect } from 'react-redux'
import mySelectors from '../container/selectors'
import {
  searchBarText,
  navigatePrevent,
  triedNavigateWhenPrevented,
  addItem,
  modifyItem,
  modifyTemplate,
  delTemplate,
} from '../actions/dataActionCreators'

const make_mapStateToProps = () => (state, ownProps) => {
  const normalizeReducer = state.normalizeReducer,
        { entities, lastId } = normalizeReducer,
        configReducer = state.configReducer,
        chosenTemplate = ownProps.route.passProps.chosenTemplate,
        existOrNot_chosenTemplate = entities.templates.hasOwnProperty(chosenTemplate.templateId);

  return {
    // instancesOfChosenTemplate: existOrNot_chosenTemplate ? mySelectors.make_get_instancesOfChosenTemplate()(normalizeReducer, chosenTemplate) : [],
    length_instancesOfChosenTemplate: existOrNot_chosenTemplate ? chosenTemplate.instances.length : 0,
    itemsCustomized: entities.itemsCustomized,
    itemsOfChosenTemplate: existOrNot_chosenTemplate ? mySelectors.make_get_itemsOfChosenTemplate()(normalizeReducer, entities.templates[chosenTemplate.templateId]) : [],
    navigatePrevent: configReducer.navigatePrevent,
    triedNavigateWhenPrevented: configReducer.triedNavigateWhenPrevented,
    lastId,
    chosenTemplate,
    last_orderNum: existOrNot_chosenTemplate ? mySelectors.make_get_last_orderNum()(normalizeReducer, chosenTemplate) : 0,
    existOrNot_chosenTemplate,
    route: ownProps.route,
    navigator: ownProps.navigator
  }
}

const mapDispatchToProps = dispatch => ({
  searchBarText: (searchText, attr) => dispatch(searchBarText(searchText, attr)),
  navigatePreventFn: (__navigatorRouteID, statusBoolean) => dispatch(navigatePrevent(__navigatorRouteID, statusBoolean)),
  triedNavigateWhenPreventedFn: (parentTab, statusBoolean) => dispatch(triedNavigateWhenPrevented(parentTab, statusBoolean)),
  addItem: (lastId, newData, targetTemplateId) => dispatch(addItem(lastId, newData, targetTemplateId)),
  modifyItem: (targetId, data) => dispatch(modifyItem(targetId, data)),
  modifyTemplate: (targetTemplateId, data) => dispatch(modifyTemplate(targetTemplateId, data)),
  delTemplate: targetData => dispatch(delTemplate(targetData))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  dataSourceOfItemsOfChosenTemplate: mySelectors.make_get_dataSourceOfItemsOfChosenTemplate()(stateProps.itemsOfChosenTemplate),
  itemsLengthOfChosenTemplate: stateProps.itemsOfChosenTemplate.length,
  ...dispatchProps
})

export default connect(make_mapStateToProps, mapDispatchToProps, mergeProps)(TemplateDetailsModifyComponent)
