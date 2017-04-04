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
} from 'react-native-elements'
import { isEqual } from 'lodash';
import TemplateCategoryModal from './templateCategoryModal'
import ItemsInputedListModalContainer from './itemsInputedListModalContainer'

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
        itemId: this.props.state.lastId.items,
        // itemId: 0,
        orderNum: 0,
        templateId: this.props.state.lastId.templates + 1
        // templateId: 0
      },
      tempItems: [],
      prevItems: [],
      dataSourceNewAddedItems: [],
      changeValue: false
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
        prevState.templateName = chosenTemplate.title || '';
        prevState.chosenCategory = chosenTemplate.category || '';
        prevState.newItem = {
          desc: '',
          itemId: this.props.state.lastId.items + 1,
          orderNum: tempSorted_newItems.length > 0 ? tempSorted_newItems[0].orderNum + 1 : 0,
          templateId: this.props.state.lastId.templates + 1
        };
        prevState.prevItems = [
          ...chosenTemplate.items.map(value => ({
            ...this.props.state.items[value],
          })).sort((data1, data2) => data2.orderNum - data1.orderNum)
        ];
        prevState.tempItems = [ ...prevState.prevItems ];
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

    (chosenTemplate && this.state.templateName !== chosenTemplate.title) || this.state.tempNewItemDesc !== '' || !isEqual(this.state.prevItems, this.state.tempItems) ?
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
      addNewTemplate,
      addItem,
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
        'Do you want to delete this item?',
        [
          { text: 'Cancel' },
          { text: 'Delete', onPress: () => this.setState(prevState => {
            prevState.tempItems = [
              ...prevState.tempItems.slice(0, rowId),
              ...prevState.tempItems.slice(rowId + 1)
            ];
            prevState.dataSourceNewAddedItems = this.ds.cloneWithRows(prevState.tempItems)
          })}
        ]
      );
    }
    const renderRowNewItem = (rowData, sectionId, rowId) => (
      <ListItem
        key={rowData.itemId}
        title={String(rowData.desc || 'none')}
        subtitle={`orderNum : ${String(rowData.orderNum)}, templateId : ${rowData.templateId}`}
        onPress={() => deleteAlert(rowData, rowId)}
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
                borderColor: this.state.templateName.length > 3 ? '#C1C1C1' : '#FF2A1A',
                borderBottomWidth: 1.5,
                marginHorizontal: 10
              }}
              >
              <TextInput
                value={this.state.templateName}
                onChangeText={templateName => this.setState({ templateName })}
                placeholder='(at leat 3 characters)'
                style={{
                  flex: 1,
                  color: this.state.templateName ? '#605E60' : '#FF2A1A',
                  textAlign: 'center',
                  marginBottom: 2
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
              value={this.state.tempNewItemDesc}
              placeholder='input item'
              onChangeText={tempNewItemDesc => this.setState({ tempNewItemDesc })}
            />
          </View>
          <View
            style={{
              flex: 0,
            }}>
            <Button
              title='Add'
              onPress={() => {
                this.state.tempNewItemDesc !== '' && this.setState(prevState => {
                  prevState.newItem = {
                    desc: prevState.tempNewItemDesc,
                    itemId: prevState.tempItems.length == 0 ? state.lastId.items + 1 : state.lastId.items + 1 + prevState.tempItems.length,
                    orderNum: prevState.orderNum + 1,
                    templateId: state.lastId.templates + 1
                  };
                  prevState.tempItems = [
                    ...prevState.tempItems,
                    {
                      ...prevState.newItem,
                      desc: prevState.tempNewItemDesc
                    }
                  ];
                  prevState.newItem = {
                    desc: '',
                    itemId: prevState.newItem.itemId + 1,
                    orderNum: prevState.newItem.orderNum + 1,
                    templateId: state.lastId.templates + 1,
                  };
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
          title='Save'
          backgroundColor='#159588'
          onPress={() => {
            if(this.state.templateName.length > 3 && this.state.chosenCategory && this.state.tempItems.length > 0 && this.state.tempNewItemDesc == '') {
              this.setState({ changeValue: false })
              addNewTemplate(state.lastId, {
                additionalInfo: 'addable',
                category: this.state.chosenCategory,
                items: this.state.tempItems,
                templateId: state.lastId.templates + 1,
                title: this.state.templateName
              }),
              // addItem(state.lastId.items, this.state.tempItems.slice(0, this.state.prevItems.length))
              alert('save complete', navigator.pop())
            } else {
              this.state.templateName.length < 4 ? alert('input template name(at least 3 characters)') : !this.state.chosenCategory ? alert('input category') : this.state.tempItems.length < 1 ? alert('add new item(at least 1 item)') : this.state.tempNewItemDesc !== '' ? alert('after input item, please press add button') : null
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
                Added Items : {this.state.dataSourceNewAddedItems._cachedRowCount}
              </FormLabel>
              <ListView
                dataSource={this.state.dataSourceNewAddedItems}
                renderRow={renderRowNewItem}
                enableEmptySections={true}
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
