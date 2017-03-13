import React from 'react'
import {
  View,
  ListView,
  Text,
} from 'react-native'
import {
  List,
  ListItem,
} from 'react-native-elements'

import CustomerPrivateData from '../templateLists/listDetails/customerPrivateData'

export default class MySideMenuRender extends React.Component {
  render() {
    const { route, navigator, sideMenuData } = this.props
    return(
      <View style={{ flex: 1, backgroundColor: '#ededed', marginTop: 64 }}>
        {/* <ListView
          // dataSource={this.state.dataSourceSideMenuData}
          dataSource={this.dataSourceSideMenuData}
          // dataSource={sideMenuData}
          renderRow={renderRow}
          enableEmptySections={true}
        /> */}
        {sideMenuData.map((value, index) => <ListItem
          key={index}
          title={value.CustomerName}
          subtitle={value.templateTitle}
          onPress={() => navigator.push({
            passProps: {
              firstPageTitleMakeBackDisabled: '',
              nextRightButtonPageTitle: 'menu',
              nextRightButtonPageComponent: '',
              chosenCustomerPrivateData: value
            },
            title: `${value.CustomerName}\'s Data`,
            component: CustomerPrivateData,
          })}
        />)}
      </View>
    )
  }
}
