import TemplateListsComponent from './templateListsComponent'
import { connect } from 'react-redux'
import mySelectors from '../container/selectors'

const make_mapStateToProps = () => (state, ownProps) => ({
  state: {
    templatesLength: state.normalizeReducer.result.templates.length,
    dataSourceTemplates: mySelectors.make_get_dataSourceTemplates()(state.normalizeReducer.entities),
    badgeValueOfTemplates: mySelectors.make_get_badgeValueOfTemplates()(state.normalizeReducer.entities)
  },
  route: ownProps.routes,
  navigator: ownProps.navigator
})

export default connect(make_mapStateToProps)(TemplateListsComponent)
