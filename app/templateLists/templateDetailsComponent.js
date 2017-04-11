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
import { isEqual, cloneDeep } from 'lodash'

import ChosenInstanceDetailsContainer from './instanceList/chosenInstanceDetails/chosenInstanceDetailsContainer'
import InstanceListContainer from './instanceList/instanceListContainer'

export default class TemplateDetailsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      tempItems: cloneDeep(this.props.state.itemsOfChosenTemplate),
      prevItems: Object.freeze(cloneDeep(this.props.state.itemsOfChosenTemplate)),
      emptyItemsRowId: [],
      changeValue: false,
      addItemModalVisible: false,
      newItem: {
        desc: '',
        itemId: parseInt(this.props.state.lastId.items) + 1,
        orderNum: parseInt(this.props.state.last_orderNum) + 1,
        template: this.props.state.chosenTemplate.title,
        templateId: this.props.state.chosenTemplate.templateId
      },
      modifyExistingItems: {},
      tempTemplateTitle: this.props.route.passProps.chosenTemplate.title,
      prevTemplateTitle: this.props.route.passProps.chosenTemplate.title,
      changeValue_templateTitle: false,
      dataSource_tempItems: this.props.state.dataSourceOfItemsOfChosenTemplate || []
    };
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  componentWillMount() {
    this.props.state.existOrNot_chosenTemplate || Alert.alert(
      'Template Deleted',
      'Because of Current Template Deleted. Page would be directed to back.',
      [
        { text: 'Confirm', onPress: () => this.props.navigator.pop() }
      ]
    );
  }

  componentWillUpdate(nextProps) {
    // Below could be cause ignoring 'navigate prevent data' which is to be canceled.
    nextProps.state.existOrNot_chosenTemplate || Alert.alert(
      'Template Deleted',
      'Because of Current Template Deleted. Page would be directed to back.',
      [
        { text: 'Confirm', onPress: () => this.props.navigator.pop() }
      ]
    );
  }

  componentDidUpdate() {
    // console.log(`componentDidUpdate - this.props : `, this.props)
    // console.log(`componentDidUpdate - this.state : `, this.state)

    const { navigatePrevent, triedNavigateWhenPrevented } = this.props.state,
          __navigatorRouteID = this.props.route.__navigatorRouteID,
          parentTab = this.props.route.passProps.parentTab,
          navigatePreventFn = this.props.navigatePreventFn,
          triedNavigateWhenPreventedFn = this.props.triedNavigateWhenPreventedFn;

    // Below is for when the item text changed , make redux navigate disable.
    (this.state.changeValue || this.state.changeValue_templateTitle) ? (navigatePrevent[__navigatorRouteID] || navigatePreventFn(__navigatorRouteID, true),
      navigatePrevent[parentTab] || navigatePreventFn(parentTab, true))
        : (navigatePrevent[__navigatorRouteID] && navigatePreventFn(__navigatorRouteID, false),
          navigatePrevent[parentTab] && navigatePreventFn(parentTab, false));

    // Below is for alert let an user know 'save before navigate', then make redux 'alert completed'.
    triedNavigateWhenPrevented[__navigatorRouteID] && (alert('press save button to save changes'), triedNavigateWhenPreventedFn(__navigatorRouteID, false));
    triedNavigateWhenPrevented[parentTab] && (alert('press save button to save changes'), triedNavigateWhenPreventedFn(parentTab, false));

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
      modifyItem,
      modifyTemplate,
    } = this.props;
    const resetData = () => this.setState({
        searchText: '',
        tempItems: cloneDeep(this.props.state.itemsOfChosenTemplate),
        prevItems: Object.freeze(cloneDeep(this.props.state.itemsOfChosenTemplate)),
        emptyItemsRowId: [],
        changeValue: false,
        addItemModalVisible: false,
        newItem: {
          desc: '',
          itemId: parseInt(this.props.state.lastId.items) + 1,
          orderNum: parseInt(this.props.state.last_orderNum) + 1,
          template: this.props.state.chosenTemplate.title,
          templateId: this.props.state.chosenTemplate.templateId
        },
        modifyExistingItems: {},
        dataSource_tempItems: this.props.state.dataSourceOfItemsOfChosenTemplate || []
      });
    const saveAlertFn = () => {
      this.state.emptyItemsRowId < this.state.tempItems ? Alert.alert(
        'Confirm Save',
        'You are making an existing item empty. If you want to delete it, press Save. Or press Cancel. Even though the item deleted, it won\'t be deleted neither on each instance.',
        [
          { text: 'Cancel'},
          { text: 'Save', onPress: () => saveProcessFn() }
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
    const saveProcessFn = async () => {
      this.state.changeValue_templateTitle && modifyTemplate(state.chosenTemplate.templateId, this.state.tempTemplateTitle);
      await this.setState(prevState => {
        prevState.changeValue = false;
        prevState.emptyItemsRowId.length > 0 && (
        prevState.emptyItemsRowId.map(value => delete prevState.tempItems[value]),
        prevState.emptyItemsRowId = []);
        prevState.dataSource_tempItems = this.ds.cloneWithRows(prevState.tempItems);
        prevState.prevItems = Object.freeze(cloneDeep(prevState.tempItems));
        prevState.prevTemplateTitle = prevState.tempTemplateTitle;
        prevState.changeValue_templateTitle = false;
      });
      Object.keys(this.state.modifyExistingItems).length > 0 && modifyItem(this.state.modifyExistingItems, route.passProps.chosenTemplate.templateId)
      this.state.prevItems.length < this.state.tempItems.length && addItem(state.lastId.items, this.state.tempItems.slice(state.itemsOfChosenTemplate.length));
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
    const changeItemText = (itemText, rowId, target_itemId, emptyStatusBoolean) => prevState => {
      emptyStatusBoolean && (prevState.emptyItemsRowId.push(rowId));
      prevState.emptyItemsRowId.length >= prevState.tempItems.length ? Alert.alert(
        'Disable Delete Item',
        'Each template has more than 1 item.',
        [
          { text: 'Confirm', onPress: () => this.setState(prevState => {
            prevState.tempItems[rowId].desc = prevState.prevItems[rowId].desc;
            itemText = prevState.prevItems[rowId].desc;
            prevState.emptyItemsRowId.pop();
            prevState.modifyExistingItems.hasOwnProperty(target_itemId) && (prevState.modifyExistingItems[target_itemId] = itemText);
          })
          }
        ]
      ) : rowId > prevState.tempItems.length || (prevState.modifyExistingItems[target_itemId] = itemText);
      // Below is for handing on existing data.
      prevState.tempItems[rowId].desc = itemText;
      prevState.dataSource_tempItems = this.ds.cloneWithRows(prevState.tempItems);
      !isEqual(this.state.prevItems, prevState.tempItems) ? (prevState.changeValue = true, prevState.searchText = '') : prevState.changeValue = false;
    };
    const renderRowItems = (rowData, sectionId, rowId) => {
      const compareResult = isEqual(this.state.tempItems[rowId], this.state.prevItems[rowId]);
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
                value={this.state.tempItems[rowId].desc}
                onChangeText={itemText => this.setState(changeItemText(itemText, rowId, rowData.itemId, itemText == ''))}
                placeholder={this.state.prevItems[rowId].desc}
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
        {this.state.changeValue || (<SearchBar
          lightTheme
          round={true}
          onChangeText={searchText => {
            this.setState({
              searchText
            });
            searchBarText(searchText, 'itemsOfChosenTemplate');
          }}
          placeholder='Search Items'
          value={this.state.searchText}
        />)}
        {/* <FormLabel>
          Template : {route.passProps.chosenTemplate.title}
        </FormLabel> */}
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginVertical: 10
          }}
          >
            <Text
              style={{
                color: '#86939D',
                fontWeight: 'bold',
                marginLeft: 8
              }}
              >
              Template Name :
            </Text>
            <View
              style={{
                flex: 1,
                borderColor: this.state.changeValue_templateTitle ? '#159589' : '#CBD2D9',
                // '#C1C1C1' : '#FF2A1A',
                borderBottomWidth: 1.5,
                marginHorizontal: 10
              }}
              >
              <TextInput
                value={this.state.tempTemplateTitle}
                onChangeText={templatTitleText => {
                  templatTitleText == '' && Alert.alert(
                    'Delete Disable',
                    'Template name shouldn\'t be empty.',
                    [
                      { text: 'Confirm', onPress: () => this.setState({
                          tempTemplateTitle: this.state.prevTemplateTitle,
                          changeValue_templateTitle: false
                        })
                      }
                    ]
                  );
                  this.setState(prevState => {
                    prevState.tempTemplateTitle = templatTitleText;
                    prevState.changeValue_templateTitle = !(prevState.tempTemplateTitle === prevState.prevTemplateTitle);
                  })
                }}
                placeholder={this.state.prevTemplateTitle}
                style={{
                  flex: 1,
                  color: this.state.changeValue_templateTitle ? '#159589' : '#605E60',
                  textAlign: 'center',
                  // marginBottom: 2
                }}
              />
            </View>
        </View>
        {this.state.searchText !== ''
          ? (
              <FormLabel>
                Category : {route.passProps.chosenTemplate.category} / Items({state.itemsLengthOfChosenTemplate}, searched)
              </FormLabel>
            )
          : this.state.changeValue ? (
            <FormLabel>
              Category : {route.passProps.chosenTemplate.category} / Items({this.state.tempItems.length}), new item added)
            </FormLabel>
          ) : (
                <FormLabel>
                  Category : {route.passProps.chosenTemplate.category} / Items({this.state.prevItems.length})
                </FormLabel>
              )
        }
        <List>
          <ListView
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
        {(this.state.changeValue || this.state.changeValue_templateTitle) && (<View>
              <View
                style={{ height: 10 }}
              />
              <Button
                icon={{ name: 'check' }}
                title='Save'
                backgroundColor='#159589'
                onPress={() => this.state.emptyItemsRowId.length > 0 ? saveAlertFn() : saveProcessFn() }
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
            )}
        <View style={{ height: 10 }} />
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
              // title: `Instance List of ${route.title}`,
              title: 'Instance List',
              component: InstanceListContainer,
            }
          )}
        />
        <View style={{ height: 10 }} />
        <Button
          icon={{ name: 'delete-forever' }}
          title='Delete template'
          onPress={() => alert('delete template')}
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
                      onChangeText={newItemText => this.setState(prevState => {
                        prevState.newItem.desc = newItemText;
                        prevState.changeValue = !isEqual(prevState.prevItems, prevState.tempItems);
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
                      this.state.newItem.desc !== '' ? (this.setState(prevState => {
                        prevState.tempItems = [
                          ...prevState.tempItems,
                          { ...prevState.newItem }
                        ];
                        prevState.newItem.desc = '';
                        ++prevState.newItem.itemId;
                        ++prevState.newItem.orderNum;

                        prevState.dataSource_tempItems = this.ds.cloneWithRows(prevState.tempItems)
                        prevState.changeValue = !isEqual(prevItems, prevState.tempItems)
                      }), alert('add completed'))
                        : alert('input new item');
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
