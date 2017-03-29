import React from 'react'
import {
  View,
  Text,
  ListView,
  Picker,
  Modal,
  TouchableOpacity,
  TextInput,
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
      instanceName: this.props.route.passProps.chosenInstance.name || '',
      templateName: this.props.state.chosenTemplate.title || '',
      prev_instanceName: this.props.route.passProps.chosenInstance.name || '',
      prev_templateName: this.props.state.chosenTemplate.title || '',
      changeValueInstanceName: false,
      changeValueTemplateTitle: false,
      saved: false
    }
  }

  // componentDidUpdate() {
  //   !this.state.changeValueInstanceName && !this.state.changeValueTemplateTitle && this.props.state.triedNavigateWhenPrevented !== '' ? this.props.triedNavigateWhenPrevented(this.props.route.title, false) : null
  //   this.props.state.triedNavigateWhenPrevented ? this.state.changeValueInstanceName ? alert('press save button to save changed instance name.') : this.state.changeValueTemplateTitle ? alert('press save button to save changed template name.') : null : null
  // }
  componentWillUpdate(nextProps, nextState) {
    // console.log(`nexProps : `, nextProps)
    // console.log(`nextState : `, nextState)






  }

  componentDidUpdate() {

    !this.state.changeValueInstanceName && !this.state.changeValueTemplateTitle && this.props.state.triedNavigateWhenPrevented !== '' ? this.props.triedNavigateWhenPrevented(this.props.route.title, false) : null

    // this.state.changeValueTemplateTitle || this.state.changeValueInstanceName ? this.props.navigatePrevent(this.props.route.title, true) : null
    // !this.state.changeValueTemplateTitle && !this.state.changeValueInstanceName ? this.props.navigatePrevent(this.props.route.title, false) : null

    if(this.state.changeValueTemplateTitle || this.state.changeValueInstanceName) {
      this.props.state.navigatePrevent[this.props.route.title] ? null : this.props.navigatePrevent(this.props.route.title, true)
    }

    if(!this.state.changeValueTemplateTitle && !this.state.changeValueInstanceName) {
      this.props.state.navigatePrevent[this.props.route.title] ? this.props.navigatePrevent(this.props.route.title, false) : null
    }
    // this.state.changeValueTemplateTitle || this.state.changeValueInstanceName ? this.props.navigatePrevent(this.props.route.title, true) : null
    // !this.state.changeValueTemplateTitle && !this.state.changeValueInstanceName ? this.props.navigatePrevent(this.props.route.title, false) : null

    this.props.state.triedNavigateWhenPrevented ? this.state.changeValueInstanceName ? alert('press save button to save changed instance name.') : this.state.changeValueTemplateTitle ? alert('press save button to save changed template name.') : null : null


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
    // const preventOrNotFn = () => {
    //   this.state.changeValueTemplateTitle || this.state.changeValueInstanceName ? navigatePrevent(route.title, true) : null
    //   !this.state.changeValueTemplateTitle && !this.state.changeValueInstanceName ? navigatePrevent(route.title, false) : null
    // }
    const resetData = () => {
      this.setState({
        modalPickerVisible: false,
        instanceName: this.props.route.passProps.chosenInstance.name || '',
        templateName: this.props.state.chosenTemplate.title || '',
        prev_instanceName: this.props.route.passProps.chosenInstance.name || '',
        prev_templateName: this.props.state.chosenTemplate.title || '',
        changeValueInstanceName: false,
        changeValueTemplateTitle: false,
        saved: false
      })
    }
    return(
      <View style={styles.bodyContainer}>
        {/* <FormLabel>
          Instance Name : {chosenInstance.name}
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
                onChangeText={instanceName => {
                  this.setState({ instanceName })
                  // this.state.instanceName !== this.state.prev_instanceName && !this.state.changeValueInstanceName ? this.setState({ changeValueInstanceName: true }) : this.state.instanceName == this.state.prev_instanceName && this.state.changeValueInstanceName ? this.setState({ changeValueInstanceName: false }) : null
                  // this.state.instanceName !== this.state.prev_instanceName ? this.setState({ changeValueInstanceName: true }, console.log('this.state.changeValueInstanceName : ', String(this.state.changeValueInstanceName))) : this.setState({ changeValueInstanceName: false })

                  // if(this.state.instanceName !== this.state.prev_instanceName && !this.state.changeValueInstanceName) {
                  //   this.setState({ changeValueInstanceName: true })
                  // } else if(this.state.instanceName == this.state.prev_instanceName && this.state.changeValueInstanceName) {
                  //   this.setState({ changeValueInstanceName: false })
                  // }
                  // this.state.instanceName !== this.state.prev_instanceName && !this.state.changeValueInstanceName ?
                  //   this.setState({ changeValueInstanceName: true }) : this.state.instanceName == this.state.prev_instanceName && this.state.changeValueInstanceName ?
                  //    this.setState({ changeValueInstanceName: false }) : null
                  // preventOrNotFn()

                  this.state.instanceName !== this.state.prev_instanceName ? this.setState({ changeValueInstanceName: true }, console.log('this.state.changeValueInstanceName : ', String(this.state.changeValueInstanceName))) : this.setState({ changeValueInstanceName: false })
                }}
                placeholder='(at least 3 characters.)'
                style={{
                  flex: 1,
                  color: this.state.instanceName ? '#605E60' : '#FF2A1A',
                  textAlign: 'center',
                  marginBottom: 2
                }}
              />
            </View>
        </View>
        <Text>
          instanceName : {this.state.instanceName}
          {'\n'}
          this.state.prev_instanceName : {this.state.prev_instanceName}
          {'\n'}
          this.state.changeValueInstanceName : {String(this.state.changeValueInstanceName)}
          {'\n'}
          this.props.state.triedNavigateWhenPrevented :{'\n'}
          {JSON.stringify(this.props.state.triedNavigateWhenPrevented, null, 1)}
        </Text>
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
                borderColor: this.state.templateName.length > 3 ? '#C1C1C1' : '#FF2A1A',
                borderBottomWidth: 1.5,
                marginHorizontal: 10
              }}
              >
              <TextInput
                value={this.state.templateName}
                onChangeText={templateName => {
                  this.setState({ templateName })
                  // this.state.templateName !== this.state.prev_templateName && !this.state.changeValueTemplateTitle ? this.setState({ changeValueTemplateTitle: true }) : this.state.templateName == this.state.prev_templateName && this.state.changeValueTemplateTitle ? this.setState({ changeValueTemplateTitle: false }) : null
                  // preventOrNotFn()
                  this.state.templateName !== this.state.prev_templateName && !this.state.changeValueTemplateTitle ? this.setState({ changeValueTemplateTitle: true }) : this.state.templateName == this.state.prev_templateName && this.state.changeValueTemplateTitle ? this.setState({ changeValueTemplateTitle: false }) : null
                }}
                // placeholder={chosenInstance.name || '(at least 3 characters.)'}
                placeholder='(at least 3 characters.)'
                style={{
                  flex: 1,
                  color: this.state.templateName.length > 3 ? '#605E60' : '#FF2A1A',
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
        {this.state.changeValueInstanceName || this.state.changeValueTemplateTitle ? (<View>
          <Button
            icon={{ name: 'check' }}
            title='Save'
            backgroundColor='#6296F9'
            onPress={() => {
              this.setState({
                saved: true,
                prev_templateName: this.state.templateName,
                prev_instanceName: this.state.instanceName,
                changeValueInstanceName: false,
                changeValueTemplateTitle: false
              })
              navigatePrevent(route.title, false)
              alert('save complete')
            }}
          />
          <View
            style={{ height: 10 }}
          />
          <Button
            title='reset'
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
              style={{ flex: 0, justifyContent: 'flex-end', marginBottom: 30 }}>
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
