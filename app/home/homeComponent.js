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

import TemplateAdd from '../templateLists/templateAdd'

import Reactotron from 'reactotron-react-native'

export default class HomeComponent extends React.Component {

  render() {
    const { route, navigator, state } = this.props
    const renderRow = (rowData, sectionId, rowId) => {
      // console.log('rowData : ', rowData)
      // console.log('sectionId : ', sectionId)
      // console.log('rowId : ', rowId)
      return <ListItem
        key={rowId}
        title={rowData.desc}
        subtitle={`instanceId : ${rowData.instanceId}`}
      />
    }
    const renderSectionHeader = (sectionData, sectionId) => {
      // console.log('sectionData : ', sectionData)
      // console.log('sectionId : ', sectionId)
      // console.log('state.templates[state.instances[sectionId].instanceId] : ', state.templates[state.instances[sectionId].instanceId])
      const temp = {
        ...state.templates[state.instances[sectionId].instanceId]
      }
      // console.log('state.templates[state.instances[sectionId].instanceId].title : ', state.templates[state.instances[sectionId].instanceId].title)
      return <View style={{ backgroundColor: 'lightgray', padding: 8 }}>
        <Text
          key={sectionId}
          style={{ fontWeight: '500', color: '#161616' }}
          // containerStyle={{ backgroundColor: 'lightgray' }}
          >
            {/* {state.instances[sectionId].name}, template: {state.templates[state.instances[sectionId].instanceId].title.toString()}, items : {state.instances[sectionId].items.length} */}
            {state.instances[sectionId].name}, template: {temp.title}, items : {state.instances[sectionId].items.length}
          </Text>
      </View>
    }
    return(
      <View style={styles.bodyContainer}>
        <FormLabel>
          {/* Check List Template : {state.templatesLength} */}
          Instances : {Object.values(state.instances).length}
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
