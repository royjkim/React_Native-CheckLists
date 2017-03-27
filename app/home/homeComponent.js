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

import ChosenInstanceDetailsContainer from '../templateLists/instanceList/chosenInstanceDetails/chosenInstanceDetailsContainer'
import InstanceListsAllContainer from '../instanceListsAll/instanceListsAllContainer'

export default class HomeComponent extends React.Component {

  render() {
    const { route, navigator, state, searchBarTextInstanceList } = this.props
    const renderRow = (rowData, sectionId) => <ListItem
      key={sectionId}
      title={rowData.name}
      subtitle={`Template : ${state.templates[rowData.template].title}\nItems : total(${state.badgeValueOfStatusOfAllInstances[rowData.instanceId].total}), complete(${state.badgeValueOfStatusOfAllInstances[rowData.instanceId].completed})`}
      badge={{
        value: state.badgeValueOfStatusOfAllInstances[rowData.instanceId].uncompleted,
        // value: `${state.badgeValueOfStatusOfAllInstances[rowData.instanceId].completed} / ${state.badgeValueOfStatusOfAllInstances[rowData.instanceId].uncompleted}`,
        badgeTextStyle: { color: 'white' },
        badgeContainerStyle: { marginTop: 15 }
      }}
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
            chosenInstance: rowData
          },
          title: `${rowData.name}`,
          component: ChosenInstanceDetailsContainer,
        }
      )}
    />
    return(
      <View style={styles.bodyContainer}>
        <SearchBar
          lightTheme
          round={true}
          onChangeText={searchBarText => searchBarTextInstanceList(searchBarText.trim())}
          placeholder='Search Instances'
        />
        <FormLabel>
          Total Instances : {state.templateLength}
        </FormLabel>
        <List>
          <ListView
            dataSource={state.dataSourceForAllInstances}
            renderRow={renderRow}
            enableEmptySections={true}
          />
        </List>
        <View style={{ height: 5 }} />
        <Button
          icon={{ name: 'format-list-bulleted' }}
          title='Show instances with all items'
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
              title: 'Instance List with all items',
              component: InstanceListsAllContainer,
            })
          }}
        />
        {/* <Button
          icon={{ name: 'note-add' }}
          title='Add Template'
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
          }}
        /> */}
      </View>
    )
  }
}
