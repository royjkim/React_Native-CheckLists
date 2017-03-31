import React from 'react'
import {
  View,
  Text,
  ListView,
  TextInput,
  Alert,
} from 'react-native'
import styles from '../../components/styles'
import {
  Button,
  List,
  ListItem,
  FormLabel,
  SearchBar,
} from 'react-native-elements'
import { isEqual } from 'lodash'

import ChosenInstanceDetailsContainer from './chosenInstanceDetails/chosenInstanceDetailsContainer'

export default class InstanceListComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: {
        instancesOfChosenTemplate: '',
        itemsOfChosenTemplate: ''
      },
      tempItemDesc: {},
      hasEmptyOnItemDesc: false,
      changeValue: false
    }
    this.initialStateDataFn = () => {
      let tempData = {}
      this.props.state.itemsOfChosenTemplate.map(value => tempData[value.itemId] = value.desc)
      this.setState(state => ({
        tempItemDesc: tempData,
        prevItemDesc: tempData
      }))
    }
  }

  componentWillMount() {
    this.initialStateDataFn()
    // let tempData = {}
    // this.props.state.itemsOfChosenTemplate.map(value => tempData[value.itemId] = value.desc)
    // this.setState(state => ({
    //   tempItemDesc: tempData,
    //   prevItemDesc: tempData
    // }))
  }

  componentDidUpdate() {
    const { navigatePrevent, triedNavigateWhenPrevented } = this.props.state,
          __navigatorRouteID = this.props.route.__navigatorRouteID,
          parentTab = this.props.route.passProps.parentTab,
          navigatePreventFn = this.props.navigatePreventFn,
          triedNavigateWhenPreventedFn = this.props.triedNavigateWhenPreventedFn;

    // Below is for when the item text changed , make redux navigate disable.
    this.state.changeValue ?
      navigatePrevent[__navigatorRouteID] ?
        navigatePrevent[parentTab] ?
          null : navigatePreventFn(parentTab, true)
            : navigatePreventFn(__navigatorRouteID, true)
              : navigatePrevent[__navigatorRouteID]
                ? navigatePreventFn(__navigatorRouteID, false)
                  : navigatePrevent[parentTab] ?
                    navigatePreventFn(parentTab, false)
                      : null

    // Below is for alert let an user know 'save before navigate', then make redux 'alert completed'.
    triedNavigateWhenPrevented[__navigatorRouteID] ?
      (alert('press save button to save changed item'), triedNavigateWhenPreventedFn(__navigatorRouteID, false))
        : triedNavigateWhenPrevented[parentTab] ?
          (alert('press save button to save changed item'), triedNavigateWhenPreventedFn(parentTab, false))
            : null
  }

  render() {
    const { route, navigator, state, searchBarText, navigatePreventFn } = this.props;
    const resetData = () => {
      this.setState(prevState => ({
        searchText: {
          instancesOfChosenTemplate: '',
          itemsOfChosenTemplate: ''
        },
        tempItemDesc: {},
        hasEmptyOnItemDesc: false,
        changeValue: false
      }))
      this.initialStateDataFn()
    };
    const saveAlertFn = () => {
      Alert.alert(
        'Confirm Save',
        'You make an existing item empty. If you want to delete it, press Save. Or press Cancel.',
        [
          { text: 'Cancel' },
          { text: 'Save', onPress: () => {
            let tempResult = this.state.tempItemDesc
            for(let key in tempResult) {
              tempResult[key].desc == '' ? delete tempResult[key] : null
            }
            saveProcessFn(tempResult);
          }}
        ]
      )
    }
    const saveProcessFn = newItemDesc => {
      this.setState(prevState => ({
        changeValue: false,
        prevItemDesc: newItemDesc ? newItemDesc : prevState.tempItemDesc,
        hasEmptyOnItemDesc: false
      })),
      state.navigatePrevent[route.__navigatorRouteID] ? navigatePreventFn(route.__navigatorRouteID, false) : null;
      state.navigatePrevent[route.passProps.parentTab] ? navigatePreventFn(route.passProps.parentTab, false) : null;
      alert('save complete');
      this.props.navigator.pop()
    }
    const renderRowInstances = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.name}
      badge={{
        value: state.badgeValueOfStatusOfEachInstanceOfChosenTemplate[rowData.instanceId].uncompleted,
        badgeTextStyle: { color: 'white' },
        badgeContainerStyle: { marginTop: 5 }
      }}
      subtitle={`Items : total(${state.badgeValueOfStatusOfEachInstanceOfChosenTemplate[rowData.instanceId].total}), complete(${state.badgeValueOfStatusOfEachInstanceOfChosenTemplate[rowData.instanceId].completed})`}
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
    />;
    const changeItemText = (itemText, chosen_itemId, emptyStatusBoolean)=> prevState => {
      let tempResult = {
        tempItemDesc: {
          ...prevState.tempItemDesc,
          // [chosen_itemId]: itemText == '' ? prevState.prevItemDesc[chosen_itemId] : itemText
          [chosen_itemId]: itemText
        },
        hasEmptyOnItemDesc: emptyStatusBoolean,
        changeValue: prevState.changeValue
      }
      tempResult.changeValue = !isEqual(prevState.prevItemDesc, tempResult.tempItemDesc)
      return tempResult
    }
    const renderRowItems = rowData => {
      return (
        <View
          key={rowData.itemId}
          style={{
            // flexDirection: 'row',
            marginHorizontal: 10,
            marginVertical: 10,
            // flex: 1,
            borderColor: this.state.prevItemDesc[rowData.itemId] == this.state.tempItemDesc[rowData.itemId] ? '#C1C1C1' : '#159589',
            // borderBottomWidth: this.state.prevItemDesc[rowData.itemId] == rowData.desc ? 0 : 1.5,
            borderBottomWidth: 1.5,
            marginHorizontal: 10
          }}
          >
              <TextInput
                value={this.state.tempItemDesc[rowData.itemId]}
                onChangeText={itemText => this.setState(changeItemText(itemText, rowData.itemId, itemText == ''))}
                placeholder={this.state.prevItemDesc[rowData.itemId]}
                placeholderTextColor='#86939D'
                style={{
                  // flex: 1,
                  height: 23,
                  color: this.state.prevItemDesc[rowData.itemId] == this.state.tempItemDesc[rowData.itemId] ? '#86939D' : '#159589',
                  textAlign: 'center',
                  // marginBottom: 0,
                  // borderWidth: 1,
                  // borderColor: 'red'
                }}
              />
        </View>
      )
    };
    return(
      <View style={styles.bodyContainerOnSideMenu}>
        <SearchBar
          lightTheme
          round={true}
          onChangeText={searchText => {
            this.setState(state => ({
              searchText: {
                ...state.searchText,
                itemsOfChosenTemplate: searchText
              }
            }))
            searchBarText(searchText, 'itemsOfChosenTemplate')
          }}
          placeholder='Search Items'
        />
        <FormLabel>
          Template : {route.passProps.chosenTemplate.title}
        </FormLabel>
        {this.state.searchText.itemsOfChosenTemplate !== ''
          ? (
              <FormLabel>
                Category : {route.passProps.chosenTemplate.category}, Items({state.itemsLengthOfChosenTemplate}, searched)
              </FormLabel>
            )
          : (
              <FormLabel>
                Category : {route.passProps.chosenTemplate.category}, Items({state.itemsLengthOfChosenTemplate})
              </FormLabel>
            )}
        <List>
          <ListView
            dataSource={state.dataSourceOfItemsOfChosenTemplate}
            enableEmptySections={true}
            renderRow={renderRowItems}
          />
        </List>
        {this.state.changeValue
          ? (
            <View>
              <Button
                icon={{ name: 'check' }}
                title='Save'
                backgroundColor='#159589'
                onPress={() => this.state.hasEmptyOnItemDesc ? saveAlertFn() : saveProcessFn() }
              />
              <View
                style={{ height: 10 }}
              />
              <Button
                title='Restore'
                backgroundColor='#86939D'
                onPress={() => resetData()}
              />
            </View>
            )
          : null}

        <View>
          <View style={{ marginVertical: 15, height: 2 }} />
          <SearchBar
            lightTheme
            round={true}
            placeholder='Search Instances'
            onChangeText={searchText => {
              this.setState(state => ({
                searchText: {
                  ...state,
                  instancesOfChosenTemplate: searchText
                }
              }))
              searchBarText(searchText, 'instancesOfChosenTemplate');
            }}
          />
          {this.state.searchText.instancesOfChosenTemplate !== ''
            ? (
                <FormLabel>
                  ▼ Instance List of {route.title} : {state.dataSourceInstancesOfChosenTemplate._dataBlob.s1.length}(searched)
                </FormLabel>
              )
            : (
                <FormLabel>
                  ▼ Instance List of {route.title} : {state.dataSourceInstancesOfChosenTemplate._dataBlob.s1.length}
                </FormLabel>
              )
          }
          <List>
            <ListView
              dataSource={state.dataSourceInstancesOfChosenTemplate}
              renderRow={renderRowInstances}
              enableEmptySections={true}
            />
          </List>
        </View>
      </View>
    )
  }
}
