import TemplateDetailsComponent from './templateDetailsComponent'
import { connect } from 'react-redux'
import mySelectors from '../container/selectors'
import { searchBarText, navigatePrevent, triedNavigateWhenPrevented, addItem } from '../actions/dataActionCreators'

const make_mapStateToProps = () => (state, ownProps) => ({
  state: {
    instancesOfChosenTemplate: mySelectors.make_get_instancesOfChosenTemplate()(state.normalizeReducer, ownProps.route.passProps.chosenTemplate),
    itemsCustomized: state.normalizeReducer.entities.itemsCustomized,
    itemsOfChosenTemplate: mySelectors.make_get_itemsOfChosenTemplate()(state.normalizeReducer, ownProps.route.passProps.chosenTemplate),
    navigatePrevent: state.configReducer.navigatePrevent,
    triedNavigateWhenPrevented: state.configReducer.triedNavigateWhenPrevented,
    lastId: state.normalizeReducer.lastId,
    chosenTemplate: ownProps.route.passProps.chosenTemplate,
    items: state.normalizeReducer.entities.items
  },
  route: ownProps.route,
  navigator: ownProps.navigator
})

const mapDispatchToProps = dispatch => ({
  searchBarText: (searchText, attr) => dispatch(searchBarText(searchText, attr)),
  navigatePreventFn: (__navigatorRouteID, statusBoolean) => dispatch(navigatePrevent(__navigatorRouteID, statusBoolean)),
  triedNavigateWhenPreventedFn: (parentTab, statusBoolean) => dispatch(triedNavigateWhenPrevented(parentTab, statusBoolean)),
  addItem: (lastId, newData) => dispatch(addItem(lastId, newData))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  state: {
    ...stateProps.state,
    dataSourceInstancesOfChosenTemplate: mySelectors.make_get_dataSourceInstancesOfChosenTemplate()(stateProps.state.instancesOfChosenTemplate),
    dataSourceOfItemsOfChosenTemplate: mySelectors.make_get_dataSourceOfItemsOfChosenTemplate()(stateProps.state.itemsOfChosenTemplate),
    badgeValueOfStatusOfEachInstanceOfChosenTemplate: mySelectors.make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate()(stateProps.state.itemsCustomized, stateProps.state.instancesOfChosenTemplate),
    itemsLengthOfChosenTemplate: stateProps.state.itemsOfChosenTemplate.length,
  },
  ...dispatchProps
})

export default connect(make_mapStateToProps, mapDispatchToProps, mergeProps)(TemplateDetailsComponent)
