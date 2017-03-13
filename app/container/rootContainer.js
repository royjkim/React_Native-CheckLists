import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
import MyTabs from '../components/myTabs'

export default connect(state => ({
  state: state.reducers
}), dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
}))(MyTabs)
