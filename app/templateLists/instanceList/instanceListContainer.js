import InstanceListComponent from './instanceListComponent'
import { connect } from 'react-redux'
import mySelectors from '../../container/selectors'

const make_mapStateToProps = () => (state, ownProps) => ({
  state: {
    // dataSourceInstancesOfChosenTemplate: make_get_dataSourceInstancesOfChosenTemplate(state.normalizeReducer.entities, ownProps.route.passProps.chosenTemplate),
    instancesOfChosenTemplate: mySelectors.make_get_instancesOfChosenTemplate()(state.normalizeReducer.entities, ownProps.route.passProps.chosenTemplate),
    itemsCustomized: {
      ...state.normalizeReducer.entities.itemsCustomized
    }
    // badgeValueOfStatusOfEachInstanceOfChosenTemplate: make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate(state.normalizeReducer.entities, ownProps.route.passProps.chosenTemplate)
  },
  route: ownProps.route,
  navigator: ownProps.navigator
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  state: {
    ...stateProps.state,
    dataSourceInstancesOfChosenTemplate: mySelectors.make_get_dataSourceInstancesOfChosenTemplate()(stateProps.state.instancesOfChosenTemplate),
    // itemsCustomizedOfChosenTemplate: mySelectors.make_get_itemsCustomizedOfEachInstanceOfChosenTemplate()(stateProps.state.itemsCustomized, stateProps.state.instancesOfChosenTemplate),
    badgeValueOfStatusOfEachInstanceOfChosenTemplate: mySelectors.make_get_badgeValueOfStatusOfEachInstanceOfChosenTemplate()(stateProps.state.itemsCustomized, stateProps.state.instancesOfChosenTemplate)
  },
  ...dispatchProps
})

export default connect(make_mapStateToProps, null, mergeProps)(InstanceListComponent)
