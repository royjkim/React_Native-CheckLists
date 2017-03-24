import React from 'react'
import {
  View,
  Text,
  ListView,
  TouchableOpacity,
} from 'react-native'
import styles from '../components/styles'

import {
  Button,
  List,
  ListItem,
  FormLabel,
  CheckBox,
  Icon,
} from 'react-native-elements'

import InstancesListContainer from '../templateLists/instanceList/instanceListContainer'
import ChosenInstanceDetailsContainer from '../templateLists/instanceList/chosenInstanceDetails/chosenInstanceDetailsContainer'

export default class ItemsListsAllComponent extends React.Component {

  render() {
    const { route, navigator, state } = this.props
    const renderRow = (rowData, sectionId) => <ListItem
      key={sectionId}
      title={rowData.desc}
      subtitle={`orderNum : ${rowData.orderNum}`}
      hideChevron
    />
    const renderSectionHeader = (sectionData, sectionId) => <TouchableOpacity
      onPress={() => {
        return navigator.push(
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
              chosenTemplate: state.templates[sectionId]
            },
            // title: `Customer List of ${rowData.title}`,
            title: `${state.templates[sectionId].title}`,
            component: InstancesListContainer,
          }
        )
      }}
      >
        <View style={{ flexDirection: 'row', backgroundColor: 'lightgray', padding: 8 }}>
          <Text
            key={sectionId}
            style={{ fontWeight: '500', color: '#161616' }}
            >
            Template : {state.templates[sectionId].title}, Items : {sectionData.length}
          </Text>
          <View style={{ flex: 1 }}>
            <Icon
              name='chevron-right'
              size={20}
              containerStyle={{ alignSelf: 'flex-end' }}
            />
          </View>
        </View>
      </TouchableOpacity>
    return(
      <View style={styles.bodyContainer}>
        <FormLabel>
          Total Items : {Object.values(state.items).length}
        </FormLabel>
        <List>
          <ListView
            dataSource={state.dataSourceAllItems}
            enableEmptySections={true}
            renderRow={renderRow}
            renderSectionHeader={renderSectionHeader}
          />
        </List>
        <View style={{ height: 5 }} />
        <Button
          title='Add Item'
          onPress={() => alert('add Item')}
        />
      </View>
    )
  }
}
