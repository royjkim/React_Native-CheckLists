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

import TemplateAdd from '../templateLists/templateAdd'

import Reactotron from 'reactotron-react-native'

export default class HomeComponent extends React.Component {

  render() {
    const { route, navigator, state } = this.props
    const renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.title}
      subtitle={rowData.category}
      badge={{
        // value: (typeof state.badgeValueOfTemplates[rowData.title] !== 'number' ? 0 : state.badgeValueOfTemplates[rowData.title]),
        value: (state.badgeValueOfTemplates.hasOwnProperty(rowData.title) ? state.badgeValueOfTemplates[rowData.title] : 0),
        badgeTextStyle: { color: 'white' },
        badgeContainerStyle: { marginTop: 5 }
      }}
    />
    return(
      <View style={styles.bodyContainer}>
        <FormLabel>
          Check List Template : {state.templatesLength}
        </FormLabel>
        <List>
          <ListView
            dataSource={state.dataSourceTemplates}
            renderRow={renderRow}
            enableEmptySections={true}
          />
        </List>
        <View style={{ height: 5 }} />
        <Button
          icon={{ name: 'note-add' }}
          title='Add Template'
          // onPress={() => alert(`needed props to move Tab.add`)}
          onPress={() => {
            navigator.push({
              passProps: {
                leftButton: {
                  title: 'Back',
                  component: '',
                },
                rightButton: {
                  title: '',
                  component: '',
                },
              },
              title: 'Template Add',
              component: TemplateAdd,
            })
            // navigator.push({
            //   passProps: {
            //     firstPageTitleMakeBackDisabled: '',
            //     nextRightButtonPageTitle: '',
            //     nextRightButtonPageComponent: ''
            //   },
            //   title: 'Add',
            //   component: templateAdd
            // })
          }}
        />
      </View>
    )
  }
}

// passProps: {
//   firstPageTitleMakeBackDisabled: 'Template Lists',
//   nextRightButtonPageTitle: 'Add',
//   nextRightButtonPageComponent: { templateAdd }
// },
// title: 'Template Lists',
// component: TemplateListsComponent,
