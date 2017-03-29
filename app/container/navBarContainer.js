import { connect } from 'react-redux'
import NavBar from '../components/navBarComponent'
import { triedNavigateWhenPrevented } from '../actions/dataActionCreators'

const mapStateToProps = (state, ownProps) => ({
  state: {
    initialRoute: ownProps.initialRoute,
    navigatePrevent: state.normalizeReducer.configValue.navigatePrevent,
    triedNavigateWhenPrevented: state.normalizeReducer.configValue.triedNavigateWhenPrevented
  }
})

const mapDispatchToProps = dispatch => ({
  triedNavigateWhenPrevented: (routeTitle, statusBoolean) => dispatch(triedNavigateWhenPrevented(routeTitle, statusBoolean))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
