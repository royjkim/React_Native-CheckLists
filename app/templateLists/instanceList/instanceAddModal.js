import React from 'react';
import {
  View,
  Text,
  ListView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from 'react-native';
import {
  Button,
  List,
  ListItem,
  FormLabel,
} from 'react-native-elements';

export default class InstanceAddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempInstanceName: '',
    }
  }
  render() {
    const { chosenTemplateForAdd,
            chosenTemplateForAddTemplateId,
            addInstanceModalVisibleToggleFn,
            dataSourceTemplates,
            templateChosenFn,
            addInstanceTemplateChosenCompletedFn,
            pageMoveFn,
            chosenTemplateTitle } = this.props;
    const renderRowTemplates = rowData => <ListItem
      key={rowData.templateId}
      title={rowData.title}
      subtitle={rowData.title == chosenTemplateTitle ? 'This is current template.' : null}
      underlayColor='#C0C0C0'
      onPress={() => {
        templateChosenFn(rowData.title, rowData.templateId);
        this.refs['tempInstanceName'].focus();
      }}
    />
    return (
      <View
        style={{ flex: 1 }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            onPress={() => this.state.tempInstanceName =='' ? addInstanceModalVisibleToggleFn() : Alert.alert(
              'Warning',
              'After input instance name, press submit button.',
              [
                { text: 'OK', onPress: () => this.refs['tempInstanceName'].focus() }
              ]
            )}
            >
            <View style={{
              flex: 1,
              backgroundColor: 'white',
              opacity: 0.6
            }}/>
          </TouchableOpacity>
          <KeyboardAvoidingView
            behavior='position'
            contentContainerStyle={{
              flex: 0,
              backgroundColor: 'white',
              borderTopWidth: 1,
              borderColor: '#86939D',
              paddingBottom: 20
            }}
            >
              <FormLabel>
                {chosenTemplateForAdd ? `Chosen Template : ${chosenTemplateForAdd}` : 'Choose Template from below list.'}
              </FormLabel>
              <List>
                <ListView
                  dataSource={dataSourceTemplates}
                  renderRow={renderRowTemplates}
                  enableEmptySections={true}
                  removeClippedSubviews={false}
                  style={{ maxHeight: 200 }}
                />
              </List>
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  marginHorizontal: 10,
                  marginVertical: 15
                  // marginBottom: 15
                }}
                >
                  <View
                    style={{
                      flex: 1,
                      borderColor: '#C1C1C1',
                      borderBottomWidth: 1,
                      // marginBottom: 10
                    }}
                    >
                    <TextInput
                      ref='tempInstanceName'
                      value={this.state.tempInstanceName}
                      autoFocus={true}
                      onChangeText={tempInstanceName => this.setState({ tempInstanceName })}
                      placeholder={chosenTemplateForAdd ? 'input name for new instance.' : 'Choose Template First.'}
                      editable={chosenTemplateForAdd !== ''}
                      style={{
                        flex: 1,
                        color: this.state.tempInstanceName ? '#605E60' : '#9E9E9E',
                        textAlign: 'center'
                        // marginHorizontal: 10
                      }}
                    />
                  </View>
                  <Button
                    title='Submit'
                    backgroundColor='#008D14'
                    buttonStyle={{ borderRadius: 10 }}
                    onPress={() => this.state.tempInstanceName == '' ? Alert.alert(
                      'Warning',
                      'input new category',
                      [
                        { text: 'OK' }
                      ]) : (addInstanceTemplateChosenCompletedFn(this.state.tempInstanceName)
                        // this.setState({
                        //   addNewInstanceModalVisible: false,
                        //   tempInstanceName: '',
                        //   chosenTemplateForAdd: ''
                        // }),
                        // addInstance(state.lastId, {
                        //   instanceId: state.lastId.instances + 1,
                        //   items: [],
                        //   name: this.state.tempInstanceName,
                        //   template: this.state.chosenTemplateForAddTemplateId
                        // })
                      )
                    }
                  />
              </View>
              <View style={{ height: 10 }} />
              <Button
                icon={{ name: 'note-add' }}
                title='Page move to add new template'
                backgroundColor='#339AED'
                buttonStyle={{ borderRadius: 10 }}
                onPress={() => {
                  // const pageMoveFn = () => {
                  //   this.setState({ addNewInstanceModalVisible: false, tempInstanceName: '' });
                  //   navigator.push({
                  //     passProps: {
                  //       leftButton: {
                  //         title: 'back',
                  //         component: ''
                  //       },
                  //       rightButton: {
                  //         title: '',
                  //         component: ''
                  //       },
                  //       parentTab: route.passProps.parentTab
                  //     },
                  //     title: 'Template Add',
                  //     component: TemplateAddContainer
                  //   });
                  // };
                  this.state.tempInstanceName == '' ? pageMoveFn() : Alert.alert(
                      'Warning',
                      'You already inputted new instance name. If you want to ignore it, press OK.',
                      [
                        { text: 'Cancel', onPress: () => this.refs['tempInstanceName'].focus() },
                        { text: 'OK', onPress: () => pageMoveFn()}
                      ]
                    )
                }}
              />
          </KeyboardAvoidingView>
      </View>
    )
  }
}
