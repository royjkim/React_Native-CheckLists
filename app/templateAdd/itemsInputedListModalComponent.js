import React from 'react'
import {
  View,
  ListView,
  TouchableOpacity,
} from 'react-native'
import {
  List,
  ListItem,
  Button,
  Icon,
} from 'react-native-elements'

export default class ItemsInputedListModalComponent extends React.Component {
  render() {
    const { dataSourceItems, closeFn } = this.props
    const renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData}
      underlayColor='#C0C0C0'
      hideChevron
    />
    return(
      <View
        style={{
          flex: 1,
          // marginTop: 180,
          backgroundColor: 'transparent',
          // borderColor: '#9E9E9E',
          // borderWidth: 1,
          // paddingVertical: 50
      }}>
      <TouchableOpacity
        style={{
          flex: 1,
          // backgroundColor: 'green'
        }}
        onPress={() => closeFn()}
        >

      </TouchableOpacity>

      <View
        style={{
          flex: 0,
          // marginTop: 180,
          backgroundColor: 'white',
          borderColor: '#9E9E9E',
          borderWidth: 1,
          paddingVertical: 50
        }}>
        {/* <Icon
          name='close'
          onPress={() => closeFn()}
          containerStyle={{ marginTop: 5 }}
        /> */}
        <List>
          <ListView
            dataSource={dataSourceItems}
            enableEmptySections={true}
            renderRow={renderRow}
            removeClippedSubviews={false}
          />
        </List>

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
      </View>
    )
  }
}
