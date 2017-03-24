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
  FormLabel,
} from 'react-native-elements'

import ChosenInstanceDetailsContainer from './chosenInstanceDetails/chosenInstanceDetailsContainer'

export default class InstanceListComponent extends React.Component {

  render() {
    const { route, navigator, state } = this.props
    renderRowInstances = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.name}
      badge={{
        value: state.badgeValueOfStatusOfEachInstanceOfChosenTemplate[rowData.instanceId].uncompleted,
        badgeTextStyle: { color: 'white' },
        badgeContainerStyle: { marginTop: 5 }
      }}
      subtitle={`Items : total(${state.badgeValueOfStatusOfEachInstanceOfChosenTemplate[rowData.instanceId].total}), complete(${state.badgeValueOfStatusOfEachInstanceOfChosenTemplate[rowData.instanceId].completed})`}
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
    renderRowItems = (rowData, sectionId) => <ListItem
      key={sectionId}
      title={rowData.desc}
      subtitle={`orderNum : ${rowData.orderNum}`}
    />
    return(
      <View style={styles.bodyContainerOnSideMenu}>
        <FormLabel>
          Template : {route.passProps.chosenTemplate.title} / Items : {route.passProps.chosenTemplate.items.length}
        </FormLabel>
        <List>
          <ListView
            dataSource={state.dataSourceOfItemsOfChosenTemplate}
            enableEmptySections={true}
            renderRow={renderRowItems}
          />
        </List>
        {/* <View style={{ marginVertical: 10, backgroundColor: '#9E9E9E', height: 2 }}/> */}
        <FormLabel>
          ▼ Instance List of {route.title}
        </FormLabel>
        <List>
          <ListView
            dataSource={state.dataSourceInstancesOfChosenTemplate}
            renderRow={renderRowInstances}
            enableEmptySections={true}
          />
        </List>
      </View>
    )
  }
}
