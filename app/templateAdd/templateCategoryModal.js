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
    };
  }

  render() {
    const { addTemplateCategory,
            lastId,
            closeFn,
            categoryChosen,
            dataSourceTemplateCategories } = this.props,
            emptyOrNot = dataSourceTemplateCategories._cachedRowCount == 0,
            length_dataSourceTemplateCategories = dataSourceTemplateCategories._cachedRowCount;

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
    const flexMapper = {
      0: 5,
      1: 2,
      2: 1.5,
      3: 1.2
    };
    const AddFn = preventAddProcessBoolean => {
      preventAddProcessBoolean || addTemplateCategory(lastId, { title: this.state.newCategory });
      categoryChosen(this.state.newCategory);
      closeFn();
    };
    return(
      <View style={{
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        marginBottom: 48,
      }}>
        <TouchableOpacity
          style={{
            flex: flexMapper.hasOwnProperty(length_dataSourceTemplateCategories) ? flexMapper[length_dataSourceTemplateCategories] : 1
            // flex: emptyOrNot ? 5 : length_dataSourceTemplateCategories < 4 ? 1.2 : 1
            // flex: emptyOrNot ? 5 : 1,
          }}
          underlayColor='#C0C0C0'
          onPress={() => this.state.newCategory ? Alert.alert(
            'Close Disable',
            'After input new category, please press add button',
            [
              { text: 'Confirm', onPress: () => this.refs['newCategoryTextInput'].focus() }
            ]
          ) : closeFn()}
          >
            <View style={{
              flex: 1,
              backgroundColor: 'white',
              opacity: 0.6
            }} />
        </TouchableOpacity>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderColor: 'lightgray',
            borderTopWidth: emptyOrNot ? 1 : 0,
            // marginBottom: 48,
          }}
          behavior={'position'}
          contentContainerStyle={{
            flex: 1,
            borderTopWidth: emptyOrNot ? 1 : 0,
            // borderColor: '#86939D',
            borderColor: 'lightgray',
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
                onPress={() => this.state.newCategory ? dataSourceTemplateCategories._dataBlob.s1.every(value => value.title !== this.state.newCategory)
                  ? AddFn()
                  : Alert.alert(
                    'Warning',
                    'Inputted category is already exist. It\'ll be replaced with existing one.',
                    [
                      { text: 'OK', onPress: () => AddFn(true) }
                    ]
                  )
                  : Alert.alert(
                      'Warning',
                      'Please input new category or choose one from the category list.',
                      [
                        { text: 'Confirm', onPress: () => this.refs['newCategoryTextInput'].focus() }
                      ]
                    )
                }
              />
          </View>
          {/* <View style={{ height: 48, postition: ''}}/> */}
        </KeyboardAvoidingView>
      </View>
    )
  }
}
