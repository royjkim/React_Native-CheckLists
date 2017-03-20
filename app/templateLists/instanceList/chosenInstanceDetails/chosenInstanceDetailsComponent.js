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
  Checkbox,
} from 'react-native-elements'
import styles from '../../../components/styles'

export default class ChosenInstanceDetailsComponent extends React.Component {
  render() {
    const { route, navigator, state } = this.props
    console.log(`ChosenInstanceDetailsComponent - route : ${JSON.stringify(route, null, 1)}`)
    const renderRow = (rowData, sectionId) => {
      return (
        <View>
          <View style={{ backgroundColor: 'lightgray', height: 1 }} />
          {/* <Checkbox
            title={rowData.desc}
            checked={rowData.status}
            onIconPress={() => alert('test')}
          /> */}
          <Text>
            {rowData.desc}
          </Text>
          <View style={{ flexDirection: 'row' }}>
          </View>
          <View style={{ backgroundColor: 'lightgray', height: 1 }} />
        </View>
      )
    }
    const renderRowNormal = (rowData, sectionId) => {
      console.log(`renderRow - rowData : ${JSON.stringify(rowData, null, 1)}`)
      return <ListItem
        title={rowData.desc}
        subtitle={`orderNum : ${rowData.orderNum.toString()} / item_id : ${rowData.id}`}
        // { id: 4, desc: 'Close Door', template: 'BeforeGoOutHome', orderNum: 10 }
      />
    }
    return(
      <View style={styles.bodyContainer}>
        <FormLabel>
          Items
        </FormLabel>
        <List>
          <ListView
            dataSource={state.dataSourceItemsOfChosenInstance}
            renderRow={renderRow}
            enableEmptySections={true}
          />
        </List>
        <List>
          <ListView
            dataSource={state.dataSourceItemsOfChosenInstance}
            renderRow={renderRowNormal}
            enableEmptySections={true}
          />
        </List>
      </View>
    )
  }
}
