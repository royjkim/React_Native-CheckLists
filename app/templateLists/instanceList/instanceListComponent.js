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

import InstanceAddModal from './instanceAddModal';
import TemplateAddContainer from '../../templateAdd/templateAddContainer'
import ChosenInstanceDetailsContainer from './chosenInstanceDetails/chosenInstanceDetailsContainer'

export default class InstanceListComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      addNewInstanceModalVisible: false,
      chosenTemplateForAdd: this.props.chosenTemplate.title,
      chosenTemplateForAddTemplateId: this.props.chosenTemplate.templateId,
      // tempInstanceName: ''
    }
  }

  componentWillMount() {
    this.props.existOrNot_chosenTemplate || this.becauseOfExistNotAlertMsgFn();
  }

  componentWillReceiveProps(nextProps) {
    nextProps.existOrNot_chosenTemplate || this.becauseOfExistNotAlertMsgFn();
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
            state,
            searchBarText,
            addInstance,
            chosenTemplate,
            dataSourceTemplates,
            lastId,
            dataSourceInstancesOfChosenTemplate,
            badgeValueOfStatusOfEachInstanceOfChosenTemplate,
            existOrNot_chosenTemplate,
            existOrNot_instancesOfChosenTemplate
          } = this.props;
    const renderRowInstances = (rowData, sectionId) => <ListItem
      key={sectionId}
      title={rowData.name}
      underlayColor='#C0C0C0'
      badge={{
        value: badgeValueOfStatusOfEachInstanceOfChosenTemplate[rowData.instanceId].uncompleted,
        badgeTextStyle: { color: 'white' },
        badgeContainerStyle: { marginTop: 5 }
      }}
      subtitle={`Items : total(${badgeValueOfStatusOfEachInstanceOfChosenTemplate[rowData.instanceId].total}), complete(${badgeValueOfStatusOfEachInstanceOfChosenTemplate[rowData.instanceId].completed})`}
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
    const addInstanceModalVisibleToggleFn = () => this.state.addNewInstanceModalVisible ? this.setState({
      addNewInstanceModalVisible: false,
      chosenTemplateForAdd: '',
      // tempInstanceName: ''
    }) : this.setState({
      addNewInstanceModalVisible: true
    });
    const addInstanceTemplateChosenCompletedFn = async tempInstanceName => {
      // this.setState({
      //   addNewInstanceModalVisible: false,
      //   tempInstanceName: '',
      //   chosenTemplateForAdd: ''
      // }),
      await addInstanceModalVisibleToggleFn();
      addInstance(lastId, {
        instanceId: lastId.instances + 1,
        items: [],
        name: tempInstanceName,
        template: this.state.chosenTemplateForAddTemplateId
      })
    };
    const templateChosenFn = (templateTitle, templateId) => this.setState({
      chosenTemplateForAdd: templateTitle,
      chosenTemplateForAddTemplateId: templateId
    });
    const pageMoveFn = () => {
      addInstanceModalVisibleToggleFn();
      // this.setState({ addNewInstanceModalVisible: false, tempInstanceName: '' });
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
    return(
      <View
        style={styles.bodyContainer}
        >
        {existOrNot_instancesOfChosenTemplate ? <View>
          <FormLabel>
            There is no instance of this template({chosenTemplate.title}), you need to add instance.
          </FormLabel>
          <Button
            icon={{ name: 'add' }}
            backgroundColor='#008D14'
            title='Add Instance'
            buttonStyle={{ borderRadius: 10, marginTop: 10 }}
            onPress={() => this.setState({ addNewInstanceModalVisible: true })}
          />
        </View> : <View>
          <View>
          {/* <View style={{ marginVertical: 10, height: 2 }} /> */}
          <SearchBar
            lightTheme
            round={true}
            placeholder='Search Instances'
            value={this.state.searchText}
            contaienrStyle={{ marginVertical: 10 }}
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
                  ▼ Instances of {route.title} : {dataSourceInstancesOfChosenTemplate._dataBlob.s1.length}(searched)
                </FormLabel>
              )
            : (
                <FormLabel>
                  ▼ Instances of {route.title} : {dataSourceInstancesOfChosenTemplate._dataBlob.s1.length}
                </FormLabel>
              )
          }
            <List>
              <ListView
                dataSource={dataSourceInstancesOfChosenTemplate}
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
        </View>}
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.addNewInstanceModalVisible}
          >
            <InstanceAddModal
              dataSourceTemplates={dataSourceTemplates}
              chosenTemplateForAdd={this.state.chosenTemplateForAdd}
              chosenTemplateForAddTemplateId={this.state.chosenTemplateForAddTemplateId}
              addInstanceModalVisibleToggleFn={addInstanceModalVisibleToggleFn.bind(this)}
              templateChosenFn={templateChosenFn.bind(this)}
              addInstanceTemplateChosenCompletedFn={addInstanceTemplateChosenCompletedFn.bind(this)}
              pageMoveFn={pageMoveFn.bind(this)}
              chosenTemplateTitle={chosenTemplate.title}
            />
        </Modal>
      </View>
    )
  }
}
