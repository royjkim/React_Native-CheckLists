import React from 'react'
import {
  View,
  Text,
  ListView,
  Picker,
  Modal,
  TouchableOpacity,
} from 'react-native'
import {
  List,
  ListItem,
  Button,
  FormLabel,
  CheckBox,
  SearchBar,
} from 'react-native-elements'
import styles from '../../../components/styles'

export default class ChosenInstanceDetailsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalPickerVisible: false
    }
  }
  render() {
    const { route, navigator, state, modifyItemsCustomized, chooseCategory } = this.props
    const { chosenInstance } = route.passProps
    const renderRow = (rowData, sectionId) => {
      return (
        <View>
          <CheckBox
            title={rowData.desc}
            checked={rowData.status}
            onPress={() => modifyItemsCustomized(rowData)}
          />
        </View>
      )
    }
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
        <View style={{ height: 10 }}/>
        <Button
          title='Item Sort'
          backgroundColor='#6296F9'
          onPress={() => this.setState({ modalPickerVisible: true })}
        />
        {state.dataSourceItemsCustomizedOfChosenInstance._cachedRowCount !== state.countsOfStatusCompleted.total ? <FormLabel>
          Sorted : {state.statusPicker}({state.dataSourceItemsCustomizedOfChosenInstance._cachedRowCount})
        </FormLabel> : null}
        <List>
          <ListView
            dataSource={state.dataSourceItemsCustomizedOfChosenInstance}
            renderRow={renderRow}
            enableEmptySections={true}
          />
        </List>
        <Modal
          animationType={'slide'}
          visible={this.state.modalPickerVisible}
          transparent={true}
          >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: 'transparent' }}
              onPress={() => this.setState({ modalPickerVisible: false })}>
            </TouchableOpacity>
            <View
              style={{ flex: 0, justifyContent: 'flex-end', marginBottom: 30 }}>
              <Picker
                selectedValue={state.statusPicker}
                onValueChange={category => chooseCategory(category)}>
                <Picker.Item
                  label='All'
                  value='all'
                />
                <Picker.Item
                  label='Completed'
                  value='completed'
                />
                <Picker.Item
                  label='Uncompleted'
                  value='uncompleted'
                />
              </Picker>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
