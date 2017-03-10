import React from 'react'
import {
  View,
  Text
} from 'react-native'
import styles from '../components/styles'

export default class SettingsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      version: '0.1'
    }
  }

  render() {
    return(
      <View style={styles.bodyContainer}>
        <Text>
          SettingsComponent
          {'\n'}
          version : {this.state.version}
        </Text>
        <Text>
          Developer : roy
        </Text>
      </View>
    )
  }
}
