import TemplateListsComponent from './templateListsComponent'
import { connect } from 'react-redux'
import mySelectors from '../container/selectors'

const make_mapStateToProps = () => {
  const make_get_dataSourceTemplateList = mySelectors.make_get_dataSourceTemplateList()
  const make_get_badgeValueOfTemplateList = mySelectors.make_get_badgeValueOfTemplateList()


  const mapStateToProps = (state, ownProps) => {
    // console.log(`templateListsContainer - mapStateToProps - state : ${JSON.stringify(state, null, 1)}`)
    return {
      dataState: {
        // ...state.originaldataReducer.entities,
        templateListLength : state.originaldataReducer.result.templateList.length,
        dataSourceTemplateList: make_get_dataSourceTemplateList(state.originaldataReducer),
        // dataSourceCustomerList: make_get_chosenTemplate_of_dataSourceInstanceList(state.originaldataReducer),
        badgeValueOfTemplateList: make_get_badgeValueOfTemplateList(state.originaldataReducer),
      },
      route: ownProps.route,
      navigator: ownProps.navigator
    }
  }
  return mapStateToProps
}

export default connect(make_mapStateToProps)(TemplateListsComponent)
