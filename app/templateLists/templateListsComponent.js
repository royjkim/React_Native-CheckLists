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
  SearchBar,
} from 'react-native-elements'
import { isEqual } from 'lodash'

import InstanceListContainer from './instanceList/instanceListContainer'
import MySideMenu from '../components/mySideMenu'

export default class TemplateListsComponent extends React.Component {

  shouldComponentUpdate(nextProps) {
    let tempResult = true
    nextProps.state.navigatePopToTopRequest.templateList ? (this.props.navigatePopToTopRequest('templateList', false), tempResult = false, this.props.navigator.popToTop()) : null
    return tempResult
  }
  render() {
    const { route, navigator, state, searchBarTextTemplateList } = this.props
    const renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.title}
      subtitle={`Category(${rowData.category}), Instances(${(state.badgeValueOfInstancesOfChosenTemplates.hasOwnProperty(rowData.templateId) ? state.badgeValueOfInstancesOfChosenTemplates[rowData.templateId] : 0)}), Items(${state.templates[rowData.templateId].items.length})`}
      // hideChevron={
      //   ((state.badgeValueOfInstancesOfChosenTemplates.hasOwnProperty(rowData.templateId) && state.badgeValueOfInstancesOfChosenTemplates[rowData.templateId] > 0)
      //    ? false : true)
      // }
      onPress={() => {
        // if(state.badgeValueOfInstancesOfChosenTemplates.hasOwnProperty(rowData.templateId) && state.badgeValueOfInstancesOfChosenTemplates[rowData.templateId] > 0) {
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
        // }
      }}
    />
    return(
      <View style={styles.bodyContainer}>
        <SearchBar
          lightTheme
          round={true}
          onChangeText={searchBarText => searchBarTextTemplateList(searchBarText)}
          placeholder='Search Templates'
        />
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
