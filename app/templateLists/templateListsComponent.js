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

import InstanceListContainer from './instanceList/instanceListContainer'

export default class TemplateListsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText_templateList: ''
    }
  }

  shouldComponentUpdate(nextProps) {
    let tempResult = true
    nextProps.state.navigatePopToTopRequest.templateList ? (this.props.navigatePopToTopRequest('templateList', false), tempResult = false, this.props.navigator.popToTop()) : null
    return tempResult
  }
  render() {
    const { route, navigator, state, searchBarText } = this.props
    const renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.title}
      subtitle={`Category(${rowData.category}), Instances(${(state.badgeValueOfInstancesOfChosenTemplates.hasOwnProperty(rowData.templateId) ? state.badgeValueOfInstancesOfChosenTemplates[rowData.templateId] : 0)}), Items(${state.templates[rowData.templateId].items.length})`}
      // hideChevron={
      //   ((state.badgeValueOfInstancesOfChosenTemplates.hasOwnProperty(rowData.templateId) && state.badgeValueOfInstancesOfChosenTemplates[rowData.templateId] > 0)
      //    ? false : true)
      // }
      onPress={() => {
        console.log(`TemplateListsComponent - route : `, route)
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
                parentTab: route.passProps.parentTab,
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
          onChangeText={searchText => {
            this.setState(state => ({
              searchText_templateList: searchText
            }))
            searchBarText(searchText.trim(), 'templateList')
          }}
          placeholder='Search Templates'
        />
        {this.state.searchText_templateList !== ''
          ? (
              <FormLabel>
                Check List Templates : {state.dataSourceTemplates._cachedRowCount}, searched
              </FormLabel>
            )
          : (
              <FormLabel>
                Check List Templates : {state.templatesLength}
              </FormLabel>
            )
        }
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
