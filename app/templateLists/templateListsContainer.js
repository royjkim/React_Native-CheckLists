import TemplateListsComponent from './templateListsComponent'
import { connect } from 'react-redux'
import mySelectors from '../container/selectors'
import { searchBarTextTemplateList, navigatePopToTopRequest } from '../actions/dataActionCreators'

const make_mapStateToProps = () => (state, ownProps) => ({
  state: {
    templates: state.normalizeReducer.entities.templates,
    templatesLength: state.normalizeReducer.result.templates.length,
    dataSourceTemplates: mySelectors.make_get_dataSourceTemplates()(state.normalizeReducer),
    badgeValueOfInstancesOfChosenTemplates: mySelectors.make_get_badgeValueOfInstancesOfChosenTemplates()(state.normalizeReducer),
    navigatePopToTopRequest: state.normalizeReducer.configValue.navigatePopToTopRequest
  },
  route: ownProps.routes,
  navigator: ownProps.navigator
})

const mapDispatchToProps = dispatch => ({
  searchBarTextTemplateList: searchBarText => dispatch(searchBarTextTemplateList(searchBarText)),
  navigatePopToTopRequest: (targetTab, statusBoolean) => dispatch(navigatePopToTopRequest(targetTab, statusBoolean))
})

export default connect(make_mapStateToProps, mapDispatchToProps)(TemplateListsComponent)
