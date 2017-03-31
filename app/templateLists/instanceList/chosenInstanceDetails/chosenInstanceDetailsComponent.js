import React from 'react'
import {
  View,
  Text,
  ListView,
  Picker,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native'
import {
  List,
  ListItem,
  Button,
  FormLabel,
  CheckBox,
  SearchBar,
} from 'react-native-elements'
import styles from '../../../components/styles'

export default class ChosenInstanceDetailsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalPickerVisible: false,
      saveButtonVisible: false,
      instanceName: this.props.route.passProps.chosenInstance.name || '',
      templateTitle: this.props.state.chosenTemplate.title || '',
      prev_instanceName: this.props.route.passProps.chosenInstance.name || '',
      prev_templateTitle: this.props.state.chosenTemplate.title || '',
      changeValue_instanceName: false,
      changeValue_templateTitle: false,
      saved: false
    }
  }

  componentDidUpdate() {
    const __navigatorRouteID = this.props.route.__navigatorRouteID
    !this.state.saveButtonVisible ?
      this.state.changeValue_instanceName || this.state.changeValue_templateTitle ?
        this.setState({ saveButtonVisible: true }) : null
          : null

    // Below is for changeValue of 'instanceName or templateTitle', make redux navigate prevent & hide save button.
    this.state.changeValue_instanceName || this.state.changeValue_templateTitle ?
      this.props.state.navigatePrevent[__navigatorRouteID] ?
        this.props.state.navigatePrevent[this.props.route.passProps.parentTab] ?
          null : this.props.navigatePrevent(this.props.route.passProps.parentTab, true)
          : this.props.state.navigatePrevent[this.props.route.passProps.parentTab] ?
              this.props.navigatePrevent(__navigatorRouteID, true) : (this.props.navigatePrevent(__navigatorRouteID, true) , this.props.navigatePrevent(this.props.route.passProps.parentTab, true))
                : this.state.saveButtonVisible ?
                  this.setState({ saveButtonVisible: false }) : null

    // Below is for restored the valus of 'instanceName or templateTitle', make redux navigate able.
    !this.state.changeValue_instanceName && !this.state.changeValue_templateTitle ?
      this.props.state.navigatePrevent[__navigatorRouteID] ?
        this.props.state.navigatePrevent[this.props.route.passProps.parentTab] ?
          (this.props.navigatePrevent(__navigatorRouteID, false), this.props.navigatePrevent(this.props.route.passProps.parentTab), false)
          : this.props.navigatePrevent(__navigatorRouteID, false)
            : null
              : null

    // Below is for alert let an user know 'save before navigate', then make redux 'alert completed'.
    this.props.state.triedNavigateWhenPrevented[this.props.route.passProps.parentTab] || this.props.state.triedNavigateWhenPrevented[__navigatorRouteID] ?
      this.props.state.triedNavigateWhenPrevented[__navigatorRouteID] ?
        this.state.changeValue_instanceName ?
          (alert('press save button to save changed instance name.'), this.props.triedNavigateWhenPrevented(__navigatorRouteID, false))
            : this.state.changeValue_templateTitle ?
              (alert('press save button to save changed template name.'), this.props.triedNavigateWhenPrevented(__navigatorRouteID, false))
                : null
                  : this.props.state.triedNavigateWhenPrevented[this.props.route.passProps.parentTab] ?
                      this.state.changeValue_instanceName ?
                        (alert('press save button to save changed instance name.'), this.props.triedNavigateWhenPrevented(this.props.route.passProps.parentTab, false))
                        : this.state.changeValue_templateTitle ?
                          (alert('press save button to save changed template name.'), this.props.triedNavigateWhenPrevented(this.props.route.passProps.parentTab, false))
                            : null
                              : null
                                : null
  }
  render() {
    const {
      route,
      navigator,
      state,
      modifyItemsCustomized,
      chooseCategory,
      navigatePrevent,
      triedNavigateWhenPrevented
    } = this.props
    const { chosenInstance } = route.passProps
    const renderRow = (rowData, sectionId) => (
      <View>
        <CheckBox
          title={rowData.desc}
          checked={rowData.status}
          onPress={() => modifyItemsCustomized(rowData)}
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

    // const instanceNameChange = instanceName => {
    //   return prevState => {
    //     console.log(`prevState : `, prevState)
    //     let tempResult = {}
    //     instanceName !== prevState.instanceName ? prevState.changeValue_instanceName ? tempResult = {
    //       instanceName,
    //     } : tempResult = {
    //       instanceName,
    //       changeValue_instanceName: true
    //     } : null
    //
    //     instanceName == prevState.prev_instanceName ? prevState.changeValue_instanceName ? tempResult = {
    //       ...tempResult,
    //       changeValue_instanceName: false
    //     } : null : null
    //     return tempResult
    //   }
    // }

    // Below is for change the 'this state of instanceName and templateTitle & changeValue_instanceName and changeValue_templateTitle'.
    const changeCommon = (newValue, attr) => {
      return prevState => {
        let tempResult = {}

        newValue !== prevState[attr] ? tempResult = {
          [attr]: newValue
        } : null

        newValue !== prevState[`prev_${attr}`] ? prevState[`changeValue_${attr}`] ? tempResult = {
          [attr]: newValue,
        } : tempResult = {
          [attr]: newValue,
          [`changeValue_${attr}`]: true
        } : null

        newValue == prevState[`prev_${attr}`] ? prevState[`changeValue_${attr}`] ? tempResult = {
          ...tempResult,
          [`changeValue_${attr}`]: false
        } : null : null
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
                borderColor: this.state.instanceName ? '#C1C1C1' : '#FF2A1A',
                borderBottomWidth: 1.5,
                marginHorizontal: 10
              }}
              >
              <TextInput
                value={this.state.instanceName}
                onChangeText={instanceName => this.setState(changeCommon(instanceName, 'instanceName'))}
                placeholder='(at least 3 characters.)'
                style={{
                  flex: 1,
                  color: this.state.changeValue_instanceName ? '#159589' : '#605E60',
                  textAlign: 'center',
                  marginBottom: 2
                }}
              />
            </View>
        </View>
        {/* <FormLabel>
          Template Name : {state.chosenTemplate.title}
        </FormLabel> */}
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
                borderColor: this.state.templateTitle.length > 3 ? '#C1C1C1' : '#FF2A1A',
                borderBottomWidth: 1.5,
                marginHorizontal: 10
              }}
              >
              <TextInput
                value={this.state.templateTitle}
                onChangeText={templateTitle => this.setState(changeCommon(templateTitle, 'templateTitle'))}
                placeholder='(at least 3 characters.)'
                style={{
                  flex: 1,
                  color: this.state.changeValue_templateTitle ? '#159589' : '#605E60',
                  textAlign: 'center',
                  marginBottom: 2
                }}
              />
            </View>
        </View>
        <FormLabel>
          Items : total({state.countsOfStatusCompleted.total}), complete({state.countsOfStatusCompleted.completed}), uncomplete({state.countsOfStatusCompleted.uncompleted})
        </FormLabel>
        <View style={{ height: 10 }}/>
        <Button
          icon={{ name: 'sort', size: 22 }}
          title='Item Sort'
          backgroundColor='#6296F9'
          onPress={() => this.setState({ modalPickerVisible: true })}
        />
        {state.dataSourceItemsCustomizedOfChosenInstance._cachedRowCount !== state.countsOfStatusCompleted.total ? <FormLabel>
          Filter : {state.statusPicker}({state.dataSourceItemsCustomizedOfChosenInstance._cachedRowCount})
        </FormLabel> : null}
        <List>
          <ListView
            dataSource={state.dataSourceItemsCustomizedOfChosenInstance}
            renderRow={renderRow}
            enableEmptySections={true}
          />
        </List>
        <View style={{ height: 10 }} />
        {this.state.saveButtonVisible ? (
          <View>
            <Button
              icon={{ name: 'check' }}
              title='Save'
              backgroundColor='#159589'
              onPress={() => {
                this.setState({
                  saved: true,
                  prev_templateTitle: this.state.templateTitle,
                  prev_instanceName: this.state.instanceName,
                  changeValue_instanceName: false,
                  changeValue_templateTitle: false
                })
                state.navigatePrevent[route.__navigatorRouteID] ? navigatePrevent(route.__navigatorRouteID, false) : null
                state.navigatePrevent[route.passProps.parentTab] ? navigatePrevent(route.passProps.parentTab, false) : null
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
        ) : null }
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
                backgroundColor: 'white'
              }}>
              <Picker
                selectedValue={state.statusPicker}
                onValueChange={category => chooseCategory(category)}>
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
