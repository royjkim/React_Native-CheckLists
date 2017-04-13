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

import ChosenInstanceDetailsContainer from '../templateLists/instanceList/chosenInstanceDetails/chosenInstanceDetailsContainer'

export default class InstanceListsAllComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText_itemsCustomizedAllInstances: ''
    }
  }

  render() {
    const { route, navigator, state, changeStatusOfItemsCustomized, searchBarText } = this.props
    const renderRow = (rowData, sectionId, rowId) => <ListItem
      key={rowId}
      // title={rowData.desc}
      underlayColor='#C0C0C0'
      title={<CheckBox
        // title={rowData.desc}
        title={`${rowData.desc}, orderNum : ${rowData.orderNum}`}
        checked={rowData.status}
        onPress={() => changeStatusOfItemsCustomized(rowData)}
        />
      }
      // subtitle={`instanceId : ${rowData.instanceId}`}
      hideChevron
    />
    const renderSectionHeader = (sectionData, sectionId) => {
      const temp = {
        ...state.templates[state.instances[sectionId].template]
      }
      return <TouchableOpacity
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
              chosenInstance: state.instances[sectionId]
            },
            title: `${state.instances[sectionId].name}`,
            component: ChosenInstanceDetailsContainer,
          }
        )}
        >
        <View style={{ flexDirection: 'row', backgroundColor: 'lightgray', padding: 8 }}>
          <Text
            key={sectionId}
            style={{ fontWeight: '500', color: '#161616' }}
            >
            {state.instances[sectionId].name}, template: {temp.title}, items : {state.instances[sectionId].items.length} ({state.badgeValueOfStatusOfAllInstances[sectionId].completed} / {state.badgeValueOfStatusOfAllInstances[sectionId].uncompleted})
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
    }
    return(
      <View style={styles.bodyContainer}>
        <SearchBar
          lightTheme
          round={true}
          onChangeText={searchText => {
            this.setState(state => ({
              searchText_itemsCustomizedAllInstances: searchText
            }))
            searchBarText(searchText.trim(), 'itemsCustomizedAllInstances')
          }}
          placeholder='Search Items'
        />
        {this.state.searchText_itemsCustomizedAllInstances !== ''
          ? (
              <FormLabel>
                Total Instances : {state.dataSourceForAllInstances.sectionIdentities.length}, searched
              </FormLabel>
            )
          : (
              <FormLabel>
                Total Instances : {state.dataSourceForAllInstances.sectionIdentities.length}
              </FormLabel>
            )
        }
        <List>
          <ListView
            dataSource={state.dataSourceForAllInstances}
            renderRow={renderRow}
            enableEmptySections={true}
            renderSectionHeader={renderSectionHeader}
            removeClippedSubviews={false}
          />
        </List>
        <View style={{ height: 5 }} />
        <Button
          icon={{ name: 'note-add' }}
          title='Add Template'
          onPress={() => {
            navigator.push({
              passProps: {
                leftButton: {
                  title: 'Back',
                  component: '',
                },
                rightButton: {
                  title: '',
                  component: '',
                },
                parentTab: route.passProps.parentTab
              },
              title: 'Template Add',
              component: TemplateAdd,
            })
          }}
        />
      </View>
    )
  }
}
