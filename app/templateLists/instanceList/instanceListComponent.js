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

import ChosenInstanceDetailsContainer from './chosenInstanceDetails/chosenInstanceDetailsContainer'

import Reactotron from 'reactotron-react-native'

export default class InstanceListComponent extends React.Component {

  render() {
    const { route, navigator, state } = this.props
    renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.name}
      // subtitle={`templateId(FK)${rowData.template.toString()}`}
      badge={{
        value: state.badgeValueOfStatusOfEachInstanceOfChosenTemplate[rowData.instanceId].uncompleted,
        badgeTextStyle: { color: 'white' },
        badgeContainerStyle: { marginTop: 5 }
      }}
      subtitle={`total : ${state.badgeValueOfStatusOfEachInstanceOfChosenTemplate[rowData.instanceId].total}, completed : ${state.badgeValueOfStatusOfEachInstanceOfChosenTemplate[rowData.instanceId].completed}`}
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
            chosenInstance: rowData
          },
          title: `${rowData.name}`,
          component: ChosenInstanceDetailsContainer,
        }
      )}
    />
    return(
      <View style={styles.bodyContainerOnSideMenu}>
        <List>
          <ListView
            dataSource={state.dataSourceInstancesOfChosenTemplate}
            renderRow={renderRow}
            enableEmptySections={true}
          />
        </List>
      </View>
    )
  }
}
