import TemplateListsComponent from './templateListsComponent'
import { connect } from 'react-redux'
import mySelectors from '../container/selectors'

const make_mapStateToProps = () => {
  const make_get_dataSourceTemplates = mySelectors.make_get_dataSourceTemplates()
  const make_get_badgeValueOfTemplates = mySelectors.make_get_badgeValueOfTemplates()


  const mapStateToProps = (state, ownProps) => {
    // console.log(`templateListsContainer - mapStateToProps - state : ${JSON.stringify(state, null, 1)}`)
    return {
      state: {
        templatesLength: state.normalizeReducer.result.templates.length,
        dataSourceTemplates: make_get_dataSourceTemplates(state.normalizeReducer.entities),
        badgeValueOfTemplates: make_get_badgeValueOfTemplates(state.normalizeReducer.entities)
      },
      route: ownProps.routes,
      navigator: ownProps.navigator
    }
  }
  return mapStateToProps
}

export default connect(make_mapStateToProps)(TemplateListsComponent)
