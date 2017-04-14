import React from 'react'
import {
  View,
  Text,
  ListView,
  ScrollView,
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
  constructor(props) {
    super(props)
    this.state = {
      searchText_instanceList: ''
    }
  }
  shouldComponentUpdate(nextProps) {
    let tempResult = true;
    // Below is for let this presentational component knows need to be navigate.popToTop().
    nextProps.state.navigatePopToTopRequest.home && (this.props.navigatePopToTopRequest('home', false), tempResult = false, this.props.navigator.popToTop());
    return tempResult
  }

  render() {
    const { route, navigator, state, searchBarText, savelocal, loadlocal, deleteAll, deleteLocalStorage } = this.props
    const renderRow = (rowData, sectionId) => <ListItem
      key={sectionId}
      title={rowData.name}
      subtitle={`Template : ${state.templates[rowData.template].title}\nItems : total(${state.badgeValueOfStatusOfAllInstances[rowData.instanceId].total}), complete(${state.badgeValueOfStatusOfAllInstances[rowData.instanceId].completed})`}
      underlayColor='#C0C0C0'
      badge={{
        value: state.badgeValueOfStatusOfAllInstances[rowData.instanceId].uncompleted,
        // value: `${state.badgeValueOfStatusOfAllInstances[rowData.instanceId].completed} / ${state.badgeValueOfStatusOfAllInstances[rowData.instanceId].uncompleted}`,
        badgeTextStyle: { color: 'white' },
        badgeContainerStyle: { marginTop: 15 }
      }}
      onPress={() => {
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
              chosenInstance: rowData
            },
            title: `${rowData.name}`,
            component: ChosenInstanceDetailsContainer,
          }
        )
      }}
    />
    return(
      <View style={styles.bodyContainer}>
        <SearchBar
          lightTheme
          round={true}
          onChangeText={searchText_instanceList => {
            this.setState({
              searchText_instanceList
            });
            searchBarText(searchText_instanceList.trim(), 'instanceList')
          }}
          placeholder='Search Instances'
        />
        {this.state.searchText_instanceList !== ''
          ? (
              <FormLabel>
                Total Instances : {state.templateLength}, searched
              </FormLabel>
            )
          : (
              <FormLabel>
                Total Instances : {state.templateLength}
              </FormLabel>
          )
        }
        <List>
          <ListView
            dataSource={state.dataSourceForAllInstances}
            renderRow={renderRow}
            enableEmptySections={true}
            removeClippedSubviews={false}
          />
        </List>
        <View style={{ height: 10 }} />
        {state.dataSourceForAllInstances._cachedRowCount > 0 && <Button
          icon={{ name: 'format-list-bulleted' }}
          title='Show instances with all items'
          buttonStyle={{ borderRadius: 10 }}
          backgroundColor='#3D7CAA'
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
                parentTab: route.passProps.parentTab
              },
              title: 'All items in instance List',
              component: InstanceListsAllContainer,
            })
          }}
        />}
        <ScrollView>
          <Button
            title='Save on local'
            buttonStyle={{ marginTop: 10 }}
            onPress={() => savelocal()}
          />
          <Button
            title='Load from local'
            buttonStyle={{ marginTop: 10 }}
            onPress={() => loadlocal()}
          />
          <Button
            title='Delete All'
            buttonStyle={{ marginTop: 10 }}
            onPress={() => deleteAll()}
          />
          <Button
            title='Delete Data on local Storage'
            buttonStyle={{ marginTop: 10 }}
            onPress={() => deleteLocalStorage()}
          />
        </ScrollView>
      </View>
    )
  }
}
