import ChosenInstanceDetailsComponent from './chosenInstanceDetailsComponent'
import { connect } from 'react-redux'
import mySelectors from '../../../container/selectors'

const make_mapStateToProps = () => {
  const make_get_dataSourceItems_of_chosenInstance = mySelectors.make_get_dataSourceItems_of_chosenInstance()
  const mapStateToProps = (state, ownProps) => {
    console.log(`instanceListContainer - mapStateToProps - state : ${JSON.stringify(state, null, 1)}`)
    console.log(`chosen - container - ownProps.route.passProps.chosenInstance : ${JSON.stringify(ownProps.route.passProps.chosenInstance, null, 1)}`)
    return {
      state: {
        dataSourceItemsOfChosenInstance: make_get_dataSourceItems_of_chosenInstance(state.normalizeReducer.entities, ownProps.route.passProps.chosenInstance)
      },
      route: ownProps.route,
      navigator: ownProps.navigator
    }
  }
  return mapStateToProps
}

export default connect(make_mapStateToProps)(ChosenInstanceDetailsComponent)
