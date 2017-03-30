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
  SearchBar,
} from 'react-native-elements'

import ChosenInstanceDetailsContainer from './chosenInstanceDetails/chosenInstanceDetailsContainer'

export default class InstanceListComponent extends React.Component {

  render() {
    const { route, navigator, state, searchBarTextInstancesOfChosenTemplate, searchBarTextItemsOfChosenTemplate } = this.props
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
            parentTab: route.passProps.parentTab,
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
        <SearchBar
          lightTheme
          round={true}
          onChangeText={searchBarText => searchBarTextItemsOfChosenTemplate(searchBarText)}
          placeholder='Search Items'
        />
        <FormLabel>
          {/* Template : {route.passProps.chosenTemplate.title}, Items({route.passProps.chosenTemplate.items.length}) */}
          Template : {route.passProps.chosenTemplate.title}
        </FormLabel>
        <FormLabel>
          Category : {route.passProps.chosenTemplate.category}, Items({state.itemsLengthOfChosenTemplate})
        </FormLabel>
        <List>
          <ListView
            dataSource={state.dataSourceOfItemsOfChosenTemplate}
            enableEmptySections={true}
            renderRow={renderRowItems}
          />
        </List>
        {state.dataSourceInstancesOfChosenTemplate._cachedRowCount > 0 ? (<View>
          <View style={{ marginVertical: 15, height: 2 }} />
          <SearchBar
            lightTheme
            round={true}
            onChangeText={searchBarText => searchBarTextInstancesOfChosenTemplate(searchBarText)}
            placeholder='Search Instances'
          />
          <FormLabel>
            ▼ Instance List of {route.title} : {state.dataSourceInstancesOfChosenTemplate._dataBlob.s1.length}
          </FormLabel>
          <List>
            <ListView
              dataSource={state.dataSourceInstancesOfChosenTemplate}
              renderRow={renderRowInstances}
              enableEmptySections={true}
            />
          </List>
        </View>) : null}
      </View>
    )
  }
}
