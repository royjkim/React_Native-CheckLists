import React from 'react'
import {
  View,
  Text,
  TextInput,
  Modal,
  ListView,
  ScrollView,
} from 'react-native'
import styles from '../components/styles'
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
  List,
  ListItem,
} from 'react-native-elements'
import TemplateCategoryModal from './templateCategoryModal'
import ItemsInputedListModal from './itemsInputedListModal'

export default class TemplateListAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      templateName: '',
      templateCategory: '',
      items: [
        'Wear life vest',
        'Get on the boat'
      ],
      categoryListModalVisible: false,
      categoryList: [
        { title: 'rowing', icon: 'rowing' },
        { title: 'call', icon: 'call' }
      ],
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      dataSource: '',
      dataSourceItems: '',
      itemsInputedListModalVisible: false,
      tempNewItem: ''
    }
  }
  componentWillMount() {
    this.setState({
      dataSource: this.state.ds.cloneWithRows(this.state.categoryList),
      dataSourceItems: this.state.ds.cloneWithRows(this.state.items)
    })
  }
  render() {
    const categoryModalToggle = () => this.setState({ categoryListModalVisible: !this.state.categoryListModalVisible })
    const categoryChosen = templateCategory => this.setState({ templateCategory })
    const categoryAdd = newCategory => {
      this.setState({ categoryList: this.state.categoryList.concat({
          title: newCategory,
          icon: 'rowing'
      })})
      this.setState({
        dataSource: this.state.ds.cloneWithRows(this.state.categoryList)
      })
    }
    const itemsInputedListModalToggle = () => this.setState({ itemsInputedListModalVisible: !this.state.itemsInputedListModalVisible })
    const itemAdd = () => this.setState({
      items: this.state.items.concat(this.state.tempNewItem)
    })
    return(
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
        <FormInput
          value={this.state.templateCategory}
          onChangeText={templateCategory => this.setState({ templateCategory })}
        />
        <View style={{ height: 10 }}/>
        <Button
          title='Category Show'
          onPress={() => this.setState({ categoryListModalVisible: true })}
        />
        <View style={{ height: 10 }}/>
        <Button
          title='Show Items Inputed'
          onPress={() => this.setState({ itemsInputedListModalVisible: !this.state.itemsInputedListModalVisible })}
        />
        <FormLabel>
          New Item
        </FormLabel>
        <FormInput
          value={this.state.tempNewItem}
          onChangeText={tempNewItem => this.setState({ tempNewItem })}
        />
        <View style={{ height: 10 }}/>
        <Button
          title='Save'
          onPress={async () => {
            if(this.state.tempNewItem !== '') {
              await itemAdd()
              this.setState({
                tempNewItem: '',
                dataSourceItems: this.state.ds.cloneWithRows(this.state.items)
              }, itemsInputedListModalToggle())
            } else {
              alert('input a item')
            }

          }}
        />
        <View style={{ height: 10 }}/>
        <ScrollView style={{ maxHeight: 150 }}>
          <Text>
            this.state : {JSON.stringify(this.state, null, 3)}
          </Text>
        </ScrollView>
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.categoryListModalVisible}
          >

            <TemplateCategoryModal
              categoryList={this.state.categoryList}
              closeFn={categoryModalToggle.bind(this)}
              chosenFn={categoryChosen.bind(this)}
              categoryAddFn={categoryAdd.bind(this)}
              dataSource={this.state.dataSource}
            />
        </Modal>
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.itemsInputedListModalVisible}
          >
          <ItemsInputedListModal
            dataSourceItems={this.state.dataSourceItems}
            closeFn={itemsInputedListModalToggle.bind(this)}
          />
        </Modal>
      </View>
    )
  }
}
