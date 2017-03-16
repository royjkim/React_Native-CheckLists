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

import ChosenInstanceDetailsComponent from './chosenInstanceDetails/chosenInstanceDetailsComponent'

import Reactotron from 'reactotron-react-native'

export default class InstanceListComponent extends React.Component {

  render() {
    const { route, navigator, dataState } = this.props
    renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.name}
      subtitle={rowData.template}
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
            dataSource={dataState.dataSourceInstanceList}
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
          dataSourceInstanceListOfChosenTemplate : ${JSON.stringify(this.dataSourceInstanceListOfChosenTemplate, null, 3)}
          {'\n'}
          route : {JSON.stringify(route, null, 3)}
        </Text> */}
      </View>
    )
  }
}
