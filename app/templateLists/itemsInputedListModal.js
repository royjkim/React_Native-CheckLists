import React from 'react'
import {
  View,
  ListView,
} from 'react-native'
import {
  List,
  ListItem,
  Button,
} from 'react-native-elements'

export default class ItemsInputedListModal extends React.Component {
  render() {
    const { dataSourceItems, closeFn } = this.props
    const renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData}
      hideChevron
    />
    return(
      <View style={{ marginTop: 180, backgroundColor: 'white', borderColor: '#9E9E9E', borderWidth: 1, paddingVertical: 50 }}>
        <List>
          <ListView
            dataSource={dataSourceItems}
            enableEmptySections={true}
            renderRow={renderRow}
          />
        </List>
        {/* <Icon
          name='close'
          onPress={() => closeFn()}
          containerStyle={{ marginTop: 5 }}
        /> */}
        <Button
          // icon={{ name: 'close' }}
          title='Close'
          textStyle={{ fontWeight: '500' }}
          backgroundColor='#159588'
          color='#D2D8C9'
          onPress={() => closeFn()}
          buttonStyle={{ marginTop: 30 }}
        />
      </View>
    )
  }
}
