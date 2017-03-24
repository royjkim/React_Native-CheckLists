import React from 'react'
import {
  View,
  Text,
  ListView,
} from 'react-native'
import styles from '../components/styles'

import {
  Button,
  List,
  ListItem,
  FormLabel,
} from 'react-native-elements'

// import TemplateAdd from '../templateLists/templateAdd'
import ChosenInstanceDetailsContainer from '../templateLists/instanceList/chosenInstanceDetails/chosenInstanceDetailsContainer'

import Reactotron from 'reactotron-react-native'

export default class HomeComponent extends React.Component {

  render() {
    const { route, navigator, state } = this.props
    const renderRow = (rowData, sectionId) => {
      // console.log('rowData : ', rowData)
      // console.log('sectionId : ', sectionId)
      // console.log('rowId : ', rowId)
      return <ListItem
        key={sectionId}
        title={rowData.name}
        subtitle={`Template : ${state.templates[rowData.template].title}\nItems : total(${state.badgeValueOfStatusOfAllInstances[rowData.instanceId].total}), complete(${state.badgeValueOfStatusOfAllInstances[rowData.instanceId].completed})`}
        badge={{
          value: state.badgeValueOfStatusOfAllInstances[rowData.instanceId].uncompleted,
          // value: `${state.badgeValueOfStatusOfAllInstances[rowData.instanceId].completed} / ${state.badgeValueOfStatusOfAllInstances[rowData.instanceId].uncompleted}`,
          badgeTextStyle: { color: 'white' },
          badgeContainerStyle: { marginTop: 15 }
        }}
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
              chosenInstance: rowData
            },
            title: `${rowData.name}`,
            component: ChosenInstanceDetailsContainer,
          }
        )}
      />
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
          />
        </List>
        <View style={{ height: 5 }} />
        {/* <Button
          icon={{ name: 'note-add' }}
          title='Add Template'
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
        /> */}
      </View>
    )
  }
}
