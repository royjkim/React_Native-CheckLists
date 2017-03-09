import React from 'react'
import {
  View,
  Text
} from 'react-native'
import styles from './components/styles'

// import CustomNavigator from '../components/navigator'
// import Home from '../components/home'
// import ListSummary from '../components/listSummary'
// import MySideMenu from '../components/mySideMenu'

import Reactotron from 'reactotron-react-native'

import MyTabs from './components/myTabs'

export default class App extends React.Component {

  constructor(props) {
    super(props)

  }

  render() {
    return(
      <View style={styles.container}>
        <MyTabs />
        {/* <MySideMenu /> */}
      </View>
    )
  }
}
