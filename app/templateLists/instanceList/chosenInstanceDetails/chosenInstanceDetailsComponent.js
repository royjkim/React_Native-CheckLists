import React from 'react'
import {
  View,
  Text,
  ListView,
  Picker,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native'
import {
  List,
  ListItem,
  Button,
  FormLabel,
  FormInput,
  CheckBox,
  SearchBar,
} from 'react-native-elements'
import styles from '../../../components/styles'

import ChosenInstanceDetailModifyContainer from './chosenInstanceDetailModifyContainer'

export default class ChosenInstanceDetailsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalPickerVisible: false,
      pickerValue: 'all'
      // saveButtonVisible: false,
      // instanceName: this.props.route.passProps.chosenInstance.name || '',
      // templateTitle: this.props.state.chosenTemplate.title || '',
      // prev_instanceName: this.props.route.passProps.chosenInstance.name || '',
      // prev_templateTitle: this.props.state.chosenTemplate.title || '',
      // changeValue_instanceName: false,
      // changeValue_templateTitle: false,
      // saved: false
    };
  }

  componentWillMount() {
    this.props.state.existOrNot_chosenInstance || this.becauseOfExistNotAlertMsgFn();
    this.setState({
      pickerValue: this.props.state.statusPicker.hasOwnProperty(this.props.route.__navigatorRouteID) ? this.props.state.statusPicker[this.props.route.__navigatorRouteID] : 'all'
    });
  }

  componentWillUpdate(nextProps) {
    nextProps.state.existOrNot_chosenInstance || this.becauseOfExistNotAlertMsgFn();
  }

  // componentDidUpdate() {
  //   const __navigatorRouteID = this.props.route.__navigatorRouteID,
  //         parentTab = this.props.route.passProps.parentTab,
  //         navigatePrevent = this.props.state.navigatePrevent,
  //         triedNavigateWhenPrevented = this.props.state.triedNavigateWhenPrevented,
  //         navigatePreventFn = this.props.navigatePreventFn,
  //         triedNavigateWhenPreventedFn = this.props.triedNavigateWhenPreventedFn;
  //
  //   this.checkIfNavigatePreventOrNot(__navigatorRouteID, parentTab, navigatePrevent, triedNavigateWhenPrevented, navigatePreventFn, triedNavigateWhenPreventedFn);
  //   // !this.state.saveButtonVisible && (this.state.changeValue_instanceName || this.state.changeValue_templateTitle) && this.setState({ saveButtonVisible: true });
  //
  //   // // Below is for changeValue of 'instanceName or templateTitle', make redux navigate prevent & hide save button.
  //   // (this.state.changeValue_instanceName || this.state.changeValue_templateTitle) && (navigatePrevent[__navigatorRouteID] || navigatePreventFn(__navigatorRouteID, true),
  //   //   navigatePrevent[parentTab] || navigatePreventFn(parentTab, true));
  //   //
  //   // // Below is for when the value of 'instanceName or templateTitle' restored , make redux navigate able.
  //   // (!this.state.changeValue_instanceName && !this.state.changeValue_templateTitle) && (navigatePrevent[__navigatorRouteID] && navigatePreventFn(__navigatorRouteID, false),
  //   //   navigatePrevent[parentTab] && navigatePreventFn(parentTab, false), (this.state.saveButtonVisible && this.setState({ saveButtonVisible: false })));
  //
  //   // Below is for alert let an user know 'save before navigate', then make redux 'alert completed'.
  //     triedNavigateWhenPrevented[__navigatorRouteID] && (
  //       this.state.changeValue_instanceName ?
  //         (alert('press save button to save changed instance name.'), triedNavigateWhenPreventedFn(__navigatorRouteID, false))
  //           : this.state.changeValue_templateTitle && (alert('press save button to save changed template name.'), this.props.triedNavigateWhenPreventedFn(__navigatorRouteID, false)));
  //
  //     triedNavigateWhenPrevented[parentTab] && (
  //       this.state.changeValue_templateTitle ?
  //         (alert('press save button to save changed template name.'), triedNavigateWhenPreventedFn(parentTab, false))
  //           : this.state.changeValue_instanceName && (alert('press save button to save changed instance name.'), triedNavigateWhenPreventedFn(parentTab, false)));
  // }
  //
  // checkIfNavigatePreventOrNot(__navigatorRouteID, parentTab, navigatePrevent, triedNavigateWhenPrevented, navigatePreventFn, triedNavigateWhenPreventedFn) {
  //
  //   // Below is for changeValue of 'instanceName or templateTitle', make redux navigate prevent & hide save button.
  //   (this.state.changeValue_instanceName || this.state.changeValue_templateTitle) && (navigatePrevent[__navigatorRouteID] || navigatePreventFn(__navigatorRouteID, true),
  //     navigatePrevent[parentTab] || navigatePreventFn(parentTab, true),
  //     this.state.saveButtonVisible || this.setState({ saveButtonVisible: true }));
  //
  //   // Below is for when the value of 'instanceName or templateTitle' restored , make redux navigate able.
  //   (!this.state.changeValue_instanceName && !this.state.changeValue_templateTitle) && (navigatePrevent[__navigatorRouteID] && navigatePreventFn(__navigatorRouteID, false),
  //     navigatePrevent[parentTab] && navigatePreventFn(parentTab, false),
  //     this.state.saveButtonVisible && this.setState({ saveButtonVisible: false }));
  //
  // }

  becauseOfExistNotAlertMsgFn() {
    const tempFn_becauseOfExistNotAlertMsgFn = this.becauseOfExistNotAlertMsgFn;
    this.becauseOfExistNotAlertMsgFn = () => null;
    Alert.alert(
      'Instance Deleted',
      'ChosenInstanceDetailsComponent - Because of Current Instance Deleted. Page would be directed to back.',
      [
        { text: 'Confirm', onPress: () => {
          this.checkIfNavigatePreventOrNot();
          this.becauseOfExistNotAlertMsgFn = tempFn_becauseOfExistNotAlertMsgFn;
          this.props.navigator.pop()
          }
        }
      ]
    )
  }

  render() {
    const {
        route,
        navigator,
        state,
        changeStatusOfItemsCustomized,
        chooseCategory,
        // navigatePreventFn,
        // modifyTemplate,
        // modifyInstance,
      } = this.props,
      { __navigatorRouteID } = route,
      { chosenInstance } = route.passProps;
    const renderRow = (rowData, sectionId) => (
      <View>
        <CheckBox
          // title={rowData.desc}
          title={`${rowData.desc}, orderNum : ${rowData.orderNum}`}
          checked={rowData.status}
          onPress={() => changeStatusOfItemsCustomized(rowData)}
        />
      </View>
    )
    const resetData = () => {
      this.setState({
        modalPickerVisible: false,
        instanceName: this.props.route.passProps.chosenInstance.name || '',
        templateTitle: this.props.state.chosenTemplate.title || '',
        prev_instanceName: this.props.route.passProps.chosenInstance.name || '',
        prev_templateTitle: this.props.state.chosenTemplate.title || '',
        changeValue_instanceName: false,
        changeValue_templateTitle: false,
        saved: false
      })
    }

    // Below is for change the 'this state of instanceName and templateTitle & changeValue_instanceName and changeValue_templateTitle'.
    const changeCommon = (newValue, attr) => {
      if(newValue == '') {
        Alert.alert(
          'Disable Delete',
          `${attr == 'instanceName' ? 'Instance Name shouldn\'t be empty.' : 'Template Name shouldn\'t be empty.'}`,
          [
            {
              text: 'Confirm', onPress: () => {
                this.setState({
                  [attr]: attr == 'instanceName' ? this.state.prev_instanceName : this.state.prev_templateTitle,
                  [`changeValue_${attr}`]: false
                });
                return null
              }
            }
          ]
        );
      };
      return prevState => {
        let tempResult = {};

        newValue !== prevState[attr] && (tempResult = {
          [attr]: newValue
        });

        newValue !== prevState[`prev_${attr}`] && prevState[`changeValue_${attr}`] ? tempResult = {
          [attr]: newValue,
        } : tempResult = {
          [attr]: newValue,
          [`changeValue_${attr}`]: true
        };

        newValue == prevState[`prev_${attr}`] && prevState[`changeValue_${attr}`] && (tempResult = {
          ...tempResult,
          [`changeValue_${attr}`]: false
        });
        return tempResult
      }
    }

    return(
      <View style={styles.bodyContainer}>
        <FormLabel>
          Instance Name : {state.chosenInstance.name}
        </FormLabel>
        {/* <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginVertical: 10
          }}
          >
            <Text
              style={{
                color: '#86939D',
                fontWeight: 'bold',
                marginLeft: 8
              }}
              >
              Instance Name :
            </Text>
            <View
              style={{
                flex: 1,
                borderColor: this.state.instanceName ? '#C1C1C1' : '#FF2A1A',
                borderBottomWidth: 1.5,
                marginHorizontal: 10
              }}
              >
              <TextInput
                value={this.state.instanceName}
                onChangeText={instanceName => this.setState(changeCommon(instanceName, 'instanceName'))}
                placeholder={this.state.prev_instanceName}
                style={{
                  flex: 1,
                  color: this.state.changeValue_instanceName ? '#159589' : '#605E60',
                  textAlign: 'center',
                  marginBottom: 2
                }}
              />
            </View>
        </View> */}
        <FormLabel>
          Template Name : {state.chosenTemplate.title}
        </FormLabel>
        {/* <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginVertical: 10
          }}
          >
            <Text
              style={{
                color: '#86939D',
                fontWeight: 'bold',
                marginLeft: 8
              }}
              >
              Template Name :
            </Text>
            <View
              style={{
                flex: 1,
                borderColor: this.state.templateTitle.length > 0 ? '#C1C1C1' : '#FF2A1A',
                borderBottomWidth: 1.5,
                marginHorizontal: 10
              }}
              >
              <TextInput
                value={this.state.templateTitle}
                onChangeText={templateTitle => this.setState(changeCommon(templateTitle, 'templateTitle'))}
                placeholder={this.state.prev_templateTitle}
                style={{
                  flex: 1,
                  color: this.state.changeValue_templateTitle ? '#159589' : '#605E60',
                  textAlign: 'center',
                  marginBottom: 2
                }}
              />
            </View>
        </View> */}
        <FormLabel>
          Items : total({state.countsOfStatusCompleted.total}), complete({state.countsOfStatusCompleted.completed}), uncomplete({state.countsOfStatusCompleted.uncompleted})
        </FormLabel>
        <View style={{ height: 10 }}/>
        <Button
          icon={{ name: 'sort', size: 22 }}
          title='Item Sort'
          backgroundColor='#159588'
          onPress={() => this.setState({ modalPickerVisible: true })}
        />
        {state.dataSourceItemsCustomizedOfChosenInstance._cachedRowCount !== state.countsOfStatusCompleted.total && <FormLabel>
          Filter : {state.statusPicker[__navigatorRouteID]}({state.dataSourceItemsCustomizedOfChosenInstance._cachedRowCount})
        </FormLabel>}
        <List>
          <ListView
            dataSource={state.dataSourceItemsCustomizedOfChosenInstance}
            renderRow={renderRow}
            enableEmptySections={true}
            removeClippedSubviews={false}
            style={{ maxHeight: 200 }}
          />
        </List>
        <View style={{ height: 10 }} />
        {/* {this.state.saveButtonVisible && (<View>
            <Button
              icon={{ name: 'check' }}
              title='Save'
              backgroundColor='#159589'
              onPress={() => {
                this.state.changeValue_templateTitle && modifyTemplate(state.chosenTemplate.templateId, this.state.templateTitle);
                this.state.changeValue_instanceName && modifyInstance(route.passProps.chosenInstance.instanceId, this.state.instanceName);
                this.setState({
                  saved: true,
                  prev_templateTitle: this.state.templateTitle,
                  prev_instanceName: this.state.instanceName,
                  changeValue_instanceName: false,
                  changeValue_templateTitle: false
                })
                state.navigatePrevent[route.__navigatorRouteID] && navigatePreventFn(route.__navigatorRouteID, false);
                state.navigatePrevent[route.passProps.parentTab] && navigatePreventFn(route.passProps.parentTab, false);
                alert('save complete')
              }}
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
        )} */}
        <View style={{ height: 10 }}/>
        <Button
          icon={{ name: 'edit' }}
          title='Edit instance'
          backgroundColor='#159588'
          onPress={() => navigator.push({
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
                chosenInstance: route.passProps.chosenInstance
              },
              title: 'Instance Edit',
              component: ChosenInstanceDetailModifyContainer,
          })}
        />
        <Modal
          animationType={'slide'}
          visible={this.state.modalPickerVisible}
          transparent={true}
          >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: 'transparent' }}
              onPress={() => this.setState({ modalPickerVisible: false })}>
            </TouchableOpacity>
            <View
              style={{
                flex: 0,
                justifyContent: 'flex-end',
                marginBottom: 30,
                backgroundColor: 'white',
                borderTopWidth: 1,
                borderColor: '#C1C1C1'
              }}>
              <Picker
                selectedValue={this.state.pickerValue}
                // selectedValue={state.statusPicker.hasOwnProperty(__navigatorRouteID) ? state.statusPicker[__navigatorRouteID] : 'all'}
                // onValueChange={category => chooseCategory(category)}>
                onValueChange={pickerValue => {
                  this.setState({
                    pickerValue
                  });
                  chooseCategory(__navigatorRouteID, pickerValue);
                }}>
                {/* [action.chosenCategory.__navigatorRouteID]: action.chosenCategory.pickerValue */}
                <Picker.Item
                  label='All'
                  value='all'
                />
                <Picker.Item
                  label='Completed'
                  value='completed'
                />
                <Picker.Item
                  label='Uncompleted'
                  value='uncompleted'
                />
              </Picker>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
