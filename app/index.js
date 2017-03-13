import React from 'react'
import {
  View,
  Text
} from 'react-native'
import styles from './components/styles'

import { Provider } from 'react-redux'
import initializeStore from './config/store'

import RootContainer from './container/rootContainer'
import Reactotron from 'reactotron-react-native'


// import MyTabs from './components/myTabs'
const store = initializeStore()

export default class App extends React.Component {

  constructor(props) {
    super(props)

  }

  render() {
    return(
      <Provider store={store}>
        <RootContainer />
        {/* <MyTabs /> */}
      </Provider>
      // <View style={styles.container}>
      //   <MyTabs />
      // </View>
    )
  }
}
