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

const make_mapStateToProps = () => (state, ownProps) => ({
  state: {
    instancesOfChosenTemplate: mySelectors.make_get_instancesOfChosenTemplate()(state.normalizeReducer, ownProps.route.passProps.chosenTemplate),
    itemsCustomized: state.normalizeReducer.entities.itemsCustomized,
    itemsOfChosenTemplate: mySelectors.make_get_itemsOfChosenTemplate()(state.normalizeReducer, ownProps.route.passProps.chosenTemplate),
    dataSourceTemplates: mySelectors.make_get_dataSourceTemplates()(state.normalizeReducer),
    lastId: state.normalizeReducer.lastId
  },
  route: ownProps.route,
  navigator: ownProps.navigator
})

const mapDispatchToProps = dispatch => ({
  searchBarText: (searchText, attr) => dispatch(searchBarText(searchText, attr)),
  addInstance: (lastId, newData) => dispatch(addInstance(lastId, newData))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  state: {
    ...stateProps.state,
    dataSourceInstancesOfChosenTemplate: mySelectors.make_get_dataSourceInstancesOfChosenTemplate()(stateProps.state.instancesOfChosenTemplate),
    badgeValueOfStatusOfEachInstanceOfChosenTemplate: mySelectors.make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate()(stateProps.state.itemsCustomized, stateProps.state.instancesOfChosenTemplate),
  },
  ...dispatchProps
})

export default connect(make_mapStateToProps, mapDispatchToProps, mergeProps)(InstanceListComponent)
