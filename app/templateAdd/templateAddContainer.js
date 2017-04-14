import { connect } from 'react-redux'
import TemplateAddComponent from './templateAddComponent'
import mySelectors from '../container/selectors'

const mapStateToProps = (state, ownProps) => ({
  dataSourceTemplates: mySelectors.make_get_dataSourceTemplates()(state.normalizeReducer),
  route: ownProps.route,
  navigator: ownProps.navigator
})

export default connect(mapStateToProps)(TemplateAddComponent)
