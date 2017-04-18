import React from 'react'
import {
  View,
  Text,
  ListView,
  Alert,
} from 'react-native'
import styles from '../components/styles'

import {
  Button,
  List,
  ListItem,
  FormLabel,
  SearchBar,
} from 'react-native-elements'

import ChosenInstanceDetailsContainer from '../templateLists/instanceList/chosenInstanceDetails/chosenInstanceDetailsContainer';
import InstanceListsAllContainer from '../instanceListsAll/instanceListsAllContainer';
import TemplateAddNewContainer from '../templateAdd/templateAddNewContainer';
import InstanceListContainer from '../templateLists/instanceList/instanceListContainer';
import TemplateListsContainer from '../templateLists/templateListsContainer';

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
    nextProps.navigatePopToTopRequest.home && (this.props.navigatePopToTopRequestFn('home', false), tempResult = false, this.props.navigator.popToTop());
    return tempResult
  }

  render() {
    const { route,
            navigator,
            state,
            searchBarText,
            dataSourceForAllInstances,
            badgeValueOfStatusOfAllInstances,
            instances,
            templates,
            // navigatePrevent
            navigatePopToTopRequest,
            // triedNavigateWhenPrevented
            checkInstanceEmptyOrNot,
            checkTemplateEmptyOrNot,
            allItemslength,
          } = this.props,
          templateLength = dataSourceForAllInstances._cachedRowCount;

    const renderRow = (rowData, sectionId) => <ListItem
      key={sectionId}
      title={rowData.name}
      // subtitle={`Template : ${templates[rowData.template].title}\nItems : total(${badgeValueOfStatusOfAllInstances[rowData.instanceId].total}), complete(${badgeValueOfStatusOfAllInstances[rowData.instanceId].completed})`}
      subtitle={badgeValueOfStatusOfAllInstances.hasOwnProperty(rowData.instanceId) ? `Template : ${templates[rowData.template].title}\nItems : total(${badgeValueOfStatusOfAllInstances[rowData.instanceId].total}), complete(${badgeValueOfStatusOfAllInstances[rowData.instanceId].completed})` : `Template : ${templates[rowData.template].title}`}
      underlayColor='#C0C0C0'
      badge={{
        value: badgeValueOfStatusOfAllInstances.hasOwnProperty(rowData.instanceId) ? badgeValueOfStatusOfAllInstances[rowData.instanceId].uncompleted : 0,
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
            parentTab: route.passProps.parentTab,
            chosenInstance: rowData
          },
          title: `${rowData.name}`,
          component: ChosenInstanceDetailsContainer,
        }
      )}
    />
    return(
      <View style={styles.bodyContainer}>
        {checkTemplateEmptyOrNot ? <View>
          <FormLabel>
            There is no template, you need to make template first. Then add instance is needed.
          </FormLabel>
          <Button
          icon={{ name: 'add' }}
          title='Make New Template'
          backgroundColor='#008D14'
          buttonStyle={{ borderRadius: 10, marginTop: 10  }}
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
                parentTab: 'home'
              },
              title: 'Template Add',
              component: TemplateAddNewContainer
            }
          )}
        />
      </View> : checkInstanceEmptyOrNot ? <View>
        <FormLabel>
          There is no instance, you need to add instance first.
        </FormLabel>
        <Button
          icon={{ name: 'add' }}
          backgroundColor='#008D14'
          title='Move template list to add instance'
          buttonStyle={{ borderRadius: 10, marginTop: 10 }}
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
                parentTab: this.props.route.passProps.parentTab,
              },
              title: 'Template List',
              component: TemplateListsContainer,
            }
          )}
        />
        </View> : <View>
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
                  Total Instances : {templateLength}, searched
                </FormLabel>
              )
            : (
                <FormLabel>
                  Total Instances : {templateLength}
                </FormLabel>
            )
          }
          <List>
            <ListView
              dataSource={dataSourceForAllInstances}
              renderRow={renderRow}
              enableEmptySections={true}
              removeClippedSubviews={false}
              style={{ maxHeight: 350 }}
            />
          </List>
          <View style={{ height: 10 }} />
          {checkInstanceEmptyOrNot || <Button
            icon={{ name: 'format-list-bulleted' }}
            title={`Show instances with all items(${allItemslength})`}
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
        </View>}
      </View>
    )
  }
}
