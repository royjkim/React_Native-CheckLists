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
        // itemId: this.props.state.lastId.items + 1,
        itemId: 0,
        orderNum: 0,
        // templateId: this.props.state.lastId.templates + 1
        templateId: 0
      },
      newItems: [],
      dataSourceNewAddedItems: [],
    }
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  async componentWillMount() {
    if(this.props.route.passProps.chosenTemplate) {
      const { chosenTemplate } = this.props.route.passProps
      const tempSorted_newItems = chosenTemplate.items.map(value => ({
        ...this.props.state.items[value],
        templateId: this.props.state.lastId.templates + 1
      })).sort((data1, data2) => data2.orderNum - data1.orderNum)
      await this.setState({
        templateName: chosenTemplate.title || '',
        chosenCategory: chosenTemplate.category || '',
        newItem: {
          desc: '',
          itemId: this.props.state.lastId.items + 1,
          orderNum: tempSorted_newItems.length > 0 ? tempSorted_newItems[0].orderNum + 1 : 0,
          templateId: this.props.state.lastId.templates + 1
        },
        newItems: tempSorted_newItems
      })
    }
    this.setState({
      dataSourceNewAddedItems: this.ds.cloneWithRows(this.state.newItems || [])
    })
  }

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
      <ListItem
        key={sectionId}
        title={String(rowData.desc || 'none')}
        subtitle={`orderNum : ${String(rowData.orderNum)}, templateId : ${rowData.templateId}`}
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
              onPress={async () => {
                if(this.state.tempNewItemDesc !== '') {
                  this.setState({
                    newItem: {
                      desc: this.state.tempNewItemDesc,
                      itemId: this.state.newItems.length == 0 ? state.lastId.items + 1 : state.lastId.items + 1 + this.state.newItems.length,
                      orderNum: this.state.orderNum + 1,
                      templateId: state.lastId.templates + 1,
                    },
                  })
                  await this.setState({
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
                      templateId: state.lastId.templates + 1,
                    },
                    tempNewItemDesc: ''
                  })
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
