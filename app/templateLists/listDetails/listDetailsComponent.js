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

  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.dataSourceCustomerListOfChosenTemplate = this.ds.cloneWithRows([])
    Reactotron.log(`dataSourceCustomerListOfChosenTemplate =${JSON.stringify(this.dataSourceCustomerListOfChosenTemplate, null, 3)}`)
  }

  componentWillMount() {
    this.dataSourceCustomerListOfChosenTemplate = this.ds.cloneWithRows(this.props.route.passProps.customerListOfChosenTemplate)
  }

  render() {
    const { route, navigator, toggleSideMenu } = this.props
    renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.CustomerName}
      subtitle={rowData.templateTitle}
      onPress={() => navigator.push({
        passProps: {
          firstPageTitleMakeBackDisabled: '',
          nextRightButtonPageTitle: 'menu',
          nextRightButtonPageComponent: '',
          chosenCustomerPrivateData: rowData
        },
        title: `${rowData.CustomerName}\'s Data`,
        component: CustomerPrivateData
      })}
    />
    return(
      // <View style={{ backgroundColor: 'transparent', marginTop: 300 }}>
      //   <Text>
      //     sideMenuVisible : {this.props.sideMenuVisible.toString()}
      //   </Text>
      //   <Button
      //     title='Toggle Side Menu'
      //     onPress={() => toggleSideMenu()}
      //   />
      // </View>
      <View style={styles.bodyContainerOnSideMenu}>
        <List>
          <ListView
            dataSource={this.dataSourceCustomerListOfChosenTemplate}
            renderRow={renderRow}
            enableEmptySections={true}
          />
        </List>
        <Button
          title='Toggle Side Menu'
          onPress={() => toggleSideMenu()}
        />
        <Text>
          sideMenuVisible : {String(this.props.sideMenuVisible)}
          {'\n'}
          {/* dataSourceCustomerListOfChosenTemplate : ${JSON.stringify(this.dataSourceCustomerListOfChosenTemplate, null, 3)}
          {'\n'} */}
          route : {JSON.stringify(route, null, 3)}
        </Text>
      </View>
    )
  }
}
