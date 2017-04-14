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

import TemplateAddContainer from '../templateAdd/templateAddContainer';
import TemplateDetailsContainer from './templateDetailsContainer'

export default class TemplateListsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText_templateList: ''
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   let tempResult = true
  //   nextProps.state.navigatePopToTopRequest.templateList ? (this.props.navigatePopToTopRequestFn('templateList', false), tempResult = false, this.props.navigator.popToTop()) : null
  //   return tempResult
  // }
  componentDidMount() {
    this.props.state.dataSourceTemplates._cachedRowCount == 0 && this.props.navigator.push(
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
          parentTab: 'templateList'
        },
        title: 'Template Add',
        component: TemplateAddContainer
      }
    );
  }
  componentDidUpdate() {
    this.props.state.navigatePopToTopRequest.templateList && (this.props.navigatePopToTopRequestFn('templateList', false), this.props.navigator.popToTop());
  }
  render() {
    const { route, navigator, state, searchBarText } = this.props;
    const renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.title}
      underlayColor='#C0C0C0'
      subtitle={`Category : ${rowData.category}\nInstances(${(state.badgeValueOfInstancesOfChosenTemplates.hasOwnProperty(rowData.templateId) ? state.badgeValueOfInstancesOfChosenTemplates[rowData.templateId] : 0)}), Items(${state.templates[rowData.templateId].items.length})`}
      // subtitle={`Instances(${(state.badgeValueOfInstancesOfChosenTemplates.hasOwnProperty(rowData.templateId) ? state.badgeValueOfInstancesOfChosenTemplates[rowData.templateId] : 0)}), Items(${state.templates[rowData.templateId].items.length})`}
      // hideChevron={
      //   ((state.badgeValueOfInstancesOfChosenTemplates.hasOwnProperty(rowData.templateId) && state.badgeValueOfInstancesOfChosenTemplates[rowData.templateId] > 0)
      //    ? false : true)
      // }
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
          title: `${rowData.title}`,
          component: TemplateDetailsContainer,
        }
      )}
    />
    const renderRowTemp = rowData => (
      <View
        style={{
          // borderTopWidth: 1,
          borderBottomWidth: 1
        }}>
        <Text>
          title : {rowData.title}
          {'\n'}
          subtitle : {`Category(${rowData.category}), Instances(${(state.badgeValueOfInstancesOfChosenTemplates.hasOwnProperty(rowData.templateId) ? state.badgeValueOfInstancesOfChosenTemplates[rowData.templateId] : 0)}), Items(${state.templates[rowData.templateId].items.length})`}
        </Text>
      </View>
    )
    return(
      <View style={styles.bodyContainer}>
        <SearchBar
          lightTheme
          round={true}
          onChangeText={searchText_templateList => {
            this.setState({
              searchText_templateList
            })
            searchBarText(searchText_templateList.trim(), 'templateList')
          }}
          placeholder='Search Templates'
        />
        {this.state.searchText_templateList !== ''
          ? (
              <FormLabel>
                Check List Templates : {state.dataSourceTemplates._cachedRowCount || 0 }, searched
              </FormLabel>
            )
          : (
              <FormLabel>
                Check List Templates : {state.templatesLength || 0}
              </FormLabel>
            )
        }
        <List>
          <ListView
            dataSource={state.dataSourceTemplates}
            renderRow={renderRow}
            enableEmptySections={true}
            removeClippedSubviews={false}
          />
        </List>
      </View>
    )
  }
}
