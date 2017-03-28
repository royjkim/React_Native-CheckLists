import TemplateListsComponent from './templateListsComponent'
import { connect } from 'react-redux'
import mySelectors from '../container/selectors'
import { searchBarTextTemplateList, navigateTabCountReset } from '../actions/dataActionCreators'

const make_mapStateToProps = () => (state, ownProps) => ({
  state: {
    templates: state.normalizeReducer.entities.templates,
    templatesLength: state.normalizeReducer.result.templates.length,
    dataSourceTemplates: mySelectors.make_get_dataSourceTemplates()(state.normalizeReducer),
    badgeValueOfInstancesOfChosenTemplates: mySelectors.make_get_badgeValueOfInstancesOfChosenTemplates()(state.normalizeReducer),
    navigatePopToTopRequest_templateList: state.normalizeReducer.configValue.navigatePopToTopRequest_templateList
  },
  route: ownProps.routes,
  navigator: ownProps.navigator
})

const mapDispatchToProps = dispatch => ({
  searchBarTextTemplateList: searchBarText => dispatch(searchBarTextTemplateList(searchBarText)),
  navigateTabCountReset: targetTab => dispatch(navigateTabCountReset(targetTab))
})

export default connect(make_mapStateToProps, mapDispatchToProps)(TemplateListsComponent)
