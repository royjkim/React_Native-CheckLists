import React from 'react'
import {
  View,
  Text,
  ListView,
} from 'react-native'
import {
  List,
  ListItem,
  Button,
  FormLabel,
  CheckBox,
} from 'react-native-elements'
import styles from '../../../components/styles'

export default class ChosenInstanceDetailsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      testCheckbox: false
    }
  }
  render() {
    const { route, navigator, state, modifyItemsCustomized } = this.props
    const { chosenInstance } = route.passProps
    // console.log('ChosenInstanceDetailsComponent - state : ', state)
    const renderRow = (rowData, sectionId) => {
      return (
        <View>
          {/* <View style={{ backgroundColor: 'lightgray', height: 1 }} /> */}
          <CheckBox
            title={rowData.desc}
            checked={rowData.status}
            onPress={() => modifyItemsCustomized(rowData)}
          />
          {/* <View style={{ flexDirection: 'row' }}>
          </View> */}
          {/* <View style={{ backgroundColor: 'lightgray', height: 1 }} /> */}
        </View>
      )
    }
    // const renderRowNormal = (rowData, sectionId) => {
    //   return <ListItem
    //     title={rowData.desc}
    //     subtitle={`orderNum : ${rowData.orderNum.toString()} / item_id : ${rowData.itemCustomizedId} / status : ${rowData.status.toString()}`}
    //     // { id: 4, desc: 'Close Door', template: 'BeforeGoOutHome', orderNum: 10 }
    //   />
    // }
    return(
      <View style={styles.bodyContainer}>
        <FormLabel>
          Name : {chosenInstance.name}
        </FormLabel>
        <FormLabel>
          Template : {state.chosenTemplate.title}
        </FormLabel>
        <FormLabel>
          Items : total({state.countsOfStatusCompleted.total}), complete({state.countsOfStatusCompleted.completed}), uncomplete({state.countsOfStatusCompleted.uncompleted})
        </FormLabel>
        <List>
          <ListView
            dataSource={state.dataSourceItemsCustomizedOfChosenInstance}
            renderRow={renderRow}
            enableEmptySections={true}
          />
        </List>
        {/* <List>
          <ListView
            dataSource={state.dataSourceItemsCustomizedOfChosenInstance}
            renderRow={renderRowNormal}
            enableEmptySections={true}
          />
        </List> */}
        <View style={{ height: 5 }}/>
        {/* <Button
          title='Save'
          onPress={() => alert('save')}
        /> */}
        <View style={{ height: 5 }}/>
        <Button
          title='Undo'
          onPress={() => alert('undo')}
        />
      </View>
    )
  }
}
