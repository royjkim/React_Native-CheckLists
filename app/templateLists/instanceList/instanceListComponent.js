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
      searchText: {
        instancesOfChosenTemplate: '',
        itemsOfChosenTemplate: ''
      },
      // tempItemDesc: {},
      prevItemDesc: ((tempData = {}) => {
        this.props.state.itemsOfChosenTemplate.map(value => tempData[value.itemId] = value.desc)
        return tempData
      })(),
      tempItemDesc: ((tempData = {}) => {
        this.props.state.itemsOfChosenTemplate.map(value => tempData[value.itemId] = value.desc)
        return tempData
      })(),
      hasEmptyOnItemDesc: false,
      changeValue: false,
      addItemModalVisible: false,
      newItemTempDesc: '',
      newItemTemp: {
        desc: '',
        itemId: this.props.state.lastId.items,
        orderNum: this.props.state.chosenTemplate.items.map(value => this.props.state.items[value]).sort((data1, data2) => data1.orderNum - data2.orderNum).slice(-1)[0].orderNum,
        template: this.props.state.chosenTemplate.title,
        templateId: this.props.state.chosenTemplate.templateId
        // itemId: parseInt(this.props.state.lastId.items),
        // orderNum: parseInt(this.props.state.items[this.props.state.chosenTemplate.items.sort((data1, data2) => data1 - data2).slice(-1)[0]].orderNum),
        // template: String(this.props.state.chosenTemplate.title),
        // templateId: parseInt(this.props.state.chosenTemplate.templateId)
      },
      newItems: this.props.state.itemsOfChosenTemplate || [],
      dataSource_newItemAdded: this.props.state.dataSourceOfItemsOfChosenTemplate || []
    }
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.initialStateDataFn = inputData => {

      let tempData = {}
      // this.props.state.itemsOfChosenTemplate.map(value => tempData[value.itemId] = value.desc)
      console.log('parameter - inputData : ', inputData)
      console.log('this.props.state.itemsOfChosenTemplate : ', this.props.state.itemsOfChosenTemplate)
      inputData.map(value => tempData[value.itemId] = value.desc)
      console.log('tempData : ', tempData)
      // this.setState(state => ({
      //   tempItemDesc: tempData,
      //   prevItemDesc: tempData
      //   // tempItemDesc: {
      //   //   ...tempData
      //   // },
      //   // prevItemDesc: {
      //   //   ...tempData
      //   // }
      // }))
      this.setState({
          tempItemDesc: tempData,
          prevItemDesc: tempData
      })
      console.log('this.initialStateDataFn - this.state : ', this.state)
    };
    // this.initialStateDataFn(this.props.state.itemsOfChosenTemplate);
  }

  componentWillMount() {
    // this.initialStateDataFn(this.props.state.itemsOfChosenTemplate)
    console.log(`componentWillMount - this.state : `, this.state)
    // console.log(`before - this.state : `, this.state)
    // let tempData = {}
    // // this.props.state.itemsOfChosenTemplate.map(value => tempData[value.itemId] = value.desc)
    // // console.log('parameter - inputData : ', inputData)
    // console.log('this.props.state.itemsOfChosenTemplate : ', this.props.state.itemsOfChosenTemplate)
    // this.props.state.itemsOfChosenTemplate.map(value => tempData[value.itemId] = value.desc)
    // console.log('tempData : ', tempData)
    // // this.setState(state => ({
    // //   test: 'melong',
    // //   tempItemDesc: tempData,
    // //   prevItemDesc: tempData
    // // //   // tempItemDesc: {
    // // //   //   ...tempData
    // // //   // },
    // // //   // prevItemDesc: {
    // // //   //   ...tempData
    // // //   // }
    // // }))
    // this.setState({
    //   test: 'melong',
    // })
    // console.log(`after - this.state : `, this.state)

  }

  // componentWillUpdate(nextProps, nextState) {
  //   console.log(`componentWillUpdate - nextState : `, nextState)
  //   // console.log('nextState.newItems : ', nextState.newItems)
  //   // console.log('this.state.newItems : ', this.state.newItems)
  //   // isEqual(nextState.newItems, this.state.newItems) || this.setState({
  //   //   dataSource_newItemAdded: this.ds.cloneWithRows(nextState.newItems)
  //   // })
  //   return isEqual(nextProps, this.props) && !isEqual(nextState, this.state) ? true : false
  // }

  componentDidUpdate() {
    console.log(`componentDidUpdate - this.state : `, this.state)
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
    const { route, navigator, state, searchBarText, navigatePreventFn } = this.props;
    const resetData = () => {
      this.setState(prevState => ({
        searchText: {
          instancesOfChosenTemplate: '',
          itemsOfChosenTemplate: ''
        },
        tempItemDesc: {},
        hasEmptyOnItemDesc: false,
        changeValue: false,
        addItemModalVisible: false,
        newItemTempDesc: '',
        newItemTemp: {
          desc: '',
          // itemId: parseInt(this.props.state.lastId.items),
          // orderNum: parseInt(this.props.state.items[this.props.state.chosenTemplate.items.sort((data1, data2) => data2.orderNum - data1.orderNum).slice(-1)[0]].orderNum),
          // template: String(this.props.state.chosenTemplate.title),
          // templateId: parseInt(this.props.state.chosenTemplate.templateId)
          itemId: this.props.state.lastId.items,
          orderNum: this.props.state.items[this.props.state.chosenTemplate.items.sort((data1, data2) => data2.orderNum - data1.orderNum).slice(-1)[0]].orderNum,
          template: this.props.state.chosenTemplate.title,
          templateId: this.props.state.chosenTemplate.templateId
        },
        newItems: this.props.state.itemsOfChosenTemplate || [],
        dataSource_newItemAdded: this.props.state.dataSourceOfItemsOfChosenTemplate || []
      }))
      this.initialStateDataFn(this.props.state.itemsOfChosenTemplate)
    };
    const saveAlertFn = () => {
      Alert.alert(
        'Confirm Save',
        'You make an existing item empty. If you want to delete it, press Save. Or press Cancel.',
        [
          { text: 'Cancel' },
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
    const saveProcessFn = newItemDesc => {
      this.setState(prevState => ({
        changeValue: false,
        prevItemDesc: newItemDesc ? newItemDesc : prevState.tempItemDesc,
        hasEmptyOnItemDesc: false
      })),
      state.navigatePrevent[route.__navigatorRouteID] && navigatePreventFn(route.__navigatorRouteID, false);
      state.navigatePrevent[route.passProps.parentTab] && navigatePreventFn(route.passProps.parentTab, false);
      alert('save complete');
      this.props.navigator.pop()
    }
    const renderRowInstances = (rowData, sectionID) => <ListItem
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
    />;
    const changeItemText = (itemText, chosen_itemId, emptyStatusBoolean) => prevState => {
      let tempResult = {
        tempItemDesc: {
          ...prevState.tempItemDesc,
          // [chosen_itemId]: itemText == '' ? prevState.prevItemDesc[chosen_itemId] : itemText
          [chosen_itemId]: itemText
        },
        hasEmptyOnItemDesc: emptyStatusBoolean,
        changeValue: prevState.changeValue
      }
      tempResult.changeValue = !isEqual(prevState.prevItemDesc, tempResult.tempItemDesc)
      return tempResult
    }
    const renderRowItems = rowData => {
      return (
        <View
          key={rowData.itemId}
          style={{
            // flexDirection: 'row',
            marginHorizontal: 10,
            marginVertical: 10,
            // flex: 1,
            borderColor: this.state.prevItemDesc[rowData.itemId] == this.state.tempItemDesc[rowData.itemId] ? '#C1C1C1' : '#159589',
            // borderBottomWidth: this.state.prevItemDesc[rowData.itemId] == rowData.desc ? 0 : 1.5,
            borderBottomWidth: 1.5,
            marginHorizontal: 10
          }}
          >
              <TextInput
                value={this.state.tempItemDesc[rowData.itemId]}
                onChangeText={itemText => this.setState(changeItemText(itemText, rowData.itemId, itemText == ''))}
                placeholder={this.state.prevItemDesc[rowData.itemId]}
                placeholderTextColor='#86939D'
                style={{
                  // flex: 1,
                  height: 23,
                  color: this.state.prevItemDesc[rowData.itemId] == this.state.tempItemDesc[rowData.itemId] ? '#86939D' : '#159589',
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
            this.setState(state => ({
              searchText: {
                ...state.searchText,
                itemsOfChosenTemplate: searchText
              }
            }))
            searchBarText(searchText, 'itemsOfChosenTemplate')
          }}
          placeholder='Search Items'
        />) : null}
        <FormLabel>
          Template : {route.passProps.chosenTemplate.title}
        </FormLabel>
        {this.state.searchText.itemsOfChosenTemplate !== ''
          ? (
              <FormLabel>
                Category : {route.passProps.chosenTemplate.category}, Items({state.itemsLengthOfChosenTemplate}, searched)
              </FormLabel>
            )
          : this.state.changeValue ? (
            <FormLabel>
              Category : {route.passProps.chosenTemplate.category}, Items({Object.keys(this.state.tempItemDesc).length}, new item added)
            </FormLabel>
          ) : (
                <FormLabel>
                  Category : {route.passProps.chosenTemplate.category}, Items({state.itemsLengthOfChosenTemplate})
                </FormLabel>
              )
        }
        <List>
          <ListView
            dataSource={this.state.searchText.itemsOfChosenTemplate == '' ? this.state.dataSource_newItemAdded : state.dataSourceOfItemsOfChosenTemplate}
            enableEmptySections={true}
            renderRow={renderRowItems}
            style={{ maxHeight: 200 }}
          />
        </List>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginRight: 5
          }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
              }}
              onPress={() => this.setState({ addItemModalVisible: true })}
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
                add
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

        <View>
          <View style={{ marginVertical: 15, height: 2 }} />
          <SearchBar
            lightTheme
            round={true}
            placeholder='Search Instances'
            onChangeText={searchText => {
              this.setState(state => ({
                searchText: {
                  ...state,
                  instancesOfChosenTemplate: searchText
                }
              }))
              searchBarText(searchText, 'instancesOfChosenTemplate');
            }}
          />
          {this.state.searchText.instancesOfChosenTemplate !== ''
            ? (
                <FormLabel>
                  ▼ Instance List of {route.title} : {state.dataSourceInstancesOfChosenTemplate._dataBlob.s1.length}(searched)
                </FormLabel>
              )
            : (
                <FormLabel>
                  ▼ Instance List of {route.title} : {state.dataSourceInstancesOfChosenTemplate._dataBlob.s1.length}
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
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.addItemModalVisible}
          >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              justifyContent: 'center',
            }}
            >
            <View
              style={{
                flex: 1
              }}
              >
              <TouchableOpacity
                style={{
                  flex: 1,
                }}
                onPress={() => this.state.newItemTempDesc == '' ? this.setState({ addItemModalVisible: false }) : alert('press add button, after input a new item.')}
              />
            </View>
            <View
              style={{
                flex: 0,
                height: 110,
                backgroundColor: 'white',
                // paddingBottom: 20,
                borderTopWidth: 1,
                borderColor: '#86939D',
                // paddingBottom: 20,
                // paddingVertical: 20,
                borderWidth: 1,
                // borderColor: '#9E9E9E',
              }}
              >
                <FormLabel>
                  New Item
                </FormLabel>
                <View
                  style={{ flexDirection: 'row'}}
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
                      value={this.state.newItemTempDesc}
                      onChangeText={newItemTempDesc => this.setState({ newItemTempDesc })}
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
                      this.setState(prevState => {
                        // let tempResult = {
                        //   newItemTemp: {
                        //     desc: prevState.newItemTempDesc,
                        //     itemId: prevState.itemId + 1,
                        //     orderNum: prevState.orderNum + 1,
                        //     template: prevState.template,
                        //     templateId: prevState.templateId,
                        //   },
                        //   newItems: prevState.newItems
                        // }
                        console.log(`prevState : `, prevState)
                        // console.log('this.state : ', this.state)
                        let tempResult = {
                          // newItems: this.state.newItems.concat({
                          //   desc: this.state.newItemTempDesc,
                          //   itemId: this.state.itemId + 1,
                          //   orderNum: this.state.orderNum + 1,
                          //   template: this.state.template,
                          //   templateId: this.state.templateId,
                          // }),
                          newItems: [
                            ...prevState.newItems,
                            {
                              desc: prevState.newItemTempDesc,
                              itemId: prevState.newItemTemp.itemId + 1,
                              orderNum: prevState.newItemTemp.orderNum + 1,
                              template: prevState.newItemTemp.template,
                              templateId: prevState.newItemTemp.templateId,
                            }
                          ],
                          newItemTemp: {
                            desc: '',
                            itemId: prevState.newItemTemp.itemId + 1,
                            orderNum: prevState.newItemTemp.orderNum + 1,
                            template: prevState.newItemTemp.template,
                            templateId: prevState.newItemTemp.templateId,
                          },
                          newItemTempDesc: '',
                          tempItemDesc: {
                            ...prevState.tempItemDesc,
                            [prevState.newItemTemp.itemId + 1]: prevState.newItemTempDesc
                          },
                          // prevItemDesc: {
                          //   ...prevState.prevItemDesc,
                          //   [prevState.newItemTemp.itemId + 1]: prevState.newItemTempDesc
                          // }

                        }
                        tempResult.dataSource_newItemAdded = this.ds.cloneWithRows(tempResult.newItems)
                        tempResult.changeValue = !isEqual(prevState.prevItemDesc, tempResult.tempItemDesc)
                        console.log('tempResult : ', tempResult)
                        return tempResult
                      })
                      // this.initialStateDataFn(this.state.newItems)
                      alert('add completed')}}
                  />
                </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
