import ChosenInstanceDetails from './chosenInstanceDetails'
import { connect } from 'react-redux'
import mySelectors from '../../../container/selectors'

const make_mapStateToProps = () => {
  const mapStateToProps = (state, ownProps) => {
    // console.log(`instanceListContainer - mapStateToProps - state : ${JSON.stringify(state, null, 1)}`)
    return {
      route: ownProps.route,
      navigator: ownProps.navigator
    }
  }
  return mapStateToProps
}

export default connect(make_mapStateToProps)(ChosenInstanceDetails)
