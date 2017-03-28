import React from 'react'
import {
  View,
  Text,
  TextInput,
  Modal,
  ListView,
  TouchableOpacity,
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
import { isEqual } from 'lodash'
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
        itemId: this.props.state.lastId.items + 1,
        orderNum: 1,
        templateId: this.props.state.lastId.templates + 1
      },
      newItems: [],
      dataSourceNewAddedItems: [],
      // ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.dataSourceNewAddedItems = this.ds.cloneWithRows([])
    // this.tempNewItemDesc = ''
  }

  componentWillMount() {
    this.setState({
      dataSourceNewAddedItems: this.ds.cloneWithRows([])
    })
  }

  // componentWillUpdate() {
  //   console.log(`componentWillUpdate`)
  //   console.log(`this.state.newItems : `, this.state.newItems)
  //   console.log(`this.state.newItems.length : ${this.state.newItems.length}`)
  //   if (this.state.newItems.length > 0) {
  //     this.setState({
  //       dataSourceNewAddedItems: this.ds.cloneWithRows(this.state.newItems)
  //     })
  //     // this.dataSourceNewAddedItems = this.ds.cloneWithRows(this.state.newItems)
  //   }
  // }

  render() {
    const { route, navigator, state, addTemplateCategory } = this.props
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
    const renderRowNewItem = (rowData, sectionId) => <ListItem
      key={sectionId}
      // title={rowData.desc.toString()}
      title={String(rowData.desc || 'none')}
      // subtitle={rowData.orderNum.toString()}
      subtitle={`orderNum : ${String(rowData.orderNum)}`}
    />
    return (
      <View style={styles.bodyContainer}>
        <FormLabel>
          Template Name
        </FormLabel>
        <FormInput
          onChangeText={templateName => this.setState({ templateName })}
        />
        {/* {this.state.templateName.length < 3 ? <FormValidationMessage>
          Name is required. At least 3 characters.
        </FormValidationMessage> : null} */}
        <FormLabel>
          Template Category
        </FormLabel>
        <TouchableOpacity
          onPress={() => this.setState({ categoryListModalVisible: true })}
          >
            <Text
              style={{
                marginHorizontal: 20,
                marginVertical: 15,
                color: this.state.chosenCategory ? '#605E60' : '#9E9E9E'
              }}
              >
              {this.state.chosenCategory ? this.state.chosenCategory : 'choose category'}
            </Text>
            <View
              style={{
                borderWidth: 0.8,
                borderBottomWidth: 1,
                borderColor: 'lightgray',
                marginHorizontal: 18
              }}
            />
          {/* <FormInput
            value={this.state.chosenCategory}
            // onChangeText={chosenCategory => this.setState({ chosenCategory })}
          /> */}
        </TouchableOpacity>
        <View style={{ height: 10 }}/>
        <View style={{ height: 10 }}/>
        {/* <Button
          title='Show Items Inputed'
          onPress={() => this.setState({ itemsInputedListModalVisible: !this.state.itemsInputedListModalVisible })}
        /> */}
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
              // value={this.tempNewItemDesc}
              placeholder='input item'
              onChangeText={tempNewItemDesc => this.setState({ tempNewItemDesc })}
              // onChangeText={inputText => {
              //   this.tempNewItemDesc = inputText
              //   console.log('this.tempNewItemDesc : ', this.tempNewItemDesc)
              // }}
            />
          </View>
          <View
            style={{
              flex: 0,
              // borderWidth: 1,
              // padding: 0
            }}>
            <Button
              title='Add'
              onPress={async () => {
                // console.log('this.tempNewItemDesc : ', this.tempNewItemDesc)
                if(this.state.tempNewItemDesc !== '') {
                  // await itemAdd()
                  // const itemAdd = () => this.setState({
                  //   items: this.state.items.concat(this.state.tempNewItem)
                  // })
                  console.log(`typeof this.state.tempNewItemDesc : ${typeof this.state.tempNewItemDesc}`)
                  this.setState({
                    newItem: {
                      // desc: this.state.tempNewItemDesc,
                      desc: this.state.tempNewItemDesc,
                      // desc: this.tempNewItemDesc,
                      itemId: state.lastId.items + 1,
                      orderNum: 1,
                      templateId: state.lastId.templates + 1,
                    },
                  })
                  await this.setState({
                    // newItems: this.state.newItems.concat(this.state.newItem),
                    // newItems: {
                    //   ...this.state.newItems,
                    //   [this.state.newItem.itemId]: {
                    //     ...this.state.newItem,
                    //     desc: this.state.tempNewItemDesc
                    //   }
                    // },
                    newItems: [
                      ...this.state.newItems,
                      {
                        ...this.state.newItem,
                        desc: this.state.tempNewItemDesc
                      }
                    ],
                    newItem: {
                      desc: '',
                      itemId: this.state.newItem.itemId + 1,
                      orderNum: this.state.newItem.orderNum + 1,
                      templateId: 0,
                    },
                    tempNewItemDesc: ''
                  })
                  // console.log('first setState done - this.state : ', this.state)
                  // console.log('second setState done : this.state : ', this.state)

                  // this.dataSourceNewAddedItems = this.ds.cloneWithRows(this.state.newItems)
                  // console.log(`second setState done : this.state : `, this.state)

                  // console.log('setState done : this.state : ', this.state);
                  let stateCopy_newItems = [
                    ...this.state.newItems
                  ]
                  stateCopy_newItems.sort((data1, data2) => data2.orderNum - data1.orderNum)
                  this.setState({
                    newItems: stateCopy_newItems
                  })
                  this.setState({
                    dataSourceNewAddedItems: this.ds.cloneWithRows(this.state.newItems)
                  })
                } else {
                  alert('input a item');
                }
              }}
            />
          </View>
        </View>
        <View style={{ height: 10 }}/>
        <Button
          title='Save'
          onPress={() => alert('save')}
        />
        <View
          style={{ flex: 1 }}>
          <List>
            <ListView
              dataSource={this.state.dataSourceNewAddedItems}
              // dataSource={this.dataSourceNewAddedItems}
              renderRow={renderRowNewItem}
              enableEmptySections={true}
            />
          </List>
        </View>
        <View style={{ height: 10 }}/>
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.categoryListModalVisible}
          >
            <TemplateCategoryModal
              // categoryList={.state.categoryList}
              closeFn={categoryModalToggle.bind(this)}
              categoryChosen={categoryChosen.bind(this)}
              // categoryAddFn={categoryAdd.bind(this)}
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
