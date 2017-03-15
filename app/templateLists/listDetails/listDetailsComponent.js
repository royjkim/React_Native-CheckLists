import React from 'react'
import {
  View,
  Text,
  ListView,
} from 'react-native'
import styles from '../../components/styles'
import {
  Button,
  List,
  ListItem,
} from 'react-native-elements'

import CustomerPrivateData from './customerPrivateData'

import Reactotron from 'reactotron-react-native'

export default class ListDetailsComponent extends React.Component {

  render() {
    const { route, navigator, dataState } = this.props
    renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.customerName}
      subtitle={rowData.templateTitle}
      // onPress={() => navigator.push({
      //   passProps: {
      //     firstPageTitleMakeBackDisabled: '',
      //     nextRightButtonPageTitle: 'menu',
      //     nextRightButtonPageComponent: '',
      //     chosenCustomerPrivateData: rowData
      //   },
      //   title: `${rowData.CustomerName}\'s Data`,
      //   component: CustomerPrivateData
      // })}
    />
    return(
      <View style={styles.bodyContainerOnSideMenu}>
        <List>
          <ListView
            dataSource={dataState.dataSourceCustomerList}
            renderRow={renderRow}
            enableEmptySections={true}
          />
        </List>
        {/* <Button
          title='Toggle Side Menu'
          onPress={() => toggleSideMenu()}
        />
        <Text>
          sideMenuVisible : {String(this.props.sideMenuVisible)}
          {'\n'}
          dataSourceCustomerListOfChosenTemplate : ${JSON.stringify(this.dataSourceCustomerListOfChosenTemplate, null, 3)}
          {'\n'}
          route : {JSON.stringify(route, null, 3)}
        </Text> */}
      </View>
    )
  }
}
