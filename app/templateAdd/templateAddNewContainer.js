import { connect } from 'react-redux'
import TemplateAddNewComponent from './templateAddNewComponent'
import mySelectors from '../container/selectors'
import { addTemplateCategory, addNewTemplate } from '../actions/dataActionCreators'

const mapStateToProps = (state, ownProps) => ({
  state: {
    lastId: state.normalizeReducer.lastId,
    items: state.normalizeReducer.entities.items,
    dataSourceTemplateCategories: mySelectors.make_get_dataSourceTemplateCategories()(state.normalizeReducer),
  },
  route: ownProps.route,
  navigator: ownProps.navigator
})

const mapDispatchToProps = dispatch => ({
  addTemplateCategory: (lastId, newData) => dispatch(addTemplateCategory(lastId, newData)),
  addNewTemplate: (lastId, newData) => dispatch(addNewTemplate(lastId, newData))
})

export default connect(mapStateToProps, mapDispatchToProps)(TemplateAddNewComponent)
