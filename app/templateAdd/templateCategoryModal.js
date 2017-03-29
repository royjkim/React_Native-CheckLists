import React from 'react'
import {
  View,
  ListView,
  TouchableOpacity,
  Text,
  TextInput,
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
            flex: 1,
            backgroundColor: 'white',
            borderColor: 'lightgray',
            // borderTopWidth: 1,
            marginBottom: 8,
          }}>
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
              marginVertical: 20
            }}
            >
              {/* <Text
                style={{
                  color: '#86939D',
                  fontWeight: 'bold',
                  marginLeft: 8
                }}
                >
                New Category :
              </Text> */}
              <View
                style={{
                  flex: 1,
                  borderColor: '#C1C1C1',
                  borderBottomWidth: 1,
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
                  addTemplateCategory(lastId.templateCategories, { title: this.state.newCategory })
                  categoryChosen(this.state.newCategory)
                  closeFn()
                }}
              />
              {/* <View
                style={{
                  backgroundColor: '#C1C1C1',
                  height: 1.5,
                  marginHorizontal: 10
                }}
              /> */}
              {/* <TouchableOpacity
                style={{
                  flex: 1,
                  // marginLeft: 32,
                }}
                onPress={() => this.setState({ categoryListModalVisible: true })}
                >
                  <Text
                    style={{
                      marginHorizontal: 20,
                      marginBottom: 5,
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
          {/* <FormLabel>
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
          /> */}
        </View>
      </View>
    )
  }
}
