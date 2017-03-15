import TemplateListsComponent from './templateListsComponent'
import { connect } from 'react-redux'
import mySelectors from '../container/selectors'

// const templateLists = [
// ]

// templateLists schema = [
//   {
//     templateName: '',
//     templateCategory: '', - 'default' + 'user defined',
//     checklists = [
//       'open', 'close', 'exit'
//     ]
//     eachItemsStatus = [
//       { title: checklists.value, subtitle: 'optional', status: 'true or false(completed)' }
//     ]
//   }
// ]
// 이걸 클래스로 구현해야 겠네;


// const { initialRoute, firstPageTitleMakeBackDisabled, nextRightButtonPageComponent, nextRightButtonPageTitle } = this.props

const make_mapStateToProps = () => {
  const make_get_dataSourceTemplateList = mySelectors.make_get_dataSourceTemplateList()
  const make_get_badgeValueOfTemplateList = mySelectors.make_get_badgeValueOfTemplateList()
  const mapStateToProps = (state, ownProps) => ({
    dataState: {
      ...state.dataReducer,
      dataSourceTemplateList: make_get_dataSourceTemplateList(state.dataReducer),
      badgeValueOfTemplateList: make_get_badgeValueOfTemplateList(state.dataReducer)
    },
    route: ownProps.route,
    navigator: ownProps.navigator
  })
  return mapStateToProps
}

export default connect(make_mapStateToProps)(TemplateListsComponent)
