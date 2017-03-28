import React from 'react'
import {
  View,
  ListView,
  TouchableOpacity,
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
      newCategory: ''
    }
  }

  render() {
    const { addTemplateCategory, lastId, closeFn, categoryChosen, dataSourceTemplateCategories } = this.props
    const renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.title}
      leftIcon={rowData.icon}
      onPress={() => {
        categoryChosen(rowData.title)
        closeFn()
      }}
      hideChevron
    />
    return(
      <View style={{
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end'
      }}>
        <TouchableOpacity
          style={{
            flex: 1,
          }}
          onPress={() => closeFn()}
          >
        </TouchableOpacity>
        <View
          style={{
            flex: 0,
            backgroundColor: 'white',
            borderColor: 'lightgray',
            borderTopWidth: 1,
            marginBottom: 8,
          }}>
          <List>
            <FormLabel>
              Categories : {dataSourceTemplateCategories._cachedRowCount}
            </FormLabel>
            <ListView
              dataSource={dataSourceTemplateCategories}
              enableEmptySections={true}
              renderRow={renderRow}
              style={{ maxHeight: 150 }}
            />
          </List>
          <FormLabel>
            New Category Add
          </FormLabel>
          <FormInput
            onChangeText={newCategory => this.setState({ newCategory })}
          />
          <Button
            title='save'
            onPress={() => {
              // categoryAddFn(this.state.newCategory)
              addTemplateCategory(lastId, { title: this.state.newCategory })
              categoryChosen(this.state.newCategory)
              closeFn()
            }}
            buttonStyle={{ marginTop: 10 }}
          />
        </View>
      </View>
    )
  }
}
