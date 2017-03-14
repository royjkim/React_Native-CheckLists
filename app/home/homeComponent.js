import React from 'react'
import {
  View,
  Text,
  ListView,
} from 'react-native'
import styles from '../components/styles'

import {
  Button,
  List,
  ListItem,
  FormLabel,
} from 'react-native-elements'

import TemplateListAdd from '../templateLists/templateListAdd'

import Reactotron from 'reactotron-react-native'

export default class HomeComponent extends React.Component {

  render() {
    // console.log(`HomeComponent - this.props : ${JSON.stringify(this.props, null, 2)}`)
    for(let key in this.props) {
      console.log(`HomeComponent - this.props - key : ${key}, value : ${this.props[key]}`)
    }
    const { route, navigator, routeStack, navigationActions } = this.props
    // const { route, navigator } = this.props
    // const { state, actions } = route.passProps
    // Reactotron.log(`HomeComponent - this.props.state : ${JSON.stringify(state, null, 3)}`)
    const renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.title}
      subtitle={rowData.category}
    />
    return(
      <View style={styles.bodyContainer}>
        <FormLabel>
          Check List Template : {state.templateList.length}
        </FormLabel>
        <List>
          <ListView
            dataSource={state.dataSourceTemplateList}
            renderRow={renderRow}
            enableEmptySections={true}
          />
        </List>
        <Button
          icon={{ name: 'note-add' }}
          title='Add Template'
          // onPress={() => alert(`needed props to move Tab.add`)}
          onPress={() => navigator.push({
            passProps: {
              firstPageTitleMakeBackDisabled: '',
              nextRightButtonPageTitle: '',
              nextRightButtonPageComponent: ''
            },
            title: 'Add',
            component: TemplateListAdd
          })}
        />
      </View>
    )
  }
}

// passProps: {
//   firstPageTitleMakeBackDisabled: 'Template Lists',
//   nextRightButtonPageTitle: 'Add',
//   nextRightButtonPageComponent: { TemplateListAdd }
// },
// title: 'Template Lists',
// component: TemplateListsComponent,
