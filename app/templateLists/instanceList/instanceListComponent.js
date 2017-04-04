import React from 'react'
import {
  View,
  Text,
  ListView,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
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
      addNewInstanceModalVisible: false
    }
  }

  render() {
    const {
      route,
      navigator,
      state,
      searchBarText,
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
                  ▼ {route.title} : {state.dataSourceInstancesOfChosenTemplate._dataBlob.s1.length}(searched)
                </FormLabel>
              )
            : (
                <FormLabel>
                  ▼ {route.title} : {state.dataSourceInstancesOfChosenTemplate._dataBlob.s1.length}
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
                    onPress={() => this.setState({ addNewInstanceModalVisible: false })}
                    >
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 0,
                      backgroundColor: 'white',
                      borderTopWidth: 1,
                      borderColor: '#86939D',
                      paddingBottom: 30
                    }}
                    >
                      <FormLabel>
                        Choose Template.
                      </FormLabel>
                      <List>
                        <ListView
                          dataSource={state.dataSourceTemplates}
                          renderRow={renderRowTemplates}
                          enableEmptySections={true}
                          style={{ maxHeight: 200 }}
                        />
                      </List>
                      <View style={{ height: 10 }} />
                      <Button
                        icon={{ name: 'note-add' }}
                        title='Add new template'
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
                  </View>
              </View>
            </Modal>
        </View>
      </View>
    )
  }
}
