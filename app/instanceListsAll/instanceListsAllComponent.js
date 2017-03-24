import React from 'react'
import {
  View,
  Text,
  ListView,
  TouchableOpacity,
} from 'react-native'
import styles from '../components/styles'

import {
  Button,
  List,
  ListItem,
  FormLabel,
  CheckBox,
  Icon,
} from 'react-native-elements'

import ChosenInstanceDetailsContainer from '../templateLists/instanceList/chosenInstanceDetails/chosenInstanceDetailsContainer'

export default class InstanceListsAllComponent extends React.Component {

  render() {
    const { route, navigator, state, modifyItemsCustomized } = this.props
    const renderRow = (rowData, sectionId, rowId) => <ListItem
      key={rowId}
      // title={rowData.desc}
      title={<CheckBox
        title={rowData.desc}
        checked={rowData.status}
        onPress={() => modifyItemsCustomized(rowData)}
        />
      }
      // subtitle={`instanceId : ${rowData.instanceId}`}
      hideChevron
    />
    const renderSectionHeader = (sectionData, sectionId) => {
      const temp = {
        ...state.templates[state.instances[sectionId].template]
      }
      return <TouchableOpacity
        onPress={() => {
          console.log('clicked')
          console.log('state.instances[sectionId] : ', state.instances[sectionId])
          return navigator.push(
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
                chosenInstance: state.instances[sectionId]
              },
              // title: `Customer List of ${rowData.title}`,
              title: `${state.instances[sectionId].name}`,
              component: ChosenInstanceDetailsContainer,
            }
          )
        }}
        >
        <View style={{ flexDirection: 'row', backgroundColor: 'lightgray', padding: 8 }}>
          <Text
            key={sectionId}
            style={{ fontWeight: '500', color: '#161616' }}
            >
            {state.instances[sectionId].name}, template: {temp.title}, items : {state.instances[sectionId].items.length} ({state.badgeValueOfStatusOfAllInstances[sectionId].completed} / {state.badgeValueOfStatusOfAllInstances[sectionId].uncompleted})
          </Text>
          <View style={{ flex: 1 }}>
            <Icon
              name='chevron-right'
              size={20}
              containerStyle={{ alignSelf: 'flex-end' }}
            />
          </View>

        </View>
      </TouchableOpacity>
    }
    return(
      <View style={styles.bodyContainer}>
        <FormLabel>
          Total Instances : {Object.values(state.instances).length}
        </FormLabel>
        <List>
          <ListView
            dataSource={state.dataSourceForAllInstances}
            renderRow={renderRow}
            enableEmptySections={true}
            renderSectionHeader={renderSectionHeader}
          />
        </List>
        <View style={{ height: 5 }} />
        <Button
          icon={{ name: 'note-add' }}
          title='Add Template'
          // onPress={() => alert(`needed props to move Tab.add`)}
          onPress={() => {
            navigator.push({
              passProps: {
                leftButton: {
                  title: 'Back',
                  component: '',
                },
                rightButton: {
                  title: '',
                  component: '',
                },
              },
              title: 'Template Add',
              component: TemplateAdd,
            })
          }}
        />
      </View>
    )
  }
}
