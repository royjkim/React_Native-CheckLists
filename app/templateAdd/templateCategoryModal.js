import React from 'react'
import {
  View,
  ListView,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Alert,
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
    const { addTemplateCategory,
            lastId,
            closeFn,
            categoryChosen,
            dataSourceTemplateCategories } = this.props,
            emptyOrNot = dataSourceTemplateCategories._cachedRowCount == 0;

    const renderRow = rowData => <ListItem
      key={rowData.templateCategoriesId}
      title={rowData.title}
      // leftIcon={rowData.icon}
      underlayColor='#C0C0C0'
      // underlayColor='red'
      onPress={() => {
        categoryChosen(rowData.title);
        closeFn();
      }}
      hideChevron
    />
    return(
      <View style={{
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        marginBottom: 48,
      }}>
        <TouchableOpacity
          style={{
            flex: emptyOrNot ? 5 : 1,
          }}
          onPress={() => this.state.newCategory ? Alert.alert(
            'Close Disable',
            'After input new category, please press add button',
            [
              { text: 'Confirm' }
            ]
          ) : closeFn()}
          >
        </TouchableOpacity>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            backgroundColor: 'white',
            // borderColor: 'lightgray',
            // borderTopWidth: 1,
            // marginBottom: 48,
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
          {emptyOrNot || <View
            style={{
              marginBottom: 0,
              // backgroundColor: 'blue'
            }}
            >
            <List>
              <FormLabel
                containerStyle={{
                  // marginBottom: 23
                  marginBottom: 5
                }}>
                Categories : {dataSourceTemplateCategories._cachedRowCount}
              </FormLabel>
              <ListView
                dataSource={dataSourceTemplateCategories}
                enableEmptySections={true}
                renderRow={renderRow}
                removeClippedSubviews={false}
                style={{
                  maxHeight: 150
                }}
              />
            </List>
          </View>
          }
          <FormLabel>
            New Category
          </FormLabel>
          <View
            style={{
              flex: 0,
              // height: 200,
              flexDirection: 'row',
              marginHorizontal: 20,
              // marginVertical: 10
              // justifyContent: 'flex-start',
              // marginBottom: 20
            }}
            >
              <View
                style={{
                  flex: 1,
                  height: 45,
                  borderColor: '#C1C1C1',
                  borderBottomWidth: 1,
                  marginBottom: 10,
                }}
                >
                <TextInput
                  ref='newCategoryTextInput'
                  value={this.state.newCategory}
                  onChangeText={newCategory => this.setState({ newCategory })}
                  // placeholder='input new category'
                  placeholder={this.props.chosenCategory}
                  autoFocus={true}
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
                backgroundColor='#008D14'
                buttonStyle={{ borderRadius: 10 }}
                onPress={() => {
                  if(this.state.newCategory) {
                    addTemplateCategory(lastId, { title: this.state.newCategory })
                    categoryChosen(this.state.newCategory)
                    closeFn()
                  } else {
                    Alert.alert(
                      'Warning',
                      'Please input new category or choose one from the category list.',
                      [
                        { text: 'Confirm', onPress: () => this.refs['newCategoryTextInput'].focus() }
                      ]
                    )
                  }
                }}
              />
          </View>
          {/* <View style={{ height: 48, postition: ''}}/> */}
        </KeyboardAvoidingView>
      </View>
    )
  }
}
