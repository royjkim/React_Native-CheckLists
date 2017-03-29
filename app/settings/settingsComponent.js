import React from 'react'
import {
  View,
  Text
} from 'react-native'
import styles from '../components/styles'

const SettingsComponent = props => {
  const currentVersion = '0.1'
  return (
    <View style={styles.bodyContainer}>
      <Text>
        SettingsComponent
        {'\n'}
        version : {currentVersion}
      </Text>
      <Text>
        Developer : roy
        {'\n'}
        Save(Local - anti-flat) button 
      </Text>
    </View>
  )
}

export default SettingsComponent
