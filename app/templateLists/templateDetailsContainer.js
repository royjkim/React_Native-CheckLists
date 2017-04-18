import TemplateDetailsComponent from './templateDetailsComponent';
import { connect } from 'react-redux';
import mySelectors from '../container/selectors';
import { searchBarText } from '../actions/dataActionCreators';
import { createSelector } from 'reselect';

const mapStateToProps = (state, ownProps) => {
  const entities = state.normalizeReducer.entities,
        chosenTemplate = ownProps.route.passProps.chosenTemplate,
        existOrNot_chosenTemplate = mySelectors.make_get_existOrNot_chosenTemplate()(entities.templates, chosenTemplate.templateId);
  return {
    length_instancesOfChosenTemplate: existOrNot_chosenTemplate ? chosenTemplate.instances.length : 0,
    itemsOfChosenTemplate: existOrNot_chosenTemplate ? mySelectors.make_get_itemsOfChosenTemplate()(state.normalizeReducer, entities.templates[chosenTemplate.templateId]) : [],
    chosenTemplate,
    existOrNot_chosenTemplate,
    route: ownProps.route,
    navigator: ownProps.navigator
  }
}

const mapDispatchToProps = dispatch => ({
  searchBarText: (searchText, attr) => dispatch(searchBarText(searchText, attr)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  dataSourceOfItemsOfChosenTemplate: mySelectors.make_get_dataSourceOfItemsOfChosenTemplate()(stateProps.itemsOfChosenTemplate),
  itemsLengthOfChosenTemplate: Object.keys(stateProps.itemsOfChosenTemplate).length,
  ...dispatchProps
})

// export default connect(make_mapStateToProps, mapDispatchToProps, mergeProps)(TemplateDetailsComponent)
export default connect(mapStateToProps, mapDispatchToProps, mergeProps, { pure: false })(TemplateDetailsComponent)
