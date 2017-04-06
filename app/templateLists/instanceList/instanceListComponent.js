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
    const {
      route,
      navigator,
      state,
      searchBarText,
      addInstance,
    } = this.props;
    const renderRowInstances = (rowData, sectionId) => <ListItem
      key={sectionId}
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
    const renderRowTemplates = rowData => <ListItem
      key={rowData.templateId}
      title={rowData.title}
      subtitle={rowData.title == route.passProps.chosenTemplate.title ? 'This is current template.' : null}
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
              />
            </List>
            <View style={{ height: 10 }}/>
            <Button
              icon={{ name: 'add' }}
              title='Add Instance'
              backgroundColor='#339AED'
              onPress={() => this.setState({ addNewInstanceModalVisible: true })}
            />
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
                    onPress={() => this.setState({ addNewInstanceModalVisible: false, chosenTemplateForAdd: '', tempInstanceName: '' })}
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
                            backgroundColor='#159589'
                            onPress={() => this.state.tempInstanceName == '' ? alert('input new category') : (this.setState({
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
                        title='Move to add new template'
                        backgroundColor='#339AED'
                        onPress={() => {
                          this.setState({ addNewInstanceModalVisible: false })
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
                          })
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
