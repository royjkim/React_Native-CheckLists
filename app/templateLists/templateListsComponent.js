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

export default class TemplateListsComponent extends React.Component {
  render() {
    const { route, navigator, state } = this.props
    const renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.title}
      subtitle={`Category : ${rowData.category}, Instances : ${(state.badgeValueOfInstancesOfChosenTemplates.hasOwnProperty(rowData.templateId) ? state.badgeValueOfInstancesOfChosenTemplates[rowData.templateId] : 0)}, Items: ${state.templates[rowData.templateId].items.length} `}
      // badge={{
      //   // value: `instances : ${(state.badgeValueOfInstancesOfChosenTemplates.hasOwnProperty(rowData.templateId) ? state.badgeValueOfInstancesOfChosenTemplates[rowData.templateId] : 0)}`,
      //   value: `items(${(state.badgeValueOfInstancesOfChosenTemplates.hasOwnProperty(rowData.templateId) ? state.badgeValueOfInstancesOfChosenTemplates[rowData.templateId] : 0)})`,
      //   badgeTextStyle: { color: 'white'},
      //   badgeContainerStyle: { marginTop: 5 }
      // }}
      hideChevron={
        ((state.badgeValueOfInstancesOfChosenTemplates.hasOwnProperty(rowData.templateId) && state.badgeValueOfInstancesOfChosenTemplates[rowData.templateId] > 0)
         ? false : true)}
      onPress={() => {
        if(state.badgeValueOfInstancesOfChosenTemplates.hasOwnProperty(rowData.templateId) && state.badgeValueOfInstancesOfChosenTemplates[rowData.templateId] > 0) {
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
