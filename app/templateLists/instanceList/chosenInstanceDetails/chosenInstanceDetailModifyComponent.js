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
  ScrollView,
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
      saved: false
    };
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  componentWillMount() {
    console.log('componentWillMount - this.state : ', this.state);
    console.log('componentWillMount - this.props : ', this.props);
    this.setState({
      dataSourceItemsCustomizedOfChosenInstance: this.ds.cloneWithRows(this.state.tempItems)
    })
  }

  componentDidUpdate() {
    console.log('componentDidUpdate - this.state : ', this.state);
    console.log('componentDidUpdate - this.props : ', this.props);
    const __navigatorRouteID = this.props.route.__navigatorRouteID,
          parentTab = this.props.route.passProps.parentTab,
          navigatePrevent = this.props.state.navigatePrevent,
          triedNavigateWhenPrevented = this.props.state.triedNavigateWhenPrevented,
          navigatePreventFn = this.props.navigatePreventFn,
          triedNavigateWhenPreventedFn = this.props.triedNavigateWhenPreventedFn;

    !this.state.saveButtonVisible && (this.state.changeValue_tempInstanceName || this.state.changeValue_tempTemplateTitle || this.state.changeValue_items) && this.setState({ saveButtonVisible: true });

    // Below is for changeValue of 'instanceName or templateTitle', make redux navigate prevent & hide save button.
    // (this.state.changeValue_tempInstanceName || this.state.changeValue_tempTemplateTitle) && (navigatePrevent[__navigatorRouteID] || navigatePreventFn(__navigatorRouteID, true),
    //   navigatePrevent[parentTab] || navigatePreventFn(parentTab, true));

    // Below is for when the value of 'instanceName or templateTitle' restored , make redux navigate able.
    // (!this.state.changeValue_tempInstanceName && !this.state.changeValue_tempTemplateTitle) && (navigatePrevent[__navigatorRouteID] && navigatePreventFn(__navigatorRouteID, false),
    //   navigatePrevent[parentTab] && navigatePreventFn(parentTab, false), (this.state.saveButtonVisible && this.setState({ saveButtonVisible: false })));

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
  render() {
    const {
      route,
      navigator,
      state,
      modifyItemsCustomized,
      chooseCategory,
      navigatePreventFn,
      modifyTemplate,
      modifyInstance,
    } = this.props
    const { chosenInstance } = route.passProps;
    const changeItemText = (tempItemText, rowData, rowId, emptyStatusBoolean) => {
      const commonFn = () => this.setState(prevState => {
        console.log('common function')
        prevState.tempItems.hasOwnProperty(rowData.itemCustomizedId) && (prevState.tempItems[rowData.itemCustomizedId].desc = tempItemText);

        prevState.changeValue_items = !isEqual(prevState.tempItems, prevState.prevItems);
        prevState.changeValue_items && (prevState.dataSourceItemsCustomizedOfChosenInstance = this.ds.cloneWithRows(prevState.tempItems), console.log(`prevState.dataSourceItemsCustomizedOfChosenInstance._dataBlob.s1 : ${JSON.stringify(prevState.dataSourceItemsCustomizedOfChosenInstance._dataBlob.s1, null, 1)}`));
      });
      emptyStatusBoolean ? (Object.keys(this.state.tempItems).length > 1 ? Alert.alert(
        'Confirm Save',
        'You are making an existing item empty. If you want to delete it, press Save. Or press Cancel. Even though the item deleted, it won\'t be deleted neither on parent template.',
        [
          { text: 'Cancel' },
          // { text: 'Save', onPress: () => delete prevState.tempItems[rowData.itemCustomizedId] }
          { text: 'Save', onPress: () => {
              this.setState(prevState => {
                delete prevState.tempItems[rowData.itemCustomizedId];
                prevState.changeValue_items = !isEqual(prevState.tempItems, prevState.prevItems);
                prevState.changeValue_items && (prevState.dataSourceItemsCustomizedOfChosenInstance = this.ds.cloneWithRows(prevState.tempItems), console.log(`prevState.dataSourceItemsCustomizedOfChosenInstance._dataBlob.s1 : ${JSON.stringify(prevState.dataSourceItemsCustomizedOfChosenInstance._dataBlob.s1, null, 1)}`));
              }, console.log('delete - alert'));
            }
          }
        ]
      ) : Alert.alert(
        'Delete Disable',
        // 'Template should have at least 1 item.',
        `Template should have at least 1 item. emptyStatusBoolean : ${String(emptyStatusBoolean)}, tempItemText : ${tempItemText}`,
        [
          // { text: 'Confirm', onPress: () => {
          //     prevState.tempItems[rowData.itemCustomizedId].desc = prevState.prevItems[rowData.itemCustomizedId].desc;
          //     tempItemText = prevState.prevItems[rowData.itemCustomizedId].desc;
          //   }
          // }
          { text: 'Confirm', onPress: () => {
            this.setState({
              tempItems: {
                ...this.state.tempItems,
                [rowData.itemCustomizedId]: {
                  ...this.state.tempItems[rowData.itemCustomizedId],
                  desc: this.state.prevItems[rowData.itemCustomizedId].desc
                }
              }
            }, console.log('confirm - alert'));
            tempItemText = this.state.prevItems[rowData.itemCustomizedId].desc;
            commonFn();
          }
          }
        ]
      )) : commonFn();

    }
    const renderRow = (rowData, sectionId, rowId) => {
      // if(this.state.tempItems.hasOwnProperty(rowData.itemCustomizedId)) {
      console.log('rowData : ', rowData);
        return (<View
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
            placeholder={this.state.prevItems[rowData.itemCustomizedId].desc}
            style={{
              height: 30,
              textAlign: 'center',
              color: this.state.tempItems[rowData.itemCustomizedId].desc == this.state.prevItems[rowData.itemCustomizedId].desc ? '#605E60' : '#FF2A1A',
            }}
          />
        </View>)
      // }
    }
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
      saved: false
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
                  const addedLengthBetweenPrevItemsTempItems = prevState.prevItems.length - prevState.tempItems.length;
                  prevState.newItem = {
                    desc: prevState.tempNewItemDesc,
                    // itemId: addedLengthBetweenPrevItemsTempItems == 0 ? state.lastId.items + 1 : state.lastId.items + 1 + addedLengthBetweenPrevItemsTempItems,
                    itemId: prevState.newItem.itemId,
                    orderNum: prevState.newItem.orderNum + 1,
                    templateId: state.lastId.templates + 1
                  };
                  prevState.tempItems = [
                    ...prevState.tempItems,
                    {
                      ...prevState.newItem,
                      desc: prevState.tempNewItemDesc
                    }
                  ];
                  prevState.newItem.desc = '';
                  ++prevState.newItem.itemId;
                  // prevState.newItem = {
                  //   desc: '',
                  //   itemId: prevState.newItem.itemId + 1,
                  //   orderNum: prevState.newItem.orderNum,
                  //   templateId: state.lastId.templates + 1,
                  // };
                  prevState.tempNewItemDesc = '';
                  prevState.tempItems.sort((data1, data2) => data2.orderNum - data1.orderNum);
                  prevState.dataSourceNewAddedItems = this.ds.cloneWithRows(prevState.tempItems);
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
        <ScrollView>
          <Text>
            tempItems : {JSON.stringify(this.state.tempItems, null, 1)}
          </Text>
        </ScrollView>
        <View style={{ height: 10 }} />
        {this.state.saveButtonVisible && (
          <View>
            <Button
              icon={{ name: 'check' }}
              title='Save'
              backgroundColor='#159589'
              onPress={() => {
                this.state.changeValue_tempTemplateTitle && modifyTemplate(state.chosenTemplate.templateId, this.state.tempTemplateTitle);
                this.state.changeValue_tempInstanceName && modifyInstance(route.passProps.chosenInstance.instanceId, this.state.tempInstanceName);
                this.setState({
                  saved: true,
                  prev_templateTitle: this.state.tempTemplateTitle,
                  prev_instanceName: this.state.tempInstanceName,
                  changeValue_tempInstanceName: false,
                  changeValue_tempTemplateTitle: false
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
      </View>
    )
  }
}
