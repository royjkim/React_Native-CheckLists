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
        templateId: 0,
      },
      newItems: [],
      dataSourceNewAddedItems: []
    }
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    // this.dataSourceNewAddedItems = this.ds.cloneWithRows([])
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
        dataSource: this.state.ds.cloneWithRows(this.state.categoryList)
      })
    }
    const itemsInputedListModalToggle = () => this.setState({ itemsInputedListModalVisible: !this.state.itemsInputedListModalVisible })
    const renderRowNewItem = (rowData, sectionId) => <ListItem
      key={sectionId}
      title={rowData.desc}
      subtitle={`orderNum : ${rowData.ordrNum}`}
    />
    return (
      <View style={styles.bodyContainer}>
        <FormLabel>
          Template Name
        </FormLabel>
        <FormInput
          onChangeText={templateName => this.setState({ templateName })}
        />
        {this.state.templateName.length < 3 ? <FormValidationMessage>
          Name is required. At least 3 characters.
        </FormValidationMessage> : null}
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
        {/* <Button
          title='Category Show'
          onPress={() => this.setState({ categoryListModalVisible: true })}
        /> */}
        <View style={{ height: 10 }}/>
        <Button
          title='Show Items Inputed'
          onPress={() => this.setState({ itemsInputedListModalVisible: !this.state.itemsInputedListModalVisible })}
        />
        <FormLabel>
          New Item
        </FormLabel>
        <FormInput
          value={this.state.tempNewItemDesc}
          // placeholder='input item'
          onChangeText={tempNewItemDesc => this.setState({ tempNewItemDesc })}
        />
        <View style={{ height: 10 }}/>
        <Button
          title='Save'
          onPress={async () => {
            if(this.state.tempNewItemDesc !== '') {
              // await itemAdd()
              // const itemAdd = () => this.setState({
              //   items: this.state.items.concat(this.state.tempNewItem)
              // })
              this.setState({
                newItem: {
                  desc: this.state.tempNewItemDesc,
                  orderNum: 1,
                  itemId: state.lastId.items + 1
                },
                tempNewItemDesc: ''
              })
              await this.setState({
                newItems: this.state.newItems.concat([this.state.newItem]),
                newItem: {
                  desc: '',
                  itemId: this.state.newItem.itemId + 1,
                  orderNum: this.state.newItem.orderNum + 1,
                  templateId: 0,
                }
              })
              this.setState({
                dataSourceNewAddedItems: this.ds.cloneWithRows(this.state.newItems)
              })

            } else {
              alert('input a item')
            }

          }}
        />
        <List>
          <ListView
            dataSource={this.state.dataSourceNewAddedItems}
            renderRow={renderRowNewItem}
            enableEmptySections={true}
          />
        </List>
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
