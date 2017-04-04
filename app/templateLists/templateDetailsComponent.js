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
  ScrollView,
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
      // prevItems: [],
      // prevItems: [ ...this.props.state.itemsOfChosenTemplate ],
      // tempItems: [ ...this.props.state.itemsOfChosenTemplate ],
      // tempItems: (() => this.props.state.itemsOfChosenTemplate.map(value => value))(),
      tempItems: [ ...this.props.state.tempItems ],
      hasEmptyOnItemDesc: false,
      emptyItemsRowId: [],
      changeValue: false,
      addItemModalVisible: false,
      newItem: {
        desc: '',
        itemId: parseInt(this.props.state.lastId.items) + 1,
        // orderNum: this.props.state.chosenTemplate.items.map(value => this.props.state.items[value]).sort((data1, data2) => data1.orderNum - data2.orderNum).slice(-1)[0].orderNum + 1,
        orderNum: parseInt(this.props.state.last_orderNum) + 1,
        template: this.props.state.chosenTemplate.title,
        templateId: this.props.state.chosenTemplate.templateId
      },
      newItemDesc: ((tempResult = {}) => {
        this.props.state.itemsOfChosenTemplate.map(value => tempResult[value.itemId] = value.desc)
        return tempResult
      })(),
      modifyExistingItems: {},
      dataSource_tempItems: this.props.state.dataSourceOfItemsOfChosenTemplate || []
    }
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  componentDidMount() {
    console.log('componentDidMount - this.state : ', this.state)
    console.log('componentDidMount - this.props : ', this.props)
    console.log('itemsOfChosenTemplate : ', this.props.state.itemsOfChosenTemplate)
    // console.log('this.props.state.items[8].desc : ', this.props.state.items[8].desc)
    // this.setState({
    //   prevItems: [
    //     ...this.state.tempItems
    //   ]
    // })
    console.log('this.props.state.itemsOfChosenTemplate === this.state.tempItems : ', this.props.state.itemsOfChosenTemplate === this.state.tempItems)
    console.log('isEqual(this.props.state.itemsOfChosenTemplate, this.state.tempItems) : ', isEqual(this.props.state.itemsOfChosenTemplate, this.state.tempItems))
  }

  componentDidUpdate() {
    console.log(`componentDidUpdate - this.props : `, this.props)
    console.log(`componentDidUpdate - this.state : `, this.state)
    console.log(`componentDidUpdate - this.props.state.itemsOfChosenTemplate :`, this.props.state.itemsOfChosenTemplate)
    console.log('this.props.state.itemsOfChosenTemplate === this.state.tempItems : ', this.props.state.itemsOfChosenTemplate === this.state.tempItems)
    console.log('isEqual(this.props.state.itemsOfChosenTemplate, this.state.tempItems) : ', isEqual(this.props.state.itemsOfChosenTemplate, this.state.tempItems))
    // console.log('this.props.state.items[8].desc : ', this.props.state.items[8].desc)
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
      addItem,
      modifyItem
    } = this.props;
    const prevItems = [ ...this.props.state.itemsOfChosenTemplate ];
    // const resetData = () => this.setState(
    //   {
    //     searchText: '',
    //     prevItems: [ ...this.props.state.itemsOfChosenTemplate ],
    //     tempItems: [ ...this.props.state.itemsOfChosenTemplate ],
    //     hasEmptyOnItemDesc: false,
    //     emptyItemsRowId: [],
    //     changeValue: false,
    //     addItemModalVisible: false,
    //     newItemDesc: '',
    //     newItem: {
    //       desc: '',
    //       itemId: this.props.state.lastId.items + 1,
    //       // Below need to be confirm, after new Items add, in the same page, if an user add new Items, below would be wrong.
    //       orderNum: this.props.state.chosenTemplate.items.map(value => this.props.state.items[value]).sort((data1, data2) => data1.orderNum - data2.orderNum).slice(-1)[0].orderNum + 1,
    //       template: this.props.state.chosenTemplate.title,
    //       templateId: this.props.state.chosenTemplate.templateId
    //     },
    //     dataSource_tempItems: this.props.state.dataSourceOfItemsOfChosenTemplate || []
    //   }
    // );
    const saveAlertFn = () => {
      this.state.emptyItemsRowId < this.state.tempItems ? Alert.alert(
        'Confirm Save',
        'You make an existing item empty. If you want to delete it, press Save. Or press Cancel.',
        [
          { text: 'Cancel'},
          { text: 'Save', onPress: () => {
            console.log('this.state.tempItemDesc : ', this.state.tempItemDesc)
            let tempResult = this.state.tempItemDesc
            for(let key in tempResult) {
              tempResult[key].desc == '' && delete tempResult[key]
            }
            saveProcessFn(tempResult);
          }}
        ]
      ) : Alert.alert(
        'Disable To Delete',
        'Each template has more than 1 item.',
        [
          {
            text: 'Confirm'
          }
        ]
      )
    }
    const saveProcessFn = async newItemDesc => {
      await this.setState((prevState, tempResult = {}) => {
        tempResult = {
          changeValue: false,
          tempItems: [
            ...this.state.tempItems.slice(0, this.state.emptyItemsRowId),
            ...this.state.tempItems.slice(this.state.emptyItemsRowId + 1)
          ],
          emptyItemsRowId: [],
          hasEmptyOnItemDesc: false,
        };
        tempResult.dataSource_tempItems = this.ds.cloneWithRows(tempResult.tempItems);
        return tempResult
        // prevState.changeValue = false;
        // prevState.tempItems = [
        //   ...prevState.tempItems.slice(0, prevState.emptyItemsRowId),
        //   ...prevState.tempItems.slice(prevState.emptyItemsRowId + 1)
        // ];
        // prevState.emptyItemsRowId = [];
        // prevState.hasEmptyOnItemDesc = false,
        // prevState.dataSource_tempItems = this.ds.cloneWithRows(prevState.tempItems);
      });
      // Below makes duplicate w/ componentDidUpdate.
      // state.navigatePrevent[route.__navigatorRouteID] && navigatePreventFn(route.__navigatorRouteID, false);
      // state.navigatePrevent[route.passProps.parentTab] && navigatePreventFn(route.passProps.parentTab, false);
      console.log('this.state.modifyExistingItems : ', this.state.modifyExistingItems)
      console.log('Object.keys(this.state.modifyExistingItems).length : ', Object.keys(this.state.modifyExistingItems).length)
      Object.keys(this.state.modifyExistingItems).length > 0 && modifyItem(this.state.modifyExistingItems, route.passProps.chosenTemplate.templateId)
      prevItems.length > this.state.tempItems.length && addItem(state.lastId.items, prevItems.slice(state.itemsOfChosenTemplate.length));
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

    const renderRowItems = (rowData, sectionId, rowId) => {
      // console.log('renderRowItems - rowData : ', rowData)
      const compareResult = this.state.tempItems[rowId] == prevItems[rowId]
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
                // value={rowData.desc}
                value={this.state.newItemDesc[rowData.itemId]}
                // onChangeText={itemText => changeItemText(itemText, rowId, rowData.itemId, itemText == '')}
                onChangeText={itemText => {
                  const emptyStatusBoolean = itemText == '',
                        target_itemId = rowData.itemId;
                  // emptyStatusBoolean && this.setState({
                  //   hasEmptyOnItemDesc: emptyStatusBoolean,
                  //   emptyItemsRowId: [
                  //     ...this.state.emptyItemsRowId,
                  //     rowId
                  //   ]
                  // })
                  let tempdata_tempItems = [ ...this.state.tempItems ];
                  tempdata_tempItems[rowId].desc = itemText
                  this.setState({
                    newItemDesc: {
                      ...this.state.newItemDesc,
                      [rowData.itemId]: itemText
                    },
                    tempItems: [
                      ...tempdata_tempItems
                    ],
                    dataSource_tempItems: this.ds.cloneWithRows(tempdata_tempItems)
                  })
                  !isEqual(prevItems, this.state.tempItems) ? this.setState({
                    changeValue: true,
                    searchText: ''
                  }) : this.setState({ changeValue: false });
                  console.log('prevItems === this.state.tempItems : ', prevItems === this.state.tempItems);
                  console.log('isEqual(prevItems, this.state.tempItems) : ', isEqual(prevItems, this.state.tempItems));
                  console.log('changeItemText - this.state : ', this.state)
                  //
                  // this.setState(prevState => {
                  //   prevState.hasEmptyOnItemDesc = emptyStatusBoolean;
                  //   prevState.hasEmptyOnItemDesc ? prevState.emptyItemsRowId = [
                  //     ...prevState.emptyItemsRowId,
                  //     rowId
                  //   ] : null;
                  //   // prevState.emptyItemsRowId.length >= prevState.tempItems.length && Alert.alert(
                  //   //   'Disable Delete Item',
                  //   //   'Each template has more than 1 item.',
                  //   //   [
                  //   //     { text: 'Confirm', onPress: () => () => {
                  //   //       prevState.newItemDesc[target_itemId] = prevItems[rowId].desc
                  //   //       return prevState
                  //   //       }
                  //   //     }
                  //   //   ]
                  //   // );
                  //   // If all items is empty, below should not run.
                  //   // console.log('prevItems === this.state.tempItems : ', prevItems === this.state.tempItems);
                  //   // console.log('isEqual(prevItems, this.state.tempItems) : ', isEqual(prevItems, this.state.tempItems));
                  //
                  //   console.log('before - prevItems : ', prevItems)
                  //   // console.log('before - prevState.tempItems : ', prevState.tempItems)
                  //
                  //   // prevState.tempItems[rowId].desc = itemText;
                  //   prevState.newItemDesc[target_itemId] = itemText
                  //   prevState.tempItems.map(value => {
                  //     (value.itemId == target_itemId) && (value.desc = itemText);
                  //   })
                  //   console.log('after - prevItems : ', prevItems)
                  //   // console.log('after - prevState.tempItems : ', prevState.tempItems)
                  //   prevState.dataSource_tempItems = this.ds.cloneWithRows(prevState.tempItems);
                  //   !isEqual(prevItems, prevState.tempItems) ? (prevState.changeValue = true, prevState.searchText = '') : prevState.changeValue = false;
                  //   console.log('prevItems === prevState.tempItems : ', prevItems === prevState.tempItems);
                  //   console.log('isEqual(prevItems, prevState.tempItems) : ', isEqual(prevItems, prevState.tempItems));
                  //   console.log('changeItemText - prevState : ', prevState)
                  //   return prevState
                  // })
                }}
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
                  Category : {route.passProps.chosenTemplate.category}, Items({prevItems.length})
                </FormLabel>
              )
        }
        <List>
          <ListView
            // dataSource={this.state.changeValue ?  this.state.dataSource_tempItems : state.dataSourceOfItemsOfChosenTemplate}
            dataSource={this.state.dataSource_tempItems}
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
        <ScrollView>
          <Text>
            this.state.newItemDesc : {JSON.stringify(this.state.newItemDesc, null, 1)}
            {'\n'}
            this.props.state.itemsOfChosenTemplate[1] : {JSON.stringify(this.props.state.itemsOfChosenTemplate[1], null, 1)}
            {'\n'}
            {/* this.state.prevItems : {JSON.stringify(this.state.prevItems, null, 1)} */}
            {/* {'\n'} */}
            this.props.state.dataSourceOfItemsOfChosenTemplate._dataBlob.s1[1].desc : {this.props.state.dataSourceOfItemsOfChosenTemplate._dataBlob.s1[1].desc}
          </Text>
        </ScrollView>
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
                      onChangeText={newItemText => this.setState((prevState, tempResult = {}) => {
                        tempResult = {
                          newItem: {
                            ...this.state.newItem,
                            desc: newItemText,
                          },
                          changeValue: !isEqual(prevItems, this.state.tempItems)
                        }
                        return tempResult
                        // prevState.newItem.desc = newItemText;
                        // prevState.changeValue = !isEqual(prevItems, prevState.tempItems);
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
                      this.state.newItem.desc !== '' ? (this.setState((prevState, tempResult = {}) => {
                        tempResult = {
                          tempItems: [
                            ...this.state.tempItems,
                            {
                              ...this.state.newItem
                            }
                          ],
                          newItem: {
                            ...this.state.newItem,
                            itemId: this.state.newItem.itemId + 1,
                            orderNum: this.state.newItem.orderNum + 1,
                            desc: ''
                          }
                        }
                        tempResult.dataSource_tempItems = this.ds.cloneWithRows(tempResult.tempItems)
                        tempResult.changeValue = !isEqual(prevItems, tempResult.tempItems)
                        return tempResult
                        // prevState.tempItems = [
                        //   ...prevState.tempItems,
                        //   { ...prevState.newItem }
                        // ];
                        // prevState.newItem.desc = '';
                        // ++prevState.newItem.itemId;
                        // ++prevState.newItem.orderNum;

                        // prevState.dataSource_tempItems = this.ds.cloneWithRows(prevState.tempItems)
                        // prevState.changeValue = !isEqual(prevItems, prevState.tempItems)
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
