import ListDetailsComponent from './listDetailsComponent'
import { connect } from 'react-redux'
import mySelectors from '../../container/selectors'

const make_mapStateToProps = () => {
  const make_get_dataSourceCustomerList = mySelectors.make_get_dataSourceCustomerList()
  const mapStateToProps = (state, ownProps) => ({
    dataState: {
      ...state.dataReducer,
      dataSourceCustomerList: make_get_dataSourceCustomerList(state.dataReducer, ownProps.route.passProps.chosenTemplate)
    },
    route: ownProps.route,
    navigator: ownProps.navigator
  })
  return mapStateToProps
}

export default connect(make_mapStateToProps)(ListDetailsComponent)
