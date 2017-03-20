import InstanceListComponent from './instanceListComponent'
import { connect } from 'react-redux'
import mySelectors from '../../container/selectors'

const make_mapStateToProps = () => {
  const make_get_chosenTemplate_of_dataSourceInstances = mySelectors.make_get_chosenTemplate_of_dataSourceInstances()
  const make_get_badgeValueOfItemsOfChosenInstance = mySelectors.make_get_badgeValueOfItemsOfChosenInstance()
  const mapStateToProps = (state, ownProps) => {
    // console.log(`instanceListContainer - mapStateToProps - state.normalizeReducer.entities : ${JSON.stringify(state.normalizeReducer.entities, null, 1)}`)
    // console.log(`instnaceListContainer - ownProps.route.passProps.chosenTemplate : ${JSON.stringify(ownProps.route.passProps.chosenTemplate, null, 1)}`)
    return {
      state: {
        dataSourceInstances: make_get_chosenTemplate_of_dataSourceInstances(state.normalizeReducer.entities, ownProps.route.passProps.chosenTemplate),
        badgeValueOfItemsOfChosenInstance: make_get_badgeValueOfItemsOfChosenInstance(state.normalizeReducer.entities, ownProps.route.passProps.chosenTemplate)
      },
      route: ownProps.route,
      navigator: ownProps.navigator
    }
  }
  return mapStateToProps
}

export default connect(make_mapStateToProps)(InstanceListComponent)
