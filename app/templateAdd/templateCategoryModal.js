import React from 'react'
import {
  View,
  ListView,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
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
          onPress={() => this.state.newCategory ? alert('after input new category, please press add button') : closeFn()}
          >
        </TouchableOpacity>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderColor: 'lightgray',
            // borderTopWidth: 1,
            // marginBottom: 3,
          }}
          behavior={'position'}
          contentContainerStyle={{
            flex: 1,
            // borderTopWidth: 1,
            borderColor: '#86939D',
            backgroundColor: 'white',
            // borderWidth: 1
          }}
          >
          <List>
            <FormLabel
              containerStyle={{
                marginBottom: 23
              }}>
              Categories : {dataSourceTemplateCategories._cachedRowCount}
            </FormLabel>
            <ListView
              dataSource={dataSourceTemplateCategories}
              enableEmptySections={true}
              renderRow={renderRow}
              style={{
                maxHeight: 150
              }}
            />
          </List>
          <FormLabel>
            New Category
          </FormLabel>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginHorizontal: 20,
              // marginVertical: 10
              marginBottom: 20
            }}
            >
              <View
                style={{
                  flex: 1,
                  borderColor: '#C1C1C1',
                  borderBottomWidth: 1,
                  marginBottom: 10
                }}
                >
                <TextInput
                  value={this.state.newCategory}
                  onChangeText={newCategory => this.setState({ newCategory })}
                  placeholder='input new category'
                  style={{
                    flex: 1,
                    color: this.state.newCategory ? '#605E60' : '#9E9E9E',
                    textAlign: 'center'
                    // marginHorizontal: 10
                  }}
                />
              </View>
              <Button
                title='Add'
                onPress={() => {
                  if(this.state.newCategory) {
                    addTemplateCategory(lastId, { title: this.state.newCategory })
                    categoryChosen(this.state.newCategory)
                    closeFn()
                  } else {
                    alert('input new category')
                  }
                }}
              />
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}
