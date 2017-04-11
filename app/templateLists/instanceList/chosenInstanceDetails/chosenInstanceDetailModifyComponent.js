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
} from 'react-native-elements';
import { isEqual, cloneDeep } from 'lodash';
import styles from '../../../components/styles'

export default class ChosenInstanceDetailModifyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      saveButtonVisible: false,
      tempInstanceName: this.props.route.passProps.chosenInstance.name || '',
      tempTemplateTitle: this.props.state.chosenTemplate.title || '',
      prev_instanceName: this.props.route.passProps.chosenInstance.name || '',
      prev_templateTitle: this.props.state.chosenTemplate.title || '',
      changeValue_tempInstanceName: false,
      changeValue_tempTemplateTitle: false,
      changeValue_items: false,
      prevItems: Object.freeze(cloneDeep(this.props.state.itemsCustomizedObjectOfChosenInstance)),
      tempItems: cloneDeep(this.props.state.itemsCustomizedObjectOfChosenInstance),
      // dataSourceItemsCustomizedOfChosenInstance: cloneDeep(this.props.state.dataSourceItemsCustomizedOfChosenInstance),
      dataSourceItemsCustomizedOfChosenInstance: this.props.state.dataSourceItemsCustomizedOfChosenInstance,
      modifyExistingItems: {},
    };
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }
  componentWillMount() {
    // console.log('componentWillMount - this.state : ', this.state);
    // console.log('componentWillMount - this.props : ', this.props);
    this.setState({
      dataSourceItemsCustomizedOfChosenInstance: this.ds.cloneWithRows(this.state.tempItems)
    })
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate - this.state : ', this.state);
    // console.log('componentDidUpdate - this.props : ', this.props);
    const __navigatorRouteID = this.props.route.__navigatorRouteID,
          parentTab = this.props.route.passProps.parentTab,
          navigatePrevent = this.props.state.navigatePrevent,
          triedNavigateWhenPrevented = this.props.state.triedNavigateWhenPrevented,
          navigatePreventFn = this.props.navigatePreventFn,
          triedNavigateWhenPreventedFn = this.props.triedNavigateWhenPreventedFn;

    // // Below is for determining of save button visible.
    // !this.state.saveButtonVisible && (this.state.changeValue_tempInstanceName || this.state.changeValue_tempTemplateTitle || this.state.changeValue_items) && this.setState({ saveButtonVisible: true });
    // this.state.saveButtonVisible && !this.state.changeValue_tempInstanceName && !this.state.changeValue_tempTemplateTitle && !this.state.changeValue_items && (this.setState({ saveButtonVisible: false }));

    this.checkIfNavigatePreventOrNot();

    // Below is for alert let an user know 'save before navigate', then make redux 'alert completed'.
    triedNavigateWhenPrevented[__navigatorRouteID] && (
      this.state.changeValue_tempInstanceName ?
        (alert('press save button to save changed instance name.'), triedNavigateWhenPreventedFn(__navigatorRouteID, false))
          : this.state.changeValue_tempTemplateTitle && (alert('press save button to save changed template name.'), this.props.triedNavigateWhenPreventedFn(__navigatorRouteID, false)));

    triedNavigateWhenPrevented[parentTab] && (
      this.state.changeValue_tempTemplateTitle ?
        (alert('press save button to save changed template name.'), triedNavigateWhenPreventedFn(parentTab, false))
          : this.state.changeValue_tempInstanceName && (alert('press save button to save changed instance name.'), triedNavigateWhenPreventedFn(parentTab, false)));
  }
  checkIfNavigatePreventOrNot() {
    const __navigatorRouteID = this.props.route.__navigatorRouteID,
          parentTab = this.props.route.passProps.parentTab,
          navigatePrevent = this.props.state.navigatePrevent,
          triedNavigateWhenPrevented = this.props.state.triedNavigateWhenPrevented,
          navigatePreventFn = this.props.navigatePreventFn,
          triedNavigateWhenPreventedFn = this.props.triedNavigateWhenPreventedFn;

    // Below is for alert let an user know 'save before navigate', then make redux 'alert completed'.
    (this.state.changeValue_tempInstanceName || this.state.changeValue_tempTemplateTitle || this.state.changeValue_items) && (
      navigatePrevent[__navigatorRouteID] || navigatePreventFn(__navigatorRouteID, true),
      navigatePrevent[parentTab] || navigatePreventFn(parentTab, true),
      this.state.saveButtonVisible || this.setState({ saveButtonVisible: true }));

    (!this.state.changeValue_tempInstanceName && !this.state.changeValue_tempTemplateTitle && !this.state.changeValue_items) && (
      navigatePrevent[__navigatorRouteID] && navigatePreventFn(__navigatorRouteID, false),
      navigatePrevent[parentTab] && navigatePreventFn(parentTab, false),
      this.state.saveButtonVisible && this.setState({ saveButtonVisible: false }));

  };

  render() {
    const {
      route,
      navigator,
      state,
      chooseCategory,
      navigatePreventFn,
      modifyTemplate,
      modifyInstance,
      modifyItemsCustomized,
      addItemsCustomized,
      delInstance,
    } = this.props
    const { chosenInstance } = route.passProps;
    const changeItemText = (tempItemText, rowData, rowId, emptyStatusBoolean) => {
      const commonFn = () => this.setState(prevState => {
        rowId in prevState.tempItems && (prevState.tempItems[rowData.itemCustomizedId].desc == tempItemText ?
          (prevState.modifyExistingItems.hasOwnProperty(rowData.itemCustomizedId) && delete prevState.modifyExistingItems[rowData.itemCustomizedId])
            : prevState.modifyExistingItems[rowData.itemCustomizedId] = {
                ...prevState.tempItems[rowData.itemCustomizedId],
                desc: tempItemText
            });
        prevState.tempItems[rowData.itemCustomizedId].desc = tempItemText;

        prevState.changeValue_items = !isEqual(prevState.tempItems, prevState.prevItems);
        prevState.changeValue_items && (prevState.dataSourceItemsCustomizedOfChosenInstance = this.ds.cloneWithRows(prevState.tempItems));
      });
      commonFn();
      emptyStatusBoolean && Object.keys(this.state.modifyExistingItems).length >= Object.keys(this.state.tempItems).length && Alert.alert(
        'Delete Disable',
        'Each Template should have at least 1 item.',
        [
          {
            text: 'Confirm', onPress: () => {
              this.setState(prevState => {
                prevState.prevItems.hasOwnProperty(rowData.itemCustomizedId) && (prevState.tempItems[rowData.itemCustomizedId].desc = prevState.prevItems[rowData.itemCustomizedId].desc);
                prevState.modifyExistingItems.hasOwnProperty(rowData.itemCustomizedId) && delete prevState.modifyExistingItems[rowData.itemCustomizedId];
                prevState.changeValue_items = !isEqual(prevState.tempItems, prevState.prevItems);
                prevState.changeValue_items && (prevState.dataSourceItemsCustomizedOfChosenInstance = this.ds.cloneWithRows(prevState.tempItems));
              });
              return null
            }
          }
        ]
      );
      // commonFn();
      }
    const renderRow = (rowData, sectionId, rowId) => <View
      style={{
        borderColor: this.state.tempItems[rowData.itemCustomizedId].desc !== '' ? '#C1C1C1' : '#FF2A1A',
        borderBottomWidth: 1.3,
        marginHorizontal: 10,
      }}
      >
      <TextInput
        value={this.state.tempItems[rowData.itemCustomizedId].desc}
        // value={rowData.desc}
        onChangeText={tempItemText => changeItemText(tempItemText, rowData, rowId, tempItemText == '')}
        placeholder={this.state.prevItems.hasOwnProperty(rowData.itemCustomizedId) ? this.state.prevItems[rowData.itemCustomizedId].desc : this.state.tempItems[rowData.itemCustomizedId].desc}
        style={{
          height: 30,
          textAlign: 'center',
          color: this.state.prevItems.hasOwnProperty(rowData.itemCustomizedId) ? this.state.tempItems[rowData.itemCustomizedId].desc == this.state.prevItems[rowData.itemCustomizedId].desc ? '#605E60' : '#159588' : '#159588',
        }}
      />
    </View>
    const resetData = () => this.setState({
      saveButtonVisible: false,
      tempInstanceName: this.props.route.passProps.chosenInstance.name || '',
      tempTemplateTitle: this.props.state.chosenTemplate.title || '',
      prev_instanceName: this.props.route.passProps.chosenInstance.name || '',
      prev_templateTitle: this.props.state.chosenTemplate.title || '',
      changeValue_tempInstanceName: false,
      changeValue_tempTemplateTitle: false,
      changeValue_items: false,
      prevItems: Object.freeze(cloneDeep(this.props.state.itemsCustomizedObjectOfChosenInstance)),
      tempItems: cloneDeep(this.props.state.itemsCustomizedObjectOfChosenInstance),
      dataSourceItemsCustomizedOfChosenInstance: this.ds.cloneWithRows(this.state.tempItems),
    });

    // Below is for change the 'this state of instanceName and templateTitle & changeValue_tempInstanceName and changeValue_tempTemplateTitle'.
    const changeCommon = (newValue, attr) => {
      if(newValue == '') {
        Alert.alert(
          'Disable Delete',
          `${attr == 'instanceName' ? 'Instance Name shouldn\'t be empty.' : 'Template Name shouldn\'t be empty.'}`,
          [
            {
              text: 'Confirm', onPress: () => {
                this.setState({
                  [attr]: attr == 'tempInstanceName' ? this.state.prev_instanceName : this.state.prev_templateTitle,
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
        <View
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
                borderColor: this.state.tempInstanceName ? '#C1C1C1' : '#FF2A1A',
                borderBottomWidth: 1.5,
                marginHorizontal: 10
              }}
              >
              <TextInput
                value={this.state.tempInstanceName}
                onChangeText={instanceName => this.setState(changeCommon(instanceName, 'tempInstanceName'))}
                placeholder={this.state.prev_instanceName}
                style={{
                  flex: 1,
                  color: this.state.changeValue_tempInstanceName ? '#159589' : '#605E60',
                  textAlign: 'center',
                }}
              />
            </View>
        </View>
        <View
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
                borderColor: this.state.tempTemplateTitle.length > 0 ? '#C1C1C1' : '#FF2A1A',
                borderBottomWidth: 1.5,
                marginHorizontal: 10
              }}
              >
              <TextInput
                value={this.state.tempTemplateTitle}
                onChangeText={templateTitle => this.setState(changeCommon(templateTitle, 'tempTemplateTitle'))}
                placeholder={this.state.prev_templateTitle}
                style={{
                  flex: 1,
                  color: this.state.changeValue_tempTemplateTitle ? '#159589' : '#605E60',
                  textAlign: 'center',
                }}
              />
            </View>
        </View>
        <FormLabel>
          Items : total({state.countsOfStatusCompleted.total})
        </FormLabel>
        <View style={{ height: 10 }} />
        <FormLabel>
          New Item
        </FormLabel>
        <View
          style={{ flexDirection: 'row' }}
          >
          <View
            style={{
              flex: 1,
              // borderWidth: 1
            }}
            >
            <FormInput
              ref='newItemFormInput'
              textInputRef='newItemText'
              value={this.state.tempNewItemDesc}
              placeholder='input item'
              placeholderTextColor='#FF7F7C'
              onChangeText={tempNewItemDesc => this.setState({ tempNewItemDesc })}
            />
          </View>
          <View
            style={{
              flex: 0,
            }}>
            <Button
              title='Add'
              backgroundColor='#159588'
              onPress={() => {
                this.state.tempNewItemDesc !== '' && this.setState(prevState => {
                  const addUniqueCount = Object.keys(prevState.tempItems).length - Object.keys(prevState.prevItems).length
                  prevState.newItemCustomized = {
                    desc: prevState.tempNewItemDesc,
                    instanceId: route.passProps.chosenInstance.instanceId,
                    itemCustomizedId: state.lastId.itemsCustomized + 1 + addUniqueCount,
                    itemId: 999,
                    orderNum: state.lastOrderNum + 1 + addUniqueCount,
                    templateId: state.chosenTemplate.templateId,
                    status: false,
                  };
                  // prevState.tempItems = [
                  //   ...prevState.tempItems,
                  //   {
                  //     ...prevState.newItemCustomized,
                  //     desc: prevState.tempNewItemDesc
                  //   }
                  // ];
                  prevState.tempItems[prevState.newItemCustomized.itemCustomizedId] = {
                    ...prevState.newItemCustomized
                  };
                  prevState.newItemCustomized.desc = '';
                  ++prevState.newItemCustomized.itemCustomizedId;
                  // prevState.newItemCustomized = {
                  //   desc: '',
                  //   itemId: prevState.newItemCustomized.itemId + 1,
                  //   orderNum: prevState.newItemCustomized.orderNum,
                  //   templateId: state.lastId.templates + 1,
                  // };
                  prevState.tempNewItemDesc = '';
                  // prevState.tempItems.sort((data1, data2) => data2.orderNum - data1.orderNum);
                  // prevState.dataSourceNewAddedItems = this.ds.cloneWithRows(prevState.tempItems);
                  prevState.changeValue_items = !isEqual(prevState.prevItems, prevState.tempItems);
                  prevState.dataSourceItemsCustomizedOfChosenInstance = this.ds.cloneWithRows(prevState.tempItems);
                })
              }}
            />
          </View>
        </View>
        <View style={{ height: 10 }}/>
        <List>
          <ListView
            // dataSource={state.dataSourceItemsCustomizedOfChosenInstance}
            dataSource={this.state.dataSourceItemsCustomizedOfChosenInstance}
            renderRow={renderRow}
            enableEmptySections={true}
            removeClippedSubviews={false}
            style={{ maxHeight: 200 }}
          />
        </List>
        <View style={{ height: 10 }} />
        {this.state.saveButtonVisible && (
          <View>
            <Button
              icon={{ name: 'check' }}
              title='Save'
              backgroundColor='#159589'
              onPress={() => {
                this.setState(prevState => {
                  prevState.changeValue_tempTemplateTitle && (modifyTemplate(state.chosenTemplate.templateId, prevState.tempTemplateTitle.trim()), prevState.prev_templateTitle = prevState.tempTemplateTitle.trim(), prevState.tempTemplateTitle = prevState.tempTemplateTitle.trim(), prevState.changeValue_tempInstanceName = false);
                  prevState.changeValue_tempInstanceName && (modifyInstance(route.passProps.chosenInstance.instanceId, prevState.tempInstanceName.trim()), prevState.prev_instanceName = prevState.tempInstanceName.trim(), prevState.tempInstanceName = prevState.tempInstanceName.trim() , prevState.changeValue_tempTemplateTitle = false);
                  for(let key in prevState.modifyExistingItems) {
                  //   delete prevState.tempItems[key]
                    prevState.modifyExistingItems[key].desc = prevState.modifyExistingItems[key].desc.trim();
                  };
                  Object.keys(prevState.modifyExistingItems).length > 0 && modifyItemsCustomized(prevState.modifyExistingItems);
                  prevState.modifyExistingItems = {};
                  let tempData_newAddedItemsCustomized = [];
                  for(let key in prevState.tempItems) {
                    prevState.tempItems[key].desc == '' ? delete prevState.tempItems[key] : prevState.tempItems[key].desc = prevState.tempItems[key].desc.trim();
                    // key in prevState.prevItems || addItemsCustomized(state.lastId, prevState.tempItems[key]);
                    key in prevState.prevItems || tempData_newAddedItemsCustomized.push(prevState.tempItems[key]);
                  }
                  tempData_newAddedItemsCustomized.sort((data1, data2) => data1.itemCustomizedId - data2.itemCustomizedId);
                  tempData_newAddedItemsCustomized.length > 0 && addItemsCustomized(state.lastId, tempData_newAddedItemsCustomized);
                  prevState.prevItems = Object.freeze((cloneDeep(prevState.tempItems)));
                  prevState.changeValue_items = false;
                  prevState.dataSourceItemsCustomizedOfChosenInstance = this.ds.cloneWithRows(prevState.tempItems);
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
        )}
        <View
          style={{ height: 10 }}
        />
        <Button
          icon={{ name: 'delete' }}
          title='delete'
          backgroundColor='#FF7F7C'
          onPress={() => Alert.alert(
            'Delete Confirm',
            `This instance (${this.state.prev_instanceName}) would be deleted. It couldn't restore after deleted.`,
            [
              { text: 'Cancel Delete' },
              { text: 'Confirm Delete', onPress: () => {
                  delInstance(route.passProps.chosenInstance);
                  this.checkIfNavigatePreventOrNot();
                  navigator.pop();
                }
              }
            ]
          )}
        />
      </View>
    )
  }
}
