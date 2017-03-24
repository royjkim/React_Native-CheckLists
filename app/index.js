import React from 'react'
import {
  View,
  Text
} from 'react-native'

import { Provider } from 'react-redux'
import initializeStore from './config/configureStore'

import RootContainer from './container/rootContainer'

const store = initializeStore()

export default class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}
