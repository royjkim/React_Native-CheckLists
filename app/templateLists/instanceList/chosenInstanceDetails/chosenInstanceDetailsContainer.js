import ChosenInstanceDetails from './chosenInstanceDetails'
import { connect } from 'react-redux'
import mySelectors from '../../../container/selectors'

const make_mapStateToProps = () => {
  const make_get_chosenTemplate_of_dataSourceInstanceList = mySelectors.make_get_chosenTemplate_of_dataSourceInstanceList()
  const mapStateToProps = (state, ownProps) => {
    // console.log(`instanceListContainer - mapStateToProps - state : ${JSON.stringify(state, null, 1)}`)
    return {
      dataState: {
        // ...state.originaldataReducer,
        dataSourceInstanceList: make_get_chosenTemplate_of_dataSourceInstanceList(state.originaldataReducer, ownProps.route.passProps.chosenTemplate)
      },
      route: ownProps.route,
      navigator: ownProps.navigator
    }
  }
  return mapStateToProps
}

export default connect(make_mapStateToProps)(ChosenInstanceDetails)
