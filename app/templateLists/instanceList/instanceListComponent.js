import React from 'react'
import {
  View,
  Text,
  ListView,
} from 'react-native'
import styles from '../../components/styles'
import {
  Button,
  List,
  ListItem,
} from 'react-native-elements'

import ChosenInstanceDetailsComponent from './chosenInstanceDetails/chosenInstanceDetailsComponent'

import Reactotron from 'reactotron-react-native'

export default class InstanceListComponent extends React.Component {

  render() {
    const { route, navigator, state } = this.props
    renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.name}
      subtitle={rowData.template}
      onPress={() => navigator.push(
        {
          passProps: {
            leftButton: {
              title: 'back',
              component: ''
            },
            rightButton: {
              title: '',
              component: ''
            },
            chosenInstance: rowData.name
          },
          title: `${rowData.name}`,
          component: ChosenInstanceDetailsComponent,
        }
      )}
    />
    return(
      <View style={styles.bodyContainerOnSideMenu}>
        <List>
          <ListView
            dataSource={state.dataSourceInstances}
            renderRow={renderRow}
            enableEmptySections={true}
          />
        </List>
        {/* <Button
          title='Toggle Side Menu'
          onPress={() => toggleSideMenu()}
        />
        <Text>
          sideMenuVisible : {String(this.props.sideMenuVisible)}
          {'\n'}
          dataSourceInstancesOfChosenTemplate : ${JSON.stringify(this.dataSourceInstancesOfChosenTemplate, null, 3)}
          {'\n'}
          route : {JSON.stringify(route, null, 3)}
        </Text> */}
      </View>
    )
  }
}
