import React from 'react'
import {
  View,
  Text,
  ListView,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from 'react-native'
import styles from '../../components/styles'
import {
  Button,
  List,
  ListItem,
  FormLabel,
  SearchBar,
  Icon,
} from 'react-native-elements'

import TemplateAddContainer from '../../templateAdd/templateAddContainer'
import ChosenInstanceDetailsContainer from './chosenInstanceDetails/chosenInstanceDetailsContainer'

export default class InstanceListComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      addNewInstanceModalVisible: false,
      chosenTemplateForAdd: this.props.route.passProps.chosenTemplate.title,
      chosenTemplateForAddTemplateId: this.props.route.passProps.chosenTemplate.templateId,
      tempInstanceName: ''
    }
  }

  render() {
    const { route,
            navigator,
            state,
            searchBarText,
            addInstance,
          } = this.props,
          checkInstanceEmptyOrNot = state.instancesOfChosenTemplate.length == 0;
    const renderRowInstances = (rowData, sectionId) => <ListItem
      key={sectionId}
      title={rowData.name}
      underlayColor='#C0C0C0'
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
    const renderRowTemplates = rowData => <ListItem
      key={rowData.templateId}
      title={rowData.title}
      subtitle={rowData.title == route.passProps.chosenTemplate.title ? 'This is current template.' : null}
      underlayColor='#C0C0C0'
      onPress={() => {
        this.setState({
          chosenTemplateForAdd: rowData.title,
          chosenTemplateForAddTemplateId: rowData.templateId
        });
        this.refs['tempInstanceName'].focus();
      }}
    />
    return(
      <View
        style={styles.bodyContainer}
        >
        <View>
          <View>
          <View style={{ marginVertical: 10, height: 2 }} />
          <SearchBar
            lightTheme
            round={true}
            placeholder='Search Instances'
            value={this.state.searchText}
            onChangeText={searchText => {
              this.setState(state => ({
                searchText
              }))
              searchBarText(searchText, 'instancesOfChosenTemplate');
            }}
          />
          {this.state.searchText !== ''
            ? (
                <FormLabel>
                  ▼ Instances of {route.title} : {state.dataSourceInstancesOfChosenTemplate._dataBlob.s1.length}(searched)
                </FormLabel>
              )
            : (
                <FormLabel>
                  ▼ Instances of {route.title} : {state.dataSourceInstancesOfChosenTemplate._dataBlob.s1.length}
                </FormLabel>
              )
          }
            <List>
              <ListView
                dataSource={state.dataSourceInstancesOfChosenTemplate}
                renderRow={renderRowInstances}
                enableEmptySections={true}
                removeClippedSubviews={false}
              />
            </List>
            <View style={{ height: 10 }}/>
            <Button
              icon={{ name: 'add' }}
              backgroundColor='#008D14'
              title='Add Instance'
              buttonStyle={{ borderRadius: 10 }}
              onPress={() => this.setState({ addNewInstanceModalVisible: true })}
            />
          </View>
            <Modal
              animationType={'slide'}
              transparent={true}
              visible={this.state.addNewInstanceModalVisible}
              >
              <View
                style={{ flex: 1 }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                    }}
                    onPress={() => this.state.tempInstanceName =='' ? this.setState({ addNewInstanceModalVisible: false, chosenTemplateForAdd: '', tempInstanceName: '' }) : Alert.alert(
                      'Warning',
                      'After input instance name, press submit button.',
                      [
                        { text: 'OK', onPress: () => this.refs['tempInstanceName'].focus() }
                      ]
                    )}
                    >
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
                        {this.state.chosenTemplateForAdd ? `Chosen Template : ${this.state.chosenTemplateForAdd}` : 'Choose Template from below list.'}
                      </FormLabel>
                      <List>
                        <ListView
                          dataSource={state.dataSourceTemplates}
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
                              placeholder={this.state.chosenTemplateForAdd ? 'input name for new instance.' : 'Choose Template First.'}
                              editable={this.state.chosenTemplateForAdd !== ''}
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
                              ]) : (this.setState({
                              addNewInstanceModalVisible: false,
                              tempInstanceName: '',
                              chosenTemplateForAdd: ''
                            }), addInstance(state.lastId, {
                              instanceId: state.lastId.instances + 1,
                              items: [],
                              name: this.state.tempInstanceName,
                              template: this.state.chosenTemplateForAddTemplateId
                            }))
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
                          const pageMoveFn = () => {
                            this.setState({ addNewInstanceModalVisible: false, tempInstanceName: '' });
                            navigator.push({
                              passProps: {
                                leftButton: {
                                  title: 'back',
                                  component: ''
                                },
                                rightButton: {
                                  title: '',
                                  component: ''
                                },
                                parentTab: route.passProps.parentTab
                              },
                              title: 'Template Add',
                              component: TemplateAddContainer
                            });
                          };
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
            </Modal>
        </View>
      </View>
    )
  }
}
