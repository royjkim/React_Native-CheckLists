import { connect } from 'react-redux'
import TemplateAddNewComponent from './templateAddNewComponent'
import mySelectors from '../container/selectors'
import {
  addTemplateCategory,
  addNewTemplate,
  addItem,
  navigatePrevent,
  triedNavigateWhenPrevented
} from '../actions/dataActionCreators'

const mapStateToProps = (state, ownProps) => ({
  state: {
    lastId: state.normalizeReducer.lastId,
    items: state.normalizeReducer.entities.items,
    dataSourceTemplateCategories: mySelectors.make_get_dataSourceTemplateCategories()(state.normalizeReducer),
    navigatePrevent: state.configReducer.navigatePrevent,
    triedNavigateWhenPrevented: state.configReducer.triedNavigateWhenPrevented
  },
  route: ownProps.route,
  navigator: ownProps.navigator
})

const mapDispatchToProps = dispatch => ({
  addTemplateCategory: (lastId, newData) => dispatch(addTemplateCategory(lastId, newData)),
  addNewTemplate: (lastId, newData) => dispatch(addNewTemplate(lastId, newData)),
  addItem: (lastId, newData) => dispatch(addItem(lastId, newData)),
  navigatePreventFn: (__navigatorRouteID, statusBoolean) => dispatch(navigatePrevent(__navigatorRouteID, statusBoolean)),
  triedNavigateWhenPreventedFn: (__navigatorRouteID, statusBoolean) => dispatch(triedNavigateWhenPrevented(__navigatorRouteID, statusBoolean))
})

export default connect(mapStateToProps, mapDispatchToProps)(TemplateAddNewComponent)
