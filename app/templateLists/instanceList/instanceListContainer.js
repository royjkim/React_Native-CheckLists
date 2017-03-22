import InstanceListComponent from './instanceListComponent'
import { connect } from 'react-redux'
import mySelectors from '../../container/selectors'

const make_mapStateToProps = () => {
  const make_get_instancesOfChosenTemplate = mySelectors.make_get_instancesOfChosenTemplate();
  const mapStateToProps = (state, ownProps) => {
    // console.log(`instanceListContainer - mapStateToProps - state.normalizeReducer.entities : ${JSON.stringify(state.normalizeReducer.entities, null, 1)}`)
    // console.log(`instnaceListContainer - ownProps.route.passProps.chosenTemplate : ${JSON.stringify(ownProps.route.passProps.chosenTemplate, null, 1)}`)
    return {
      state: {
        // dataSourceInstancesOfChosenTemplate: make_get_chosenTemplate_of_dataSourceInstancesOfChosenTemplate(state.normalizeReducer.entities, ownProps.route.passProps.chosenTemplate),
        instancesOfChosenTemplate: make_get_instancesOfChosenTemplate(state.normalizeReducer.entities, ownProps.route.passProps.chosenTemplate),
        itemsCustomized: {
          ...state.normalizeReducer.entities.itemsCustomized
        }
        // badgeValueOfItemsOfEachInstanceOfChosenTemplate: make_get_badgeValueOfItemsOfEachInstanceOfChosenTemplate(state.normalizeReducer.entities, ownProps.route.passProps.chosenTemplate)
      },
      route: ownProps.route,
      navigator: ownProps.navigator
    }
  }
  return mapStateToProps
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const make_get_chosenTemplate_of_dataSourceInstancesOfChosenTemplate = mySelectors.make_get_chosenTemplate_of_dataSourceInstancesOfChosenTemplate(),
        // make_get_itemsCustomizedOfEachInstanceOfChosenTemplate = mySelectors.make_get_itemsCustomizedOfEachInstanceOfChosenTemplate();
        make_get_badgeValueOfItemsOfEachInstanceOfChosenTemplate = mySelectors.make_get_badgeValueOfItemsOfEachInstanceOfChosenTemplate();
  // console.log('mergeProps - stateProps : ', stateProps)
  return {
    ...ownProps,
    state: {
      ...stateProps.state,
      dataSourceInstancesOfChosenTemplate: make_get_chosenTemplate_of_dataSourceInstancesOfChosenTemplate(stateProps.state.instancesOfChosenTemplate),
      // itemsCustomizedOfChosenTemplate: make_get_itemsCustomizedOfEachInstanceOfChosenTemplate(stateProps.state.itemsCustomized, stateProps.state.instancesOfChosenTemplate),
      badgeValueOfItemsOfEachInstanceOfChosenTemplate: make_get_badgeValueOfItemsOfEachInstanceOfChosenTemplate(stateProps.state.itemsCustomized, stateProps.state.instancesOfChosenTemplate)
    },
    ...dispatchProps
  }
}
export default connect(make_mapStateToProps, null, mergeProps)(InstanceListComponent)
