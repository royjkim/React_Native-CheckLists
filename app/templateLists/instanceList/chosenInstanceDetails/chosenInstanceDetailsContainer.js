import {
  changeStatusOfItemsCustomized,
  chooseCategory,
} from '../../../actions/dataActionCreators';
import ChosenInstanceDetailsComponent from './chosenInstanceDetailsComponent'
import { connect } from 'react-redux'
import mySelectors from '../../../container/selectors'

const mapStateToProps = (state, ownProps) => {
  const entities = state.normalizeReducer.entities,
        configReducer = state.configReducer,
        chosenInstance = ownProps.route.passProps.chosenInstance,
        existOrNot_chosenTemplate = mySelectors.make_get_existOrNot_chosenTemplate()(entities.templates, chosenInstance.template);
        existOrNot_chosenInstance = mySelectors.make_get_existOrNot_chosenInstance()(entities.instances, chosenInstance.instanceId);
  return {
    chosenTemplate: existOrNot_chosenTemplate ? entities.templates[chosenInstance.template] : {},
    chosenInstance,
    itemsCustomizedOfChosenInstanceObject: mySelectors.make_get_itemsCustomizedOfChosenInstance()(state.normalizeReducer, chosenInstance),
    statusPicker: configReducer.picker,
    existOrNot_chosenTemplate,
    // existOrNot_chosenInstance: entities.instances.hasOwnProperty(chosenInstance.instanceId),
    existOrNot_chosenInstance,
    route: ownProps.route,
    navigator: ownProps.navigator
  }
}

const mapDispatchToProps = dispatch => ({
  changeStatusOfItemsCustomized: targetData => dispatch(changeStatusOfItemsCustomized(targetData)),
  chooseCategory: (__navigatorRouteID, pickerValue) => dispatch(chooseCategory(__navigatorRouteID, pickerValue))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const itemsCustomizedOfChosenInstanceObject = stateProps.itemsCustomizedOfChosenInstanceObject;
  return {
    ...ownProps,
    ...stateProps,
    // dataSourceItemsCustomizedOfChosenInstance: mySelectors.make_get_dataSourceItemsOfChosenInstance()(stateProps.itemsCustomizedOfChosenInstance, stateProps.statusPicker),
    dataSourceItemsCustomizedOfChosenInstance: mySelectors.make_get_dataSourceItemsOfChosenInstance()(itemsCustomizedOfChosenInstanceObject, stateProps.statusPicker[stateProps.route.__navigatorRouteID]),
    countsOfStatusCompleted: mySelectors.make_get_badgeValueOfStatusOfChosenInstance()(Object.values(itemsCustomizedOfChosenInstanceObject)),
    itemsCustomizedLength: Object.keys(itemsCustomizedOfChosenInstanceObject).length,
    ...dispatchProps
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps, { pure: false })(ChosenInstanceDetailsComponent)
