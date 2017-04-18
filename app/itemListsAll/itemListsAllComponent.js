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

import TemplateDetailsContainer from '../templateLists/templateDetailsContainer';
import TemplateAddNewContainer from '../templateAdd/templateAddNewContainer';

export default class ItemsListsAllComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText_itemList: ''
    }
  }

  shouldComponentUpdate(nextProps) {
    let tempResult = true
    nextProps.navigatePopToTopRequest.itemList ? (this.props.navigatePopToTopRequestFn('itemList', false), tempResult = false, this.props.navigator.popToTop()) : null
    return tempResult
  }

  render() {
    const { route,
            navigator,
            state,
            searchBarText,
            // instances,
            templates,
            // items,
            dataSourceAllItems,
            navigatePopToTopRequestFn,
          } = this.props,
          existOrNot_items = dataSourceAllItems._cachedRowCount == 0;
    const renderRow = rowData => <ListItem
      key={rowData.itemId}
      title={rowData.desc}
      // subtitle={`orderNum : ${rowData.orderNum} / itemId : ${rowData.itemId}`}
      underlayColor='#C0C0C0'
      hideChevron
    />
    const renderSectionHeader = (sectionData, sectionId) => {
      const tempData = { ...templates[sectionId] }
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
                  chosenTemplate: templates[sectionId]
                },
                title: `${templates[sectionId].title}`,
                component: TemplateDetailsContainer,
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
                  {/* Template : {templates[sectionId].title}, Items : {sectionData.length} */}
                  Template : {tempData.title}, Items : {sectionData.length}
                  {/* Template : {tempData.title}, Items({sectionData.length}) */}
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
        {existOrNot_items ? <View style={{ flex: 1 }}>
          <FormLabel>
            There is no item, you need to make template first.
          </FormLabel>
          <Button
            icon={{ name: 'add' }}
            title='Make New Template'
            backgroundColor='#008D14'
            buttonStyle={{ borderRadius: 10, marginTop: 10  }}
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
                  parentTab: 'home'
                },
                title: 'Template Add',
                component: TemplateAddNewContainer
              }
            )}
          />
        </View> : <View
          style={{ flex: 1 }}>
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
                  Total Items : {dataSourceAllItems._cachedRowCount}, searched
                </FormLabel>
              )
            : (
              <FormLabel>
                Total Items : {dataSourceAllItems._cachedRowCount}
              </FormLabel>
              )
          }
          <View
            style={{ flex: 1 }}>
            <List>
              <ListView
                dataSource={dataSourceAllItems}
                enableEmptySections={true}
                renderRow={renderRow}
                renderSectionHeader={renderSectionHeader}
                removeClippedSubviews={false}
              />
            </List>
          </View>
        </View>}
      </View>
    )
  }
}
