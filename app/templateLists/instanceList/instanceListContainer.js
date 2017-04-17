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

const make_mapStateToProps = () => (state, ownProps) => {
  const normalizeReducer = state.normalizeReducer,
        chosenTemplate = ownProps.route.passProps.chosenTemplate;
  return {
    state: {
      instancesOfChosenTemplate: mySelectors.make_get_instancesOfChosenTemplate()(normalizeReducer, chosenTemplate),
      itemsCustomized: normalizeReducer.entities.itemsCustomized,
      itemsOfChosenTemplate: mySelectors.make_get_itemsOfChosenTemplate()(normalizeReducer, chosenTemplate),
      dataSourceTemplates: mySelectors.make_get_dataSourceTemplates()(normalizeReducer),
      lastId: normalizeReducer.lastId,
    },
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
  state: {
    ...stateProps.state,
    dataSourceInstancesOfChosenTemplate: mySelectors.make_get_dataSourceInstancesOfChosenTemplate()(stateProps.state.instancesOfChosenTemplate),
    checkInstanceEmptyOrNot: stateProps.state.instancesOfChosenTemplate.length == 0,
    badgeValueOfStatusOfEachInstanceOfChosenTemplate: mySelectors.make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate()(stateProps.state.itemsCustomized, stateProps.state.instancesOfChosenTemplate),
  },
  ...dispatchProps
})

export default connect(make_mapStateToProps, mapDispatchToProps, mergeProps)(InstanceListComponent)
