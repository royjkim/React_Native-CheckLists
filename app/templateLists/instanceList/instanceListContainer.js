import InstanceListComponent from './instanceListComponent'
import { connect } from 'react-redux'
import mySelectors from '../../container/selectors'
import { searchBarTextInstancesOfChosenTemplate, searchBarTextItemsOfChosenTemplate } from '../../actions/dataActionCreators'

const make_mapStateToProps = () => (state, ownProps) => ({
  state: {
    // dataSourceInstancesOfChosenTemplate: make_get_dataSourceInstancesOfChosenTemplate(state.normalizeReducer.entities, ownProps.route.passProps.chosenTemplate),
    instancesOfChosenTemplate: mySelectors.make_get_instancesOfChosenTemplate()(state.normalizeReducer, ownProps.route.passProps.chosenTemplate),
    // itemsCustomized: {
    //   ...state.normalizeReducer.entities.itemsCustomized
    // },
    itemsCustomized: state.normalizeReducer.entities.itemsCustomized,
    itemsOfChosenTemplate: mySelectors.make_get_itemsOfChosenTemplate()(state.normalizeReducer, ownProps.route.passProps.chosenTemplate)
    // badgeValueOfStatusOfEachInstanceOfChosenTemplate: make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate(state.normalizeReducer.entities, ownProps.route.passProps.chosenTemplate)
  },
  route: ownProps.route,
  navigator: ownProps.navigator
})

const mapDispatchToProps = dispatch => ({
  searchBarTextInstancesOfChosenTemplate: searchBarText => dispatch(searchBarTextInstancesOfChosenTemplate(searchBarText)),
  searchBarTextItemsOfChosenTemplate: searchBarText => dispatch(searchBarTextItemsOfChosenTemplate(searchBarText))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  state: {
    ...stateProps.state,
    dataSourceInstancesOfChosenTemplate: mySelectors.make_get_dataSourceInstancesOfChosenTemplate()(stateProps.state.instancesOfChosenTemplate),
    dataSourceOfItemsOfChosenTemplate: mySelectors.make_get_dataSourceOfItemsOfChosenTemplate()(stateProps.state.itemsOfChosenTemplate),
    // itemsCustomizedOfChosenTemplate: mySelectors.make_get_itemsCustomizedOfEachInstanceOfChosenTemplate()(stateProps.state.itemsCustomized, stateProps.state.instancesOfChosenTemplate),
    badgeValueOfStatusOfEachInstanceOfChosenTemplate: mySelectors.make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate()(stateProps.state.itemsCustomized, stateProps.state.instancesOfChosenTemplate),
    itemsLengthOfChosenTemplate: stateProps.state.itemsOfChosenTemplate.length
  },
  ...dispatchProps
})

export default connect(make_mapStateToProps, mapDispatchToProps, mergeProps)(InstanceListComponent)
