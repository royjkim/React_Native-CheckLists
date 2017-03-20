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

import InstanceListContainer from './instanceList/instanceListContainer'
import MySideMenu from '../components/mySideMenu'

import Reactotron from 'reactotron-react-native'

export default class TemplateListsComponent extends React.Component {
  render() {
    const { route, navigator, state } = this.props
    const renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.title}
      subtitle={rowData.category}
      badge={{
        value: (typeof state.badgeValueOfTemplates[rowData.title] !== 'number' ? 0 : state.badgeValueOfTemplates[rowData.title]),
        badgeTextStyle: { color: 'white'},
        badgeContainerStyle: { marginTop: 5 }
      }}
      onPress={() => {
        if(typeof state.badgeValueOfTemplates[rowData.title] == 'number' && state.badgeValueOfTemplates[rowData.title] > 0) {
          navigator.push(
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
                chosenTemplate: rowData.title
              },
              // title: `Customer List of ${rowData.title}`,
              title: `${rowData.title}`,
              component: InstanceListContainer,
            }
          )
        }
      }}
      hideChevron={((typeof state.badgeValueOfTemplates[rowData.title] == 'number') && (state.badgeValueOfTemplates[rowData.title] > 0) ?
      false : true)}
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
      </View>
    )
  }
}
