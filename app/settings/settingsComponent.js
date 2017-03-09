import React from 'react'
import {
  View,
  Text
} from 'react-native'
import styles from '../components/styles'

export default class SettingsComponent extends React.Component {
  render() {
    return(
      <View style={styles.bodyContainer}>
        <Text>
          SettingsComponent
        </Text>
      </View>
    )
  }
}
