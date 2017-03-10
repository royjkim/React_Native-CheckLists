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

let renderCountMySide = 1
export default class MySideMenuRender extends React.Component {
  constructor(props) {
    super(props)
    // this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    // this.state = {
    // //   ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    //   dataSourceSideMenuData: this.ds.cloneWithRows(this.props.sideMenuData || [])
    // }

    // this.dataSourceSideMenuData = this.ds.cloneWithRows([])
  }

  // componentWillMount() {
  //   this.setState({
  //     dataSourceSideMenuData: this.state.ds.cloneWithRows(this.props.sideMenuData || [])
  //   })
  // }


  // componentWillReceiveProps(nextProps) {
  //   // console.log(`componentWillReceiveProps - nextProps : ${JSON.stringify(nextProps, null, 3)}`)
  //   // console.log(`componentWillReceiveProps - nextProps : ${String(nextProps)}`)
  //   // console.log(`componentWillReceiveProps - loading count test - ${testCount}`)
  //   console.log(`componentWillReceiveProps - loading count test - ${testCount}`)
  //   this.setState({
  //       dataSourceSideMenuData: this.state.ds.cloneWithRows(this.props.sideMenuData)
  //   })
  // }

  // componentDidUpdate(nextProps, nextState) {
  //   console.log(`componentWillUpdate - loading count test - ${testCount}`)
  //     this.setState({
  //         dataSourceSideMenuData: this.state.ds.cloneWithRows(this.props.sideMenuData)
  //     })
  // }

  // componentWillUpdate() {
  //   console.log(`componentWillUpdate - ${Math.random()}`)
  //   this.dataSourceSideMenuData = this.ds.cloneWithRows(this.props.sideMenuData || [])
  // }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(`MySideMenuRender - shouldComponentUpdate ${Math.random()}`)
    console.log(`MySideMenuRender - nextProps.route : ${JSON.stringify(nextProps.route, null, 3)}`)
    return true
  }

  render() {
    const { route, navigator, sideMenuData } = this.props
    // console.log(`MySideMenuRender - route : ${JSON.stringify(route, null, 3)}`)
    console.log(`sideMenuData - ${JSON.stringify(sideMenuData, null, 3)}`)
    console.log(`MySideMenuRender - renderCountMySide : ${renderCountMySide}`)
    renderCountMySide++;
    // const renderRow = (rowData, sectionID) => <ListItem
    //   key={sectionID}
    //   title={rowData.CustomerName}
    //   subtitle={rowData.templateTitle}
    //   onPress={() => navigator.push({
    //     component: route.passProps.nextRightButtonPageComponent,
    //     title: route.passProps.nextRightButtonPageTitle,
    //     passProps: {
    //       targetCustomerData: rowData
    //     }
    //   })}
    // />
    console.log(`MySideMenuRender - render Count test ${Math.random()}`)
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
            component: route.passProps.nextRightButtonPageComponent,
            title: route.passProps.nextRightButtonPageTitle,
            passProps: {
              targetCustomerData: value
            }
          })}
        />)}
      </View>
    )
  }
}
