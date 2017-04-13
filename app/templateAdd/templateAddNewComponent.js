import React from 'react'
import {
  View,
  Text,
  TextInput,
  Modal,
  ListView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import styles from '../components/styles'
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
  List,
  ListItem,
  Icon,
} from 'react-native-elements';
import { isEqual, cloneDeep } from 'lodash';
import TemplateCategoryModal from './templateCategoryModal';
import ItemsInputedListModalContainer from './itemsInputedListModalContainer';
import InstanceListContainer from '../templateLists/instanceList/instanceListContainer';


export default class TemplateAddNewComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      categoryListModalVisible: false,
      templateName: '',
      chosenCategory: '',
      itemsInputedListModalVisible: false,
      tempNewItemDesc: '',
      newItem: {
        desc: '',
        itemId: this.props.state.lastId.items + 1,
        // itemId: 0,
        orderNum: 0,
        // templateId: this.props.state.lastId.templates + 1
        templateId: 0
      },
      tempItems: [],
      prevItems: [],
      dataSourceNewAddedItems: [],
      changeValue: false,
      save: false
    }
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  componentWillMount() {
    if(this.props.route.passProps.chosenTemplate) {
      const { chosenTemplate } = this.props.route.passProps
      const tempSorted_newItems = chosenTemplate.items.map(value => ({
        ...this.props.state.items[value],
        templateId: this.props.state.lastId.templates + 1
      })).sort((data1, data2) => data2.orderNum - data1.orderNum)
      this.setState(prevState => {
        // prevState.templateName = chosenTemplate.title || '';
        prevState.templateName = '';
        prevState.chosenCategory = chosenTemplate.category || '';
        prevState.newItem = {
          desc: '',
          itemId: this.props.state.lastId.items + 1,
          orderNum: tempSorted_newItems.length > 0 ? tempSorted_newItems[0].orderNum : 0,
          templateId: this.props.state.lastId.templates + 1
        };
        // prevState.prevItems = [
        //   ...chosenTemplate.items.map(value => ({
        //     ...this.props.state.items[value],
        //   })).sort((data1, data2) => data2.orderNum - data1.orderNum)
        // ];
        prevState.prevItems = Object.freeze([
          ...chosenTemplate.items.map((value, index) => ({
            ...this.props.state.items[value],
            itemId: prevState.newItem.itemId + index,
            templateId: this.props.state.items[value].templateId + 1
          })).sort((data1, data2) => data2.orderNum - data1.orderNum)
        ]);
        prevState.newItem.itemId = prevState.prevItems.slice(-1)[0].itemId + 1;
        // prevState.tempItems = [ ...prevState.prevItems ];
        prevState.tempItems = cloneDeep(prevState.prevItems);
      })
    }
    this.setState(prevState => {
      prevState.dataSourceNewAddedItems = this.ds.cloneWithRows(prevState.tempItems || []);
    })
  }

  componentDidUpdate() {
    const { navigatePrevent, triedNavigateWhenPrevented } = this.props.state,
          __navigatorRouteID = this.props.route.__navigatorRouteID,
          parentTab = this.props.route.passProps.parentTab,
          navigatePreventFn = this.props.navigatePreventFn,
          triedNavigateWhenPreventedFn = this.props.triedNavigateWhenPreventedFn,
          { chosenTemplate } = this.props.route.passProps;

    (chosenTemplate && this.state.templateName !== chosenTemplate.title && !this.state.save) || this.state.tempNewItemDesc !== '' || !isEqual(this.state.prevItems, this.state.tempItems) ?
      this.state.changeValue || this.setState({ changeValue: true })
        : this.state.changeValue && this.setState({ changeValue: false })

    this.state.changeValue ? (navigatePrevent[__navigatorRouteID] || navigatePreventFn(__navigatorRouteID, true), navigatePrevent[parentTab] || navigatePreventFn(parentTab, true)) : (navigatePrevent[__navigatorRouteID] && navigatePreventFn(__navigatorRouteID, false), navigatePrevent[parentTab] && navigatePreventFn(parentTab, false));

    (triedNavigateWhenPrevented[__navigatorRouteID] || triedNavigateWhenPrevented[parentTab]) && (Alert.alert(
        'Save needed',
        'Press save button to complete adding template.',
        [
          {
            text: 'Cancel Adding', onPress: () => this.props.navigator.pop()
          },
          {
            text: 'Keep Adding'
          }
        ]
      ),
      triedNavigateWhenPrevented[__navigatorRouteID] && triedNavigateWhenPreventedFn(__navigatorRouteID, false),
      triedNavigateWhenPrevented[parentTab] && triedNavigateWhenPreventedFn(parentTab, false));
  }

  render() {
    const {
      route,
      navigator,
      state,
      addTemplateCategory,
      addTemplate,
      navigatePreventFn,
    } = this.props
    const categoryModalToggle = () => this.setState({ categoryListModalVisible: !this.state.categoryListModalVisible })
    const categoryChosen = chosenCategory => this.setState({ chosenCategory })
    const categoryAdd = newCategory => {
      this.setState({
        categoryList: this.state.categoryList.concat({
          title: newCategory,
          icon: 'rowing'
        })
      })
      this.setState({
        dataSource: this.ds.cloneWithRows(this.state.categoryList)
      })
    }
    const itemsInputedListModalToggle = () => this.setState({ itemsInputedListModalVisible: !this.state.itemsInputedListModalVisible })
    const deleteAlert = (chosen_rowData, rowId) => {
      rowId = parseInt(rowId)
      Alert.alert(
        'Delete Confirm',
        // 'Do you want to delete this item?',
        `Do you want to delete ${chosen_rowData.desc}?`,
        [
          { text: 'Cancel' },
          { text: 'Delete', onPress: () => {
              this.state.tempItems.length > 1 ? this.setState(prevState => {
              prevState.tempItems = [
                ...prevState.tempItems.slice(0, rowId),
                ...prevState.tempItems.slice(rowId + 1)
              ];
              const lastOrderNumerOfTempItems = prevState.tempItems.length;
              prevState.tempItems.map((value, index) => {
                value.itemId = state.lastId.items + 1 + index;
                value.orderNum = lastOrderNumerOfTempItems - index;
              });
              prevState.newItem.itemId = prevState.tempItems.slice(-1)[0].itemId + 1;
              prevState.newItem.orderNum = prevState.prevItems.length + 1;
              prevState.dataSourceNewAddedItems = this.ds.cloneWithRows(prevState.tempItems)
            }) : Alert.alert(
              'Delete Disable',
              'Template should have at least 1 item.',
              [
                {
                  text: 'Confirm'
                }
              ]
            );
            }
          }
        ]
      );
    }
    const renderRow = (rowData, sectionId, rowId) => (
      <ListItem
        key={rowData.itemId}
        title={String(rowData.desc || 'none')}
        subtitle={`orderNum : ${String(rowData.orderNum)}, templateId : ${rowData.templateId}, itemId: ${rowData.itemId}`}
        onPress={() => deleteAlert(rowData, rowId)}
        underlayColor='#C0C0C0'
        hideChevron
      />
    )
    return (
      <View style={styles.bodyContainer}>
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
              Template Title :
            </Text>
            <View
              style={{
                flex: 1,
                borderColor: this.state.templateName.length > 0 ? '#C1C1C1' : '#FF2A1A',
                borderBottomWidth: 1.5,
                marginHorizontal: 10
              }}
              >
              <TextInput
                value={this.state.templateName}
                onChangeText={templateName => templateName !== '' && (this.setState({ templateName }))}
                // placeholder='(at leat 3 characters)'
                // placeholder={route.passProps.chosenTemplate.title || ''}
                autoFocus={true}
                style={{
                  flex: 1,
                  color: this.state.templateName ? '#605E60' : '#FF2A1A',
                  textAlign: 'center',
                  // marginBottom: 2
                }}
              />
            </View>
        </View>
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
              Template Category :
            </Text>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => this.setState({ categoryListModalVisible: true })}
              >
                <Text
                  style={{
                    marginHorizontal: 20,
                    marginBottom: 5,
                    // marginVertical: 15,
                    // color: this.state.chosenCategory ? '#605E60' : '#9E9E9E',
                    color: this.state.chosenCategory ? '#605E60' : '#9E9E9E',
                    textAlign: 'center'
                  }}
                  >
                  {this.state.chosenCategory ? this.state.chosenCategory : 'choose category'}
                </Text>
                <View
                  style={{
                    backgroundColor: this.state.chosenCategory ? '#C1C1C1' : '#FF2A1A',
                    height: 1.5,
                    // borderWidth: 1,
                    // borderBottomWidth: 1,
                    // borderColor: 'gray',
                    marginHorizontal: 10
                  }}
                />
            </TouchableOpacity>
        </View>
        <FormLabel>
          New Item
        </FormLabel>
        <View
          style={{ flexDirection: 'row' }}
          >
          <View
            style={{
              flex: 1,
              // borderWidth: 1
            }}
            >
            <FormInput
              ref='newItemFormInput'
              textInputRef='newItemText'
              value={this.state.tempNewItemDesc}
              placeholder='input item'
              placeholderTextColor='#FF7F7C'
              onChangeText={tempNewItemDesc => this.setState({ tempNewItemDesc })}
            />
          </View>
          <View
            style={{
              flex: 0,
            }}>
            <Button
              // icon={{ name: 'add' }}
              title='Add'
              backgroundColor='#008D14'
              buttonStyle={{ borderRadius: 10 }}
              onPress={() => {
                this.state.tempNewItemDesc !== '' && this.setState(prevState => {
                  const addedLengthBetweenPrevItemsTempItems = prevState.prevItems.length - prevState.tempItems.length;
                  prevState.newItem = {
                    desc: prevState.tempNewItemDesc,
                    // itemId: addedLengthBetweenPrevItemsTempItems == 0 ? state.lastId.items + 1 : state.lastId.items + 1 + addedLengthBetweenPrevItemsTempItems,
                    itemId: prevState.newItem.itemId,
                    orderNum: prevState.newItem.orderNum + 1,
                    templateId: state.lastId.templates + 1
                  };
                  prevState.tempItems = [
                    ...prevState.tempItems,
                    {
                      ...prevState.newItem,
                      desc: prevState.tempNewItemDesc
                    }
                  ];
                  prevState.newItem.desc = '';
                  ++prevState.newItem.itemId;
                  // prevState.newItem = {
                  //   desc: '',
                  //   itemId: prevState.newItem.itemId + 1,
                  //   orderNum: prevState.newItem.orderNum,
                  //   templateId: state.lastId.templates + 1,
                  // };
                  prevState.tempNewItemDesc = '';
                  prevState.tempItems.sort((data1, data2) => data2.orderNum - data1.orderNum);
                  prevState.dataSourceNewAddedItems = this.ds.cloneWithRows(prevState.tempItems);
                })
              }}
            />
          </View>
        </View>
        <View style={{ height: 10 }}/>
        <Button
          icon={{ name: 'check' }}
          title='Save'
          backgroundColor='#6598F6'
          buttonStyle={{ borderRadius: 10 }}
          onPress={() => {
            if(this.state.templateName.length > 0 && this.state.chosenCategory && this.state.tempItems.length > 0 && this.state.tempNewItemDesc == '') {
              // this.setState({ save: true, changeValue: false })
              this.setState(prevState => {
                prevState.save = true;
                prevState.changeValue = false;
                prevState.prevItems = Object.freeze(cloneDeep(prevState.tempItems));
              });
              const newData = {
                additionalInfo: 'addable',
                category: this.state.chosenCategory,
                items: this.state.tempItems,
                templateId: state.lastId.templates + 1,
                title: this.state.templateName
              };
              addTemplate(state.lastId, newData);
              state.navigatePrevent[route.__navigatorRouteID] && navigatePreventFn(route.__navigatorRouteID, false);
              state.navigatePrevent[route.passProps.parentTab] && navigatePreventFn(route.passProps.parentTab, false);
              Alert.alert(
                'Completed',
                'save completed',
                [
                  { text: 'OK', onPress: () => navigator.replacePreviousAndPop({
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
                      chosenTemplate: {
                        ...newData,
                        items: [
                          ...newData.items.map(value => value.itemId)
                        ]
                      },
                    },
                    title: 'Instance List',
                    component: InstanceListContainer
                  })}
                ]
              )
              // alert('save complete', navigator.replacePreviousAndPop({
              //   passProps: {
              //     leftButton: {
              //       title: 'back',
              //       component: ''
              //     },
              //     rightButton: {
              //       title: '',
              //       component: ''
              //     },
              //     parentTab: route.passProps.parentTab,
              //     chosenTemplate: {
              //       ...newData,
              //       items: [
              //         ...newData.items.map(value => value.itemId)
              //       ]
              //     },
              //   },
              //   title: 'Instance List',
              //   component: InstanceListContainer
              // }));
            } else {
              this.state.templateName.length < 4 ? Alert.alert(
                'Warning',
                'template name should be at least 3 characters.',
                [
                  { text: 'Confirm' }
                ]
              ) : !this.state.chosenCategory ? Alert.alert(
                'Warning',
                'choose or input category',
                [
                  { text: 'OK' }
                ]
              ) : this.state.tempItems.length < 1 ? Alert.alert(
                'Warning',
                'Each template should have at least 1 item.',
                [
                  { text: 'Confirm' }
                ]
              ) : this.state.tempNewItemDesc !== '' ? Alert.alert(
                'Warning',
                'After input item, please press add button.',
                [
                  { text: 'OK' }
                ]) : null
            }
          }}
        />
        {this.state.dataSourceNewAddedItems._cachedRowCount > 0 ? (
          <View
            style={{ flex: 1 }}>
            <List>
              <FormLabel
                containerStyle={{
                  marginBottom: 10
                }}
                >
                Added Items : {this.state.dataSourceNewAddedItems._cachedRowCount} / Delete item : Tab
              </FormLabel>
              <ListView
                dataSource={this.state.dataSourceNewAddedItems}
                renderRow={renderRow}
                enableEmptySections={true}
                removeClippedSubviews={false}
              />
            </List>
          </View>
          ) : null }

        <View style={{ height: 10 }}/>
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.categoryListModalVisible}
          >
            <TemplateCategoryModal
              closeFn={categoryModalToggle.bind(this)}
              categoryChosen={categoryChosen.bind(this)}
              addTemplateCategory={addTemplateCategory}
              chosenCategory={this.state.chosenCategory}
              lastId={state.lastId}
              dataSourceTemplateCategories={state.dataSourceTemplateCategories}
            />
        </Modal>
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.itemsInputedListModalVisible}
          >
          <ItemsInputedListModalContainer
            dataSourceItems={this.state.dataSourceItems}
            closeFn={itemsInputedListModalToggle.bind(this)}
          />
        </Modal>
      </View>
    )
  }
}
