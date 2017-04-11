import TemplateDetailsComponent from './templateDetailsComponent'
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
        { configReducer } = state,
        { chosenTemplate } = ownProps.route.passProps,
        templateExistOrNot = entities.templates.hasOwnProperty(chosenTemplate.templateId);

  return {
    state: {
      instancesOfChosenTemplate: templateExistOrNot ? mySelectors.make_get_instancesOfChosenTemplate()(normalizeReducer, chosenTemplate) : [],
      itemsCustomized: entities.itemsCustomized,
      itemsOfChosenTemplate: templateExistOrNot ? mySelectors.make_get_itemsOfChosenTemplate()(normalizeReducer, entities.templates[chosenTemplate.templateId]) : [],
      navigatePrevent: configReducer.navigatePrevent,
      triedNavigateWhenPrevented: configReducer.triedNavigateWhenPrevented,
      lastId,
      chosenTemplate: chosenTemplate,
      last_orderNum: templateExistOrNot ? mySelectors.make_get_last_orderNum()(normalizeReducer, chosenTemplate) : 0,
      existOrNot_chosenTemplate: templateExistOrNot
      // existOrNot_chosenTemplate: entities.templates.hasOwnProperty(chosenTemplate.templateId)
    },
    route: ownProps.route,
    navigator: ownProps.navigator
  }
}

const mapDispatchToProps = dispatch => ({
  searchBarText: (searchText, attr) => dispatch(searchBarText(searchText, attr)),
  navigatePreventFn: (__navigatorRouteID, statusBoolean) => dispatch(navigatePrevent(__navigatorRouteID, statusBoolean)),
  triedNavigateWhenPreventedFn: (parentTab, statusBoolean) => dispatch(triedNavigateWhenPrevented(parentTab, statusBoolean)),
  addItem: (lastId, newData) => dispatch(addItem(lastId, newData)),
  modifyItem: (targetId, data) => dispatch(modifyItem(targetId, data)),
  modifyTemplate: (targetTemplateId, data) => dispatch(modifyTemplate(targetTemplateId, data)),
  delTemplate: targetData => dispatch(delTemplate(targetData))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  state: {
    ...stateProps.state,
    dataSourceOfItemsOfChosenTemplate: mySelectors.make_get_dataSourceOfItemsOfChosenTemplate()(stateProps.state.itemsOfChosenTemplate),
    itemsLengthOfChosenTemplate: stateProps.state.itemsOfChosenTemplate.length,
  },
  ...dispatchProps
})

export default connect(make_mapStateToProps, mapDispatchToProps, mergeProps)(TemplateDetailsComponent)
