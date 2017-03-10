import React from 'react'
import {
  View,
  Text,
} from 'react-native'
import styles from '../../components/styles'
import {
  Button
} from 'react-native-elements'

import Reactotron from 'reactotron-react-native'

export default class ListDetailsComponent extends React.Component {
  render() {
    const { route, navigator, toggleSideMenu } = this.props
    // Reactotron.log(`toggleSideMenu : ${toggleSideMenu}`)
    Reactotron.log(`sideMenuVisible : ${String(this.props.sideMenuVisible)}`)
    return(
      // <View style={{ backgroundColor: 'transparent', marginTop: 300 }}>
      //   <Text>
      //     sideMenuVisible : {this.props.sideMenuVisible.toString()}
      //   </Text>
      //   <Button
      //     title='Toggle Side Menu'
      //     onPress={() => toggleSideMenu()}
      //   />
      // </View>
      <View style={styles.bodyContainerOnSideMenu}>
        <Text>
          sideMenuVisible : {String(this.props.sideMenuVisible)}
          {'\n'}
          route : {JSON.stringify(route, null, 3)}
        </Text>
        <Button
          title='Toggle Side Menu'
          onPress={() => toggleSideMenu()}
        />
        {/* <Text>
          route.passProps : {JSON.stringify(route.passProps, null, 3)}
        </Text> */}
      </View>
    )
  }
}
