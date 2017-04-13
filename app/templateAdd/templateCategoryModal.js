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
    const { addTemplateCategory, lastId, closeFn, categoryChosen, dataSourceTemplateCategories } = this.props
    const renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.title}
      leftIcon={rowData.icon}
      underlayColor='#C0C0C0'
      onPress={() => {
        categoryChosen(rowData.title);
        closeFn();
      }}
      underlayColor='#C0C0C0'
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
              removeClippedSubviews={false}
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
                        { text: 'Confirm' }
                      ]
                    )
                  }
                }}
              />
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}
