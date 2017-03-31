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
  SearchBar,
} from 'react-native-elements'

import InstancesListContainer from '../templateLists/instanceList/instanceListContainer'
import ChosenInstanceDetailsContainer from '../templateLists/instanceList/chosenInstanceDetails/chosenInstanceDetailsContainer'

export default class ItemsListsAllComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText_itemList: ''
    }
  }

  shouldComponentUpdate(nextProps) {
    let tempResult = true
    nextProps.state.navigatePopToTopRequest.itemList ? (this.props.navigatePopToTopRequest('itemList', false), tempResult = false, this.props.navigator.popToTop()) : null
    return tempResult
  }
  render() {
    const { route, navigator, state, searchBarText } = this.props
    const renderRow = (rowData, sectionId) => <ListItem
      key={sectionId}
      title={rowData.desc}
      subtitle={`orderNum : ${rowData.orderNum}`}
    />
    const renderSectionHeader = (sectionData, sectionId) => {
      return (
        <TouchableOpacity
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
                  parentTab: route.passProps.parentTab,
                  chosenTemplate: state.templates[sectionId]
                },
                title: `${state.templates[sectionId].title}`,
                component: InstancesListContainer,
              }
            )
          }}
          >
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'lightgray',
                padding: 8
              }}
              >
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
      )
    }
    return(
      <View style={styles.bodyContainer}>
        <SearchBar
          lightTheme
          round={true}
          onChangeText={searchText => {
            this.setState(state => ({
              searchText_itemList: searchText
            }))
            searchBarText(searchText.trim(), 'itemList')
          }}
          placeholder='Search Items'
        />
        {this.state.searchText_itemList !== ''
          ? (
              <FormLabel>
                Total Items : {state.dataSourceAllItems._cachedRowCount}, searched
              </FormLabel>
            )
          : (
            <FormLabel>
              Total Items : {state.dataSourceAllItems._cachedRowCount}
            </FormLabel>
            )
        }
        <View
          style={{ flex: 1 }}>
          <List>
            <ListView
              dataSource={state.dataSourceAllItems}
              enableEmptySections={true}
              renderRow={renderRow}
              renderSectionHeader={renderSectionHeader}
            />
          </List>
        </View>
      </View>
    )
  }
}
