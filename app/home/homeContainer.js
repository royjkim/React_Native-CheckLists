import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../components/navBar'
import HomeComponent from './homeComponent'
import { bindActionCreators } from 'redux'
import * as navigationActionCreators from '../actions/navigationActionCreators'

import Reactotron from 'reactotron-react-native'

class HomeContainer extends React.Component {
  render() {
    // const { state, actions } = this.props
    const { navigationState, navigationActions } = this.props
    console.log(`HomeContainer : this.props : ${JSON.stringify(this.props, null, 2)}`)
    return (
      <NavBar
        navigationState={navigationState}
        navigationActions={navigationActions}
      />
    )
    // return(
    //   <NavBar
    //     // initialRoute={{title: 'Home', component: HomeComponent, passProps: { firstPageTitleMakeBackDisabled: 'Home' }}}
    //     initialRoute={{
    //       passProps: {
    //         firstPageTitleMakeBackDisabled: 'Home',
    //         nextRightButtonPageTitle: '',
    //         nextRightButtonPageComponent: '',
    //         state,
    //         actions
    //       },
    //       title: 'Home',
    //       component: HomeComponent
    //     }}
    //   />
    // )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(`homeContainer - mapStateToProps - state : ${JSON.stringify(state, null, 2)}`)
  return {
    navigationState: state.navigationReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigationActions: bindActionCreators(navigationActionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
