import React from 'react'
import {
  View,
  ListView,
} from 'react-native'
import {
  List,
  ListItem,
  Icon,
  FormLabel,
  FormInput,
  Button,
} from 'react-native-elements'

export default class TemplateCategoryModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newCategory: '',
    }
  }

  render() {
    const { categoryList, closeFn, chosenFn, categoryAddFn, dataSource } = this.props
    const renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.title}
      leftIcon={rowData.icon}
      onPress={() => {
        chosenFn(rowData.title)
        closeFn()
      }}
    />
    return(
      <View style={{ backgroundColor: 'white', marginTop: 180 }}>
        <List>
          <Icon
            name='close'
            onPress={() => closeFn()}
            // iconStyle={{ alignSelf: 'flex-end', marginRight: 10 }}
            containerStyle={{ marginTop: 5 }}
          />
          {/* {categoryList.map((value, index) => <ListItem
            key={index}
            title={value.title}
            leftIcon={{ name: value.icon }}
            onPress={() => {
              chosenFn(value.title)
              closeFn()
            }}
          />)} */}
          <ListView
            dataSource={dataSource}
            enableEmptySections={true}
            renderRow={renderRow}
            style={{ maxHeight: 150 }}
          />
        </List>
        <FormLabel>
          Category Add
        </FormLabel>
        <FormInput
          onChangeText={newCategory => this.setState({ newCategory })}
        />
        <Button
          title='save'
          onPress={() => {
            categoryAddFn(this.state.newCategory)
            closeFn()
          }}
          buttonStyle={{ marginTop: 10 }}
        />
      </View>
    )
  }
}
