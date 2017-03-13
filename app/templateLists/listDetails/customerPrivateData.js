import React from 'react'
import {
  View,
  Text,
} from 'react-native'
import {
  List,
  ListItem,
  Button,
} from 'react-native-elements'
import styles from '../../components/styles'

export default class CustomerPrivateData extends React.Component {
  render() {
    const { route, navigator } = this.props
    return(
      <View style={styles.bodyContainerOnSideMenu}>
        <Text>
          chosenCustomerPrivateData : {JSON.stringify(route.passProps.chosenCustomerPrivateData, null, 3)}
          {'\n'}
          route : {JSON.stringify(route, null, 3)}
        </Text>
      </View>
    )
  }
}
