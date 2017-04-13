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
import styles from '../components/styles'
import {
  Button,
  List,
  ListItem,
  FormLabel,
  SearchBar,
  Icon,
} from 'react-native-elements'
import { isEqual, cloneDeep } from 'lodash'

import TemplateDetailsModifyContainer from './templateDetailsModifyContainer';
import ChosenInstanceDetailsContainer from './instanceList/chosenInstanceDetails/chosenInstanceDetailsContainer';
import InstanceListContainer from './instanceList/instanceListContainer';

export default class TemplateDetailsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: ''
    };
  }

  componentWillMount() {
    this.props.existOrNot_chosenTemplate || this.becauseOfExistNotAlertMsgFn();
  }

  componentWillUpdate(nextProps) {
    // Below could be cause ignoring 'navigate prevent data' which is to be canceled.
    nextProps.existOrNot_chosenTemplate || this.becauseOfExistNotAlertMsgFn();
  }

  becauseOfExistNotAlertMsgFn() {
    const tempFn_becauseOfExistNotAlertMsgFn = this.becauseOfExistNotAlertMsgFn;
    this.becauseOfExistNotAlertMsgFn = () => null;
    Alert.alert(
      'Template Deleted',
      'Because of Current Template Deleted. Page would be directed to back.',
      [
        { text: 'Confirm', onPress: () => {
          this.becauseOfExistNotAlertMsgFn = tempFn_becauseOfExistNotAlertMsgFn;
          this.props.navigator.pop();
          }
        }
      ]
    )

  }
  render() {
    const { route,
            navigator,
            searchBarText,
            length_instancesOfChosenTemplate,
            itemsOfChosenTemplate,
            chosenTemplate,
            dataSourceOfItemsOfChosenTemplate,
            itemsLengthOfChosenTemplate
          } = this.props;
    const renderRowItems = rowData => <ListItem
      key={rowData.itemId}
      title={rowData.desc}
      underlayColor='#C0C0C0'
      subtitle={`itemId : ${rowData.itemId}, orderNum : ${rowData.orderNum}`}
      hideChevron
    />;
    return(
      <View style={styles.bodyContainerOnSideMenu}>
        <SearchBar
          lightTheme
          round={true}
          onChangeText={searchText => {
            this.setState({
              searchText
            });
            searchBarText(searchText, 'itemsOfChosenTemplate');
          }}
          placeholder='Search Items'
          value={this.state.searchText}
        />
        <FormLabel>
          Template Name : {chosenTemplate.title}
        </FormLabel>
        {this.state.searchText !== ''
          ? (
              <FormLabel>
                Category : {chosenTemplate.category} / Items({itemsLengthOfChosenTemplate}, searched)
              </FormLabel>
            )
          : (
              <FormLabel>
                Category : {chosenTemplate.category} / Items({itemsLengthOfChosenTemplate})
              </FormLabel>
            )
        }
        <List>
          <ListView
            dataSource={dataSourceOfItemsOfChosenTemplate}
            enableEmptySections={true}
            renderRow={renderRowItems}
            removeClippedSubviews={false}
            style={{ maxHeight: 250 }}
          />
        </List>
        <View style={{ height: 10 }} />
        <Button
          title={`Show instances of this template(${length_instancesOfChosenTemplate})`}
          backgroundColor='#3D7CAA'
          // backgroundColor='#6296F9'
          buttonStyle={{ borderRadius: 10 }}
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
                chosenTemplate
              },
              // title: `Instance List of ${route.title}`,
              title: 'Instance List',
              component: InstanceListContainer,
            }
          )}
        />
        <View style={{ height: 10 }} />
        <Button
          icon={{ name: 'edit' }}
          title='Edit Template'
          backgroundColor='#159588'
          buttonStyle={{ borderRadius: 10 }}
          onPress={() => Alert.alert(
            'Warning',
            'Because items of instance have items at the moment of creating instance from template, changing the items of template doesn\'t applied on each instance. Alternatively, you can modify items of instance in instance edit page. But, when you delete a template is proceed along with connected instances.',
            [
              { text: 'OK', onPress: () => navigator.push(
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
                    chosenTemplate
                  },
                  title: 'Template Edit',
                  component: TemplateDetailsModifyContainer,
                }
              )}
            ]
          )}
        />
      </View>
    )
  }
}
