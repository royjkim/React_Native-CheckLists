import React from 'react'
import {
  View,
  Text,
  ListView,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from 'react-native'
import styles from '../components/styles'
import {
  Button,
  List,
  ListItem,
  FormLabel,
  SearchBar,
  Icon,
} from 'react-native-elements'
import { isEqual } from 'lodash'

import ChosenInstanceDetailsContainer from './instanceList/chosenInstanceDetails/chosenInstanceDetailsContainer'
import InstanceListContainer from './instanceList/instanceListContainer'

export default class TemplateDetailsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      prevItems: this.props.state.itemsOfChosenTemplate,
      tempItems: this.props.state.itemsOfChosenTemplate,
      hasEmptyOnItemDesc: false,
      changeValue: false,
      addItemModalVisible: false,
      newItem: {
        desc: '',
        itemId: this.props.state.lastId.items + 1,
        orderNum: this.props.state.chosenTemplate.items.map(value => this.props.state.items[value]).sort((data1, data2) => data1.orderNum - data2.orderNum).slice(-1)[0].orderNum + 1,
        template: this.props.state.chosenTemplate.title,
        templateId: this.props.state.chosenTemplate.templateId
      },
      dataSource_newItemAdded: this.props.state.dataSourceOfItemsOfChosenTemplate || []
    }
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  componentDidUpdate() {
    // console.log(`componentDidUpdate - this.state : `, this.state)
    const { navigatePrevent, triedNavigateWhenPrevented } = this.props.state,
          __navigatorRouteID = this.props.route.__navigatorRouteID,
          parentTab = this.props.route.passProps.parentTab,
          navigatePreventFn = this.props.navigatePreventFn,
          triedNavigateWhenPreventedFn = this.props.triedNavigateWhenPreventedFn;

    // Below is for when the item text changed , make redux navigate disable.
    this.state.changeValue ?
      navigatePrevent[__navigatorRouteID] ?
        navigatePrevent[parentTab] ?
          null : navigatePreventFn(parentTab, true)
            : navigatePreventFn(__navigatorRouteID, true)
              : navigatePrevent[__navigatorRouteID]
                ? navigatePreventFn(__navigatorRouteID, false)
                  : navigatePrevent[parentTab] ?
                    navigatePreventFn(parentTab, false)
                      : null

    // Below is for alert let an user know 'save before navigate', then make redux 'alert completed'.
    triedNavigateWhenPrevented[__navigatorRouteID] ?
      (alert('press save button to save changed item'), triedNavigateWhenPreventedFn(__navigatorRouteID, false))
        : triedNavigateWhenPrevented[parentTab] ?
          (alert('press save button to save changed item'), triedNavigateWhenPreventedFn(parentTab, false))
            : null

    this.state.addItemModalVisible && this.refs['newItemTempDescTextInput'].focus()
  }

  render() {
    const {
      route,
      navigator,
      state,
      searchBarText,
      navigatePreventFn,
      addItem
    } = this.props;
    const resetData = () => this.setState(
      {
        searchText: '',
        prevItems: this.props.state.itemsOfChosenTemplate,
        tempItems: this.props.state.itemsOfChosenTemplate,
        hasEmptyOnItemDesc: false,
        changeValue: false,
        addItemModalVisible: false,
        newItem: {
          desc: '',
          itemId: this.props.state.lastId.items + 1,
          // Below need to be confirm, after new Items add, in the same page, if an user add new Items, below would be wrong.
          orderNum: this.props.state.chosenTemplate.items.map(value => this.props.state.items[value]).sort((data1, data2) => data1.orderNum - data2.orderNum).slice(-1)[0].orderNum + 1,
          template: this.props.state.chosenTemplate.title,
          templateId: this.props.state.chosenTemplate.templateId
        },
        dataSource_newItemAdded: this.props.state.dataSourceOfItemsOfChosenTemplate || []
      }
    );
    const saveAlertFn = () => {
      Alert.alert(
        'Confirm Save',
        'You make an existing item empty. If you want to delete it, press Save. Or press Cancel.',
        [
          { text: 'Cancel', onPress: () => {
            // console.log('this.state.emptyRefs : ', this.state.emptyRefs)
            // this.refs[this.state.emptyRefs].focus()
          }},
          { text: 'Save', onPress: () => {
            let tempResult = this.state.tempItemDesc
            for(let key in tempResult) {
              tempResult[key].desc == '' && delete tempResult[key]
            }
            saveProcessFn(tempResult);
          }}
        ]
      )
    }
    const saveProcessFn = async newItemDesc => {
      await this.setState(state => {
        state.changeValue = false;
        // state.prevItems = state.tempItems;
        state.prevItems = [ ...state.tempItems ];
        state.hasEmptyOnItemDesc = false,
        state.emptyRefs = '';
      });
      state.navigatePrevent[route.__navigatorRouteID] && navigatePreventFn(route.__navigatorRouteID, false);
      state.navigatePrevent[route.passProps.parentTab] && navigatePreventFn(route.passProps.parentTab, false);
      addItem(state.lastId.items, this.state.prevItems.slice(state.itemsOfChosenTemplate.length));
      alert('save complete');
      // this.props.navigator.pop()
    }
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
    const changeItemText = (itemText, rowId, emptyStatusBoolean) => state => {
      state.tempItems[rowId] = {
        ...state.tempItems[rowId],
        desc: itemText
      }
      state.dataSource_newItemAdded = this.ds.cloneWithRows(state.tempItems);
      state.changeValue = !isEqual(state.prevItems, state.tempItems);
      state.changeValue ? state.searchText = '' : null;
      state.hasEmptyOnItemDesc = emptyStatusBoolean;
      state.emptyRefs = `itemsTextInput_${rowId}`;
    }
    const renderRowItems = (rowData, sectionId, rowId) => {
      // console.log('renderRowItems - rowData : ', rowData)
      const compareResult = this.state.tempItems[rowId] == this.state.prevItems[rowId]
      return (
        <View
          key={rowData.itemId}
          style={{
            // flexDirection: 'row',
            marginHorizontal: 10,
            marginVertical: 10,
            // flex: 1,
            // #C1C1C1
            borderColor: compareResult ? '#CBD2D9' : '#159589',
            borderBottomWidth: 1,
            marginHorizontal: 10
          }}
          >
              <TextInput
                ref={`itemsTextInput_${rowId}`}
                value={rowData.desc}
                onChangeText={itemText => this.setState(changeItemText(itemText, rowId, itemText == ''))}
                placeholder={this.state.tempItems[rowId].desc}
                placeholderTextColor='#D2D8C9'
                style={{
                  // flex: 1,
                  height: 23,
                  color: compareResult ? '#86939D' : '#159589',
                  textAlign: 'center',
                  // marginBottom: 0,
                  // borderWidth: 1,
                  // borderColor: 'red'
                }}
              />
        </View>
      )
    };
    return(
      <View style={styles.bodyContainerOnSideMenu}>
        {!this.state.changeValue ? (<SearchBar
          lightTheme
          round={true}
          onChangeText={searchText => {
            this.setState({
              searchText
            })
            searchBarText(searchText, 'itemsOfChosenTemplate')
          }}
          placeholder='Search Items'
          value={this.state.searchText}
        />) : null}
        <FormLabel>
          Template : {route.passProps.chosenTemplate.title}
        </FormLabel>
        {this.state.searchText !== ''
          ? (
              <FormLabel>
                Category : {route.passProps.chosenTemplate.category}, Items({state.itemsLengthOfChosenTemplate}, searched)
              </FormLabel>
            )
          : this.state.changeValue ? (
            <FormLabel>
              Category : {route.passProps.chosenTemplate.category}, Items({this.state.tempItems.length}), new item added)
            </FormLabel>
          ) : (
                <FormLabel>
                  Category : {route.passProps.chosenTemplate.category}, Items({this.state.prevItems.length})
                </FormLabel>
              )
        }
        <List>
          <ListView
            dataSource={this.state.changeValue ?  this.state.dataSource_newItemAdded : state.dataSourceOfItemsOfChosenTemplate}
            enableEmptySections={true}
            renderRow={renderRowItems}
            style={{ maxHeight: 250 }}
          />
        </List>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 5,
            marginRight: 5
          }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
              }}
              onPress={() => {
                this.setState({
                  searchText: '',
                  addItemModalVisible: true
                })
                searchBarText('', 'itemsOfChosenTemplate')
            }}
              >
              <Icon
                name='add-circle-outline'
                size={17}
                color='#9E9E9E'
              />
              <Text
                style={{
                  color: '#9E9E9E',
                  fontSize: 15
                }}
                >
                add item
              </Text>
            </TouchableOpacity>
        </View>
        {this.state.changeValue
          ? (
            <View>
              <View
                style={{ height: 10 }}
              />
              <Button
                icon={{ name: 'check' }}
                title='Save'
                backgroundColor='#159589'
                onPress={() => this.state.hasEmptyOnItemDesc ? saveAlertFn() : saveProcessFn() }
              />
              <View
                style={{ height: 10 }}
              />
              <Button
                title='Restore'
                backgroundColor='#86939D'
                onPress={() => resetData()}
              />
            </View>
            )
          : null}
        <View style={{ height: 10 }}/>
        <Button
          title={`Show Instances of this templates(${state.instancesOfChosenTemplate.length})`}
          backgroundColor='#6296F9'
          disabled={this.state.changeValue}
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
                chosenTemplate: route.passProps.chosenTemplate
              },
              title: `Instance List of ${route.title}`,
              component: InstanceListContainer,
            }
          )}
        />
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.addItemModalVisible}
          >
          <View
            style={{
              flex: 1,
              // backgroundColor: 'transparent',
              // backgroundColor: 'white',
              justifyContent: 'center',
            }}
            >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
              }}
              >
              <TouchableOpacity
                style={{
                  flex: 1,
                }}
                onPress={() => this.state.newItem.desc == '' ? this.setState({ addItemModalVisible: false }) : (alert('press add button, after input a new item.'), this.refs['newItemTempDescTextInput'].focus())}
              />
            </View>
            <KeyboardAvoidingView
              style={{
                flex: 0,
                height: 110,
                backgroundColor: 'white',
                // paddingBottom: 20,
                // borderTopWidth: 1,
                borderColor: '#86939D',
                // paddingBottom: 20,
                // paddingVertical: 20,
                // borderColor: '#9E9E9E',
              }}
              behavior='position'
              contentContainerStyle={{
                backgroundColor: 'white',
                borderTopWidth: 1,
                borderColor: '#86939D',
                // paddingVertical: 20
                paddingBottom: 27
              }}
              >
                <FormLabel
                  containerStyle={{
                    backgroundColor: 'white'
                  }}>
                  New Item
                </FormLabel>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                  }}
                  >
                  <View
                    style={{
                      flex: 1,
                      borderColor: '#86939D',
                      borderBottomWidth: 1,
                      marginLeft: 15,
                      // marginBottom: 10,
                      // marginTop: 10,
                    }}
                  >
                    <TextInput
                      ref='newItemTempDescTextInput'
                      value={this.state.newItem.desc}
                      onChangeText={newItemText => this.setState(state => {
                        state.newItem.desc = newItemText;
                        state.changeValue = !isEqual(state.prevItems, state.tempItems);
                      })}
                      style={{
                        flex: 1,
                        // height: 45,
                        // borderWidth: 1,
                        textAlign: 'center',
                      }}
                    />
                  </View>
                  <Button
                    title='Add'
                    onPress={() => {
                      this.state.newItem.desc !== '' ? (this.setState(state => {
                        state.tempItems = [
                          ...state.tempItems,
                          { ...state.newItem }
                        ];
                        state.newItem.desc = '';
                        ++state.newItem.itemId;
                        ++state.newItem.orderNum;

                        state.dataSource_newItemAdded = this.ds.cloneWithRows(state.tempItems)
                        state.changeValue = !isEqual(state.prevItems, state.tempItems)
                      }),
                      alert('add completed')) : alert('input new item');
                      this.refs['newItemTempDescTextInput'].focus();
                    }}
                  />
                </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      </View>
    )
  }
}
