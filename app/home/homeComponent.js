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
import TemplateAddContainer from '../templateAdd/templateAddContainer'
import InstanceListContainer from '../templateLists/instanceList/instanceListContainer';

export default class HomeComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText_instanceList: ''
    }
  }

  componentDidMount() {
    // console.log('this.props.state.checkTemplateEmptyOrNot : ', String(this.props.state.checkTemplateEmptyOrNot));
    // console.log('this.props.state.checkInstanceEmptyOrNot : ', String(this.props.state.checkInstanceEmptyOrNot));
    (this.props.state.checkTemplateEmptyOrNot || this.props.state.checkInstanceEmptyOrNot) && this.checkEmptyTemplateAndInstance(this.props.state.checkTemplateEmptyOrNot, this.props.state.checkInstanceEmptyOrNot)
  }
  shouldComponentUpdate(nextProps) {
    let tempResult = true;
    // Below is for let this presentational component knows need to be navigate.popToTop().
    nextProps.state.navigatePopToTopRequest.home && (this.props.navigatePopToTopRequest('home', false), tempResult = false, this.props.navigator.popToTop());
    return tempResult
  }

  // componentWillUpdate(nextProps) {
  //   console.log('componentWillUpdate');
  //   (nextProps.state.checkTemplateEmptyOrNot || nextProps.state.checkInstanceEmptyOrNot) && this.checkEmptyTemplateAndInstance(nextProps.state.checkTemplateEmptyOrNot, nextProps.state.checkInstanceEmptyOrNot)
  // }

  checkEmptyTemplateAndInstance(checkTemplateEmptyOrNot, checkInstanceEmptyOrNot) {
    console.log('checkTemplateEmptyOrNot : ', String(checkTemplateEmptyOrNot));
    console.log('checkInstanceEmptyOrNot : ', String(checkInstanceEmptyOrNot))
    checkTemplateEmptyOrNot ? this.props.navigator.push(
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
        title: 'Template List',
        component: TemplateAddContainer
      }
    ) : checkInstanceEmptyOrNot && this.props.navigator.push(
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
        title: 'Instance List',
        component: InstanceListContainer
      }
    );
  }

  render() {
    const { route,
            navigator,
            state,
            searchBarText } = this.props;
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
        {(state.checkTemplateEmptyOrNot || state.checkInstanceEmptyOrNot) ? <View>
          {state.checkTemplateEmptyOrNot || state.checkInstanceEmptyOrNot && <Button
            icon={{ name: 'add' }}
            backgroundColor='#008D14'
            title='Page move to instance list'
            buttonStyle={{ borderRadius: 10 }}
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
                title: 'Instance List',
                component: InstanceListContainer
              }
            )}
          />}
          {state.checkTemplateEmptyOrNot && <Button
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
                title: 'Template List',
                component: TemplateAddContainer
              }
            )}
          />}
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
              style={{ maxHeight: 350 }}
            />
          </List>
          <View style={{ height: 10 }} />
          {state.checkInstanceEmptyOrNot || <Button
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
        </View>}
      </View>
    )
  }
}
