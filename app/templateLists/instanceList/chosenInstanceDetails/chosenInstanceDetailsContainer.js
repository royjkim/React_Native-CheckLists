import {
  changeStatusOfItemsCustomized,
  chooseCategory,
  navigatePrevent,
  triedNavigateWhenPrevented,
  modifyTemplate,
  modifyInstance
} from '../../../actions/dataActionCreators';
import ChosenInstanceDetailsComponent from './chosenInstanceDetailsComponent'
import { connect } from 'react-redux'
import mySelectors from '../../../container/selectors'

const make_mapStateToProps = () => (state, ownProps) => ({
  state: {
    chosenTemplate: {
      ...state.normalizeReducer.entities.templates[ownProps.route.passProps.chosenInstance.template]
    },
    itemsCustomizedOfChosenInstance: mySelectors.make_get_itemsCustomizedOfChosenInstance()(state.normalizeReducer, ownProps.route.passProps.chosenInstance),
    statusPicker: state.configReducer.picker,
    navigatePrevent: state.configReducer.navigatePrevent,
    triedNavigateWhenPrevented: state.configReducer.triedNavigateWhenPrevented,
    existOrNot_chosenInstance: state.normalizeReducer.entities.instances.hasOwnProperty(ownProps.route.passProps.chosenInstance.instanceId)
  },
  route: ownProps.route,
  navigator: ownProps.navigator
})

const mapDispatchToProps = dispatch => ({
  changeStatusOfItemsCustomized: targetData => dispatch(changeStatusOfItemsCustomized(targetData)),
  chooseCategory: category => dispatch(chooseCategory(category)),
  navigatePreventFn: (routeTitle, statusBoolean) => dispatch(navigatePrevent(routeTitle, statusBoolean)),
  triedNavigateWhenPreventedFn: (__navigatorRouteID, statusBoolean) => dispatch(triedNavigateWhenPrevented(__navigatorRouteID, statusBoolean)),
  modifyTemplate: (targetTemplateId, data) => dispatch(modifyTemplate(targetTemplateId, data)),
  modifyInstance: (targetInstanceId, data) => dispatch(modifyInstance(targetInstanceId, data))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  state: {
    ...stateProps.state,
    dataSourceItemsCustomizedOfChosenInstance: mySelectors.make_get_dataSourceItemsOfChosenInstance()(stateProps.state.itemsCustomizedOfChosenInstance, stateProps.state.statusPicker),
    countsOfStatusCompleted: mySelectors.make_get_badgeValueOfStatusOfChosenInstance()(stateProps.state.itemsCustomizedOfChosenInstance),
    itemsCustomizedLength: stateProps.state.itemsCustomizedOfChosenInstance.length
  },
  ...dispatchProps
})

export default connect(make_mapStateToProps, mapDispatchToProps, mergeProps)(ChosenInstanceDetailsComponent)
