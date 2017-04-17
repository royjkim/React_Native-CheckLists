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
  Icon,
} from 'react-native-elements';
import TemplateAddNewContainer from './templateAddNewContainer';

export default class TemplateAddComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // existingTemplatesVisible: true,
      // templateName: '',
      // templateCategory: '',
      // items: [
      //   'Wear life vest',
      //   'Get on the boat'
      // ],
      // categoryListModalVisible: false,
      // categoryList: [
      //   { title: 'rowing', icon: 'rowing' },
      //   { title: 'call', icon: 'call' }
      // ],
      // ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      // dataSource: '',
      // dataSourceItems: '',
      itemsInputedListModalVisible: false,
      tempNewItem: ''
    }
  }
  // componentWillMount() {
  //   this.setState({
  //     // dataSource: this.state.ds.cloneWithRows(this.state.categoryList),
  //     dataSourceItems: this.state.ds.cloneWithRows(this.state.items)
  //   })
  // }
  render() {
    const { route, navigator, dataSourceTemplates } = this.props
    const renderRowTemplates = (rowData, sectionId) => <ListItem
      key={sectionId}
      title={rowData.title}
      subtitle={`Category : ${rowData.category}, Items : ${rowData.items.length}`}
      underlayColor='#C0C0C0'
      onPress={() => navigator.push(
        {
          passProps: {
            leftButton: {
              title: 'back',
              component: ''
            },
            rightButton: {
              title: '',
              component: ''
            },
            parentTab: route.passProps.parentTab,
            chosenTemplate: rowData
          },
          title: `Copy from ${rowData.title}`,
          component: TemplateAddNewContainer
        }
      )}
    />
    return(
      <View style={styles.bodyContainer}>

          <View>
            <FormLabel>
             {/* Choose Template, It'll be copied. */}
             {dataSourceTemplates._cachedRowCount == 0 ? 'There is no template, Add new template first.' : 'Choose Template, It\'ll be copied.'}
            </FormLabel>
            {/* <View
              style={{ alignSelf: 'flex-end' }}>
              <Button
                small
                icon={{ name: 'close', color: 'gray' }}
                title='Hide'
                onPress={() => this.setState({ existingTemplatesVisible: false })}
                backgroundColor='white'
                color='gray'
              />
            </View> */}
            <List>
              <ListView
                dataSource={dataSourceTemplates}
                renderRow={renderRowTemplates}
                enableEmptySections={true}
                removeClippedSubviews={false}
              />
            </List>
            {/* <View style={{ backgroundColor: 'lightgray', height: 3, marginVertical: 13 }} /> */}
          </View>
        {/* <Button
          title='Show Existing Template'
          onPress={() => this.setState({ existingTemplatesVisible: true })}
        /> */}
        <View style={{ height: 15 }} />
        <Button
          icon={{ name: 'add' }}
          title='Make New Template'
          backgroundColor='#008D14'
          buttonStyle={{ borderRadius: 10 }}
          onPress={() => navigator.push(
            {
              passProps: {
                leftButton: {
                  title: 'back',
                  component: ''
                },
                rightButton: {
                  title: '',
                  component: ''
                },
                parentTab: route.passProps.parentTab
              },
              title: 'Make New Template',
              component: TemplateAddNewContainer,
            }
          )}
        />

      </View>
    )
  }
}
