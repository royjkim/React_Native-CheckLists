import { connect } from 'react-redux'
import TemplateAddNewComponent from './templateAddNewComponent'
import mySelectors from '../container/selectors'
import { addTemplateCategory, addNewTemplate } from '../actions/dataActionCreators'

const mapStateToProps = (state, ownProps) => ({
  state: {
    lastId: state.normalizeReducer.lastId,
    dataSourceTemplateCategories: mySelectors.make_get_dataSourceTemplateCategories()(state.normalizeReducer),
  }
})

const mapDispatchToProps = dispatch => ({
  addTemplateCategory: (lastId, newData) => dispatch(addTemplateCategory(lastId, newData)),
  addNewTemplate: (lastId, newData) => dispatch(addNewTemplate(lastId, newData))
})

export default connect(mapStateToProps, mapDispatchToProps)(TemplateAddNewComponent)
