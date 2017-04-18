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
    };
  }

  componentWillMount() {
    // this.props.existOrNot_chosenInstance || this.becauseOfExistNotAlertMsgFn();
    (!this.props.existOrNot_chosenTemplate || !this.props.existOrNot_chosenInstance) && this.becauseOfExistNotAlertMsgFn();
    const __navigatorRouteID = this.props.route.__navigatorRouteID,
          statusPicker = this.props.statusPicker;
    this.setState({
      pickerValue: statusPicker.hasOwnProperty(__navigatorRouteID) ? statusPicker[__navigatorRouteID] : 'all'
    });
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps.existOrNot_chosenInstance : ', String(nextProps.existOrNot_chosenInstance))
    (!nextProps.existOrNot_chosenTemplate || !nextProps.existOrNot_chosenInstance) && this.becauseOfExistNotAlertMsgFn();
    // nextProps.existOrNot_chosenInstance || this.becauseOfExistNotAlertMsgFn();
  }

  becauseOfExistNotAlertMsgFn() {
    const tempFn_becauseOfExistNotAlertMsgFn = this.becauseOfExistNotAlertMsgFn;
    this.becauseOfExistNotAlertMsgFn = () => null;
    this.becauseOfExistNotAlertMsgFn = tempFn_becauseOfExistNotAlertMsgFn;
    this.props.navigator.pop();
    // Alert.alert(
    //   'Instance Deleted',
    //   'Because of Current Instance Deleted. Page would be directed to back.',
    //   [
    //     { text: 'OK' }
    //     // { text: 'Confirm', onPress: () => {
    //     //   this.becauseOfExistNotAlertMsgFn = tempFn_becauseOfExistNotAlertMsgFn;
    //     //   this.props.navigator.pop()
    //     //   }
    //     // }
    //   ]
    // )
  }

  render() {
    const { route,
            navigator,
            chosenInstance,
            chosenTemplate,
            changeStatusOfItemsCustomized,
            countsOfStatusCompleted,
            dataSourceItemsCustomizedOfChosenInstance,
            statusPicker,
            chooseCategory } = this.props,
          { __navigatorRouteID } = route;
    const renderRow = (rowData, sectionId) => (
      <View>
        <CheckBox
          title={rowData.desc}
          // title={`${rowData.desc}, orderNum : ${rowData.orderNum}`}
          checked={rowData.status}
          onPress={() => changeStatusOfItemsCustomized(rowData)}
        />
      </View>
    )
    const resetData = () => {
      this.setState({
        modalPickerVisible: false,
        instanceName: this.props.route.passProps.chosenInstance.name || '',
        templateTitle: this.props.chosenTemplate.title || '',
        prev_instanceName: this.props.route.passProps.chosenInstance.name || '',
        prev_templateTitle: this.props.chosenTemplate.title || '',
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
          Instance Name : {chosenInstance.name}
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
          Template Name : {chosenTemplate.title}
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
          Items : total({countsOfStatusCompleted.total}), complete({countsOfStatusCompleted.completed}), uncomplete({countsOfStatusCompleted.uncompleted})
        </FormLabel>
        <View style={{ height: 10 }}/>
        <Button
          icon={{ name: 'sort', size: 22 }}
          title='Item Sort'
          backgroundColor='#7B84FC'
          buttonStyle={{ borderRadius: 10 }}
          onPress={() => this.setState({ modalPickerVisible: true })}
        />
        {dataSourceItemsCustomizedOfChosenInstance._cachedRowCount !== countsOfStatusCompleted.total && <FormLabel>
          Filter : {statusPicker[__navigatorRouteID]}({dataSourceItemsCustomizedOfChosenInstance._cachedRowCount})
        </FormLabel>}
        <List>
          <ListView
            dataSource={dataSourceItemsCustomizedOfChosenInstance}
            renderRow={renderRow}
            enableEmptySections={true}
            removeClippedSubviews={false}
            style={{ maxHeight: 300 }}
          />
        </List>
        <View style={{ height: 10 }} />
        <Button
          icon={{ name: 'edit' }}
          title='Edit instance'
          backgroundColor='#159588'
          buttonStyle={{ borderRadius: 10 }}
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
          <View style={{
            flex: 1,
            marginBottom: 48
          }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: 'transparent',
              }}
              onPress={() => this.setState({ modalPickerVisible: false })}>
              <View style={{
                flex: 1,
                backgroundColor: 'white',
                opacity: 0.6
              }}/>
            </TouchableOpacity>
            <View
              style={{
                flex: 0,
                justifyContent: 'flex-end',
                // marginBottom: 30,
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
