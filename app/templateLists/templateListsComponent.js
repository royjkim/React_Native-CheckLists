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
      subtitle={`${rowData.category}`}
      badge={{
        // value: (typeof state.badgeValueOfTemplates[rowData.templateId] !== 'number' ? 0 : state.badgeValueOfTemplates[rowData.templateId]),
        value: (state.badgeValueOfTemplates.hasOwnProperty(rowData.templateId) ? state.badgeValueOfTemplates[rowData.templateId] : 0),
        badgeTextStyle: { color: 'white'},
        badgeContainerStyle: { marginTop: 5 }
      }}
      hideChevron={
        ((state.badgeValueOfTemplates.hasOwnProperty(rowData.templateId) && state.badgeValueOfTemplates[rowData.templateId] > 0)
         ? false : true)}
      onPress={() => {
        if(state.badgeValueOfTemplates.hasOwnProperty(rowData.templateId) && state.badgeValueOfTemplates[rowData.templateId] > 0) {
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
                chosenTemplate: rowData
              },
              // title: `Customer List of ${rowData.title}`,
              title: `${rowData.title}`,
              component: InstanceListContainer,
            }
          )
        }
      }}
    />
    return(
      <View style={styles.bodyContainer}>
        <FormLabel>
          Check List Templates : {state.templatesLength}
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
