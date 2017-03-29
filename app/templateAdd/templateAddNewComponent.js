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
    const { route, navigator, state, addTemplateCategory, addNewTemplate } = this.props
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
    const renderRowNewItem = (rowData, sectionId) => (
      // <View>
      //   <Text>
      //     {rowData.desc}
      //   </Text>
      // </View>
      <ListItem
        key={sectionId}
        // title={rowData.desc.toString()}
        title={String(rowData.desc || 'none')}
        // title={<View
        //   style={{ flexDirection: 'row' }}
        //   >
        //   <Text>
        //     orderNum : {String(rowData.desc) || 'none'}
        //   </Text>
        //   {/* <Button title='test' /> */}
        //   {/* <TouchableOpacity
        //     style={{ borderWidth: 1, borderRadius: 5, padding: 15 }}>
        //     <Text>
        //       Del
        //     </Text>
        //   </TouchableOpacity> */}
        // </View>}
        subtitle={String(rowData.orderNum)}
        // subtitle={<View
        //   style={{ flexDirection: 'row' }}
        //   >
        //   <Text>
        //     orderNum : {String(rowData.orderNum)}
        //   </Text>
        //   {/* <Button title='test' /> */}
        //   {/* <TouchableOpacity
        //     style={{ borderWidth: 1, borderRadius: 5, padding: 5 }}>
        //     <Text>
        //       Del
        //     </Text>
        //   </TouchableOpacity> */}
        // </View>
        // }
        hideChevron
      />
    )
    return (
      <View style={styles.bodyContainer}>
        {/* <FormLabel>
          Template Title
        </FormLabel>
        <FormInput
          onChangeText={templateName => this.setState({ templateName })}
        /> */}
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
            {/* <TouchableOpacity
              style={{
                flex: 1,
              }}
              onPress={() => this.setState({ categoryListModalVisible: true })}
              >
                <Text
                  style={{
                    marginHorizontal: 20,
                    marginBottom: 5,
                    // marginVertical: 15,
                    color: this.state.templateName ? '#605E60' : '#9E9E9E',
                    textAlign: 'center'
                  }}
                  >
                  {this.state.templateName ? this.state.templateName : 'input title'}
                </Text>
                <View
                  style={{
                    backgroundColor: '#C1C1C1',
                    height: 1.5,
                    marginHorizontal: 10
                  }}
                />
            </TouchableOpacity> */}
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
              {/* <FormInput
                value={this.state.chosenCategory}
                // onChangeText={chosenCategory => this.setState({ chosenCategory })}
              /> */}
            </TouchableOpacity>
        </View>
        {/* {this.state.templateName.length < 3 ? <FormValidationMessage>
          Name is required. At least 3 characters.
        </FormValidationMessage> : null} */}
        {/* <FormLabel>
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
          <FormInput
            value={this.state.chosenCategory}
            onChangeText={chosenCategory => this.setState({ chosenCategory })}
          />
        </TouchableOpacity>
        <View style={{ height: 10 }}/>
        <View style={{ height: 10 }}/> */}
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
          onPress={() => {
            if(this.state.templateName.length > 3 && this.state.chosenCategory && this.state.newItems.length > 0 && this.state.tempNewItemDesc == '') {
              // console.log(`this.state.chosenCategory : ${this.state.chosenCategory}`)
              // console.log(`this.state.newItems.filter(value => value.itemId) : `, this.state.newItems.filter(value => value.itemId))
              // console.log(`lastId.templates + 1 : ${lastId.templates + 1}`)
              addNewTemplate(state.lastId, {
                additionalInfo: 'addable',
                category: this.state.chosenCategory,
                items: this.state.newItems,
                templateId: state.lastId.templates + 1,
                title: this.state.templateName
              })
              alert('save complete', navigator.popToTop())

            } else {
              this.state.templateName.length < 4 ? alert('input template name(at least 3 characters)') : !this.state.chosenCategory ? alert('input category') : this.state.newItems.length < 1 ? alert('add new item(at least 1 item)') : this.state.tempNewItemDesc !== '' ? alert('after input item, please press add button') : null
            }
          }}
        />
        {/* this.state = {
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
        } */}
        {this.state.dataSourceNewAddedItems._cachedRowCount > 0 ? (
          <View
            style={{ flex: 1 }}>
            {/* <View
              style={{
                backgroundColor: '#9E9E9E',
                height: 2,
                marginTop: 10
              }}
            /> */}
            <List>
              <FormLabel
                containerStyle={{
                  // marginVertical: 10
                  marginBottom: 10
                }}
                >
                Added Items : {this.state.dataSourceNewAddedItems._cachedRowCount}
              </FormLabel>
              <ListView
                dataSource={this.state.dataSourceNewAddedItems}
                // dataSource={this.dataSourceNewAddedItems}
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
