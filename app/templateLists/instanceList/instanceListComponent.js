import React from 'react'
import {
  View,
  Text,
  ListView,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native'
import styles from '../../components/styles'
import {
  Button,
  List,
  ListItem,
  FormLabel,
  SearchBar,
  Icon,
} from 'react-native-elements'
import { isEqual } from 'lodash'

import ChosenInstanceDetailsContainer from './chosenInstanceDetails/chosenInstanceDetailsContainer'

export default class InstanceListComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: ''
    }
  }

  render() {
    const {
      route,
      navigator,
      state,
      searchBarText,
    } = this.props;
    const renderRowInstances = (rowData, sectionId) => <ListItem
      key={sectionId}
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
    />;
    return(
      <View
        style={styles.bodyContainerOnSideMenu}
        >
        <View>
          <View style={{ marginVertical: 10, height: 2 }} />
          <SearchBar
            lightTheme
            round={true}
            placeholder='Search Instances'
            value={this.state.searchText}
            onChangeText={searchText => {
              this.setState(state => ({
                searchText
              }))
              searchBarText(searchText, 'instancesOfChosenTemplate');
            }}
          />
          {this.state.searchText !== ''
            ? (
                <FormLabel>
                  ▼ {route.title} : {state.dataSourceInstancesOfChosenTemplate._dataBlob.s1.length}(searched)
                </FormLabel>
              )
            : (
                <FormLabel>
                  ▼ {route.title} : {state.dataSourceInstancesOfChosenTemplate._dataBlob.s1.length}
                </FormLabel>
              )
          }
            <List>
              <ListView
                dataSource={state.dataSourceInstancesOfChosenTemplate}
                renderRow={renderRowInstances}
                enableEmptySections={true}
              />
            </List>
        </View>
      </View>
    )
  }
}
