import InstanceListComponent from './instanceListComponent'
import { connect } from 'react-redux'
import mySelectors from '../../container/selectors'
import {
  searchBarText,
  navigatePrevent,
  triedNavigateWhenPrevented,
  addItem,
  addInstance,
} from '../../actions/dataActionCreators'

const mapStateToProps = (state, ownProps) => {
  const normalizeReducer = state.normalizeReducer,
        entities = normalizeReducer.entities,
        chosenTemplate = ownProps.route.passProps.chosenTemplate,
        existOrNot_chosenTemplate = mySelectors.make_get_existOrNot_chosenTemplate()(entities.templates, chosenTemplate.templateId);
  return {
    instancesOfChosenTemplate: mySelectors.make_get_instancesOfChosenTemplate()(normalizeReducer, chosenTemplate),
    itemsCustomized: entities.itemsCustomized,
    itemsOfChosenTemplate: mySelectors.make_get_itemsOfChosenTemplate()(normalizeReducer, chosenTemplate),
    dataSourceTemplates: mySelectors.make_get_dataSourceTemplates()(normalizeReducer),
    lastId: normalizeReducer.lastId,
    existOrNot_chosenTemplate,
    chosenTemplate,
    route: ownProps.route,
    navigator: ownProps.navigator
  }
}

const mapDispatchToProps = dispatch => ({
  searchBarText: (searchText, attr) => dispatch(searchBarText(searchText, attr)),
  addInstance: (lastId, newData) => dispatch(addInstance(lastId, newData))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  dataSourceInstancesOfChosenTemplate: mySelectors.make_get_dataSourceInstancesOfChosenTemplate()(stateProps.instancesOfChosenTemplate),
  // checkInstanceEmptyOrNot: stateProps.instancesOfChosenTemplate.length == 0,
  existOrNot_instancesOfChosenTemplate: stateProps.instancesOfChosenTemplate.length == 0,
  badgeValueOfStatusOfEachInstanceOfChosenTemplate: mySelectors.make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate()(stateProps.itemsCustomized, stateProps.instancesOfChosenTemplate),
  ...dispatchProps
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps, { pure: false })(InstanceListComponent)
