import React from 'react'
import {
  View,
  Text
} from 'react-native'
import styles from './styles'

export default class TemplateList extends React.Component {

  render() {
    return(
      <View style={styles.bodyContainer}>
        {/* <Text>
          this.props.route.title : {this.props.route.title}
        </Text> */}
        <Text>
          TemplateList Component
        </Text>
      </View>
    )
  }
}
