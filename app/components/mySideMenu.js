import React from 'react'
import {
  View,
  Text,
  // ListView,
} from 'react-native'

import {
  SideMenu,
  List,
  ListItem,
} from 'react-native-elements'

import MySideMenuRender from './mySideMenuRender'

let renderCount = 1;
export default class MySideMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sideMenuVisible: false,
      testCount: 0
    //   // ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    //   // dataSourceSideMenuData: ''
    }
    // this.sideMenuVisible = false
    // this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    // this.dataSourceSideMenuData = this.ds.cloneWithRows(this.props.route.passProps.customerListOfChosenTemplate)
    // this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }

  // componentWillMount() {
  //   console.log(`componentWillMount : ${Math.random()}`)
  //   // this.setState({
  //   //   dataSourceSideMenuData: this.state.ds.cloneWithRows(this.props.route.passProps.customerListOfChosenTemplate)
  //   // })
  //   this.dataSourceSideMenuData = this.state.ds.cloneWithRows(this.props.route.passProps.customerListOfChosenTemplate)
  // }

  // onPress={() => navigator.push({
  //   component: MySideMenu,
  //   passProps: {
  //     chosenTemplate: rowData,
  //     nextRightButtonPageComponent: ListDetailsComponent
  //   }})
  // }

  // toggleSideMenu() {
  //   // this.sideMenuVisible = !this.sideMenuVisible
  //   console.log(`toggleSideMenu called, ${Math.random()}`)
  //   // console.log(`toggleSideMenu - sideMenuVisible : ${this.sideMenuVisible.toString()}`)
  //   // this.forceUpdate(console.log(`forceUpdate : ${Math.random()}`))
  //
  //   this.setState({
  //     sideMenuVisible: !this.state.sideMenuVisible
  //   })
  //   console.log(`toggleSideMenu - sideMenuVisible : ${this.state.sideMenuVisible.toString()}`)
  //   // this.forceUpdate(alert('forceUpdate'))
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(`shouldComponentUpdate : ${Math.random()}`)
  //   // console.log(`nextProps : ${JSON.stringify(nextProps, null, 3)}`)
  //   // for(let key in nextProps) {
  //   //   console.log(`nextProps - key : ${key}, value : ${nextProps.key}`)
  //   // }
  //   console.log(`nextProps.route : ${JSON.stringify(nextProps.route, null, 3)}`)
  //   console.log(`nextState : ${JSON.stringify(nextState, null, 3)}`)
  //   if(this.props.route == nextProps.route && this.state.sideMenuVisible == nextState.sideMenuVisible) {
  //     console.log(`same`)
  //     return false
  //   } else {
  //     console.log(`nextProps.route : ${JSON.stringify(nextProps.route, null, 3)}`)
  //     console.log(`nextState : ${JSON.stringify(nextState, null, 3)}`)
  //     return true
  //   }
  //   // return true
  // //   nextProps.route : {
  // //  "title": "MySideMenu",
  // //  "passProps": {
  // //     "customerListOfChosenTemplate": [
  // //        {
  // //           "CustomerName": "Jack1",
  // //           "templateTitle": "GoingFishing1"
  // //        },
  // //        {
  // //           "CustomerName": "Jack2",
  // //           "templateTitle": "GoingFishing1"
  // //        },
  // //        {
  // //           "CustomerName": "Jack3",
  // //           "templateTitle": "GoingFishing1"
  // //        }
  // //     ],
  // //     "nextRightButtonPageTitle": "ListDetailsComponent"
  // //      }
  // //   }
  // }

  render() {
    const { route, navigator, sideMenuData } = this.props
    // const toggleSideMenu = () => this.setState({
    //   sideMenuVisible: !this.state.sideMenuVisible
    // })
    const toggleSideMenu = () => {
      console.log(`toggleSideMenu called, ${Math.random()}`)
      console.log(`toggleSideMenu - sideMenuVisible : ${this.state.sideMenuVisible.toString()}`)
      // this.forceUpdate(console.log(`forceUpdate : ${Math.random()}`))

      this.setState({
        sideMenuVisible: !this.state.sideMenuVisible,
        testCount: this.state.testCount + 1
      })
    }
    // const dataToPropsConvertAsListView = () => {
    //   Reactotron.log(`converting as cloneWithRows`)
    //   return this.state.ds.cloneWithRows(route.passProps.customerListOfChosenTemplate)
    // }
    // console.log(`this.state.dataSourceSideMenuData : ${JSON.stringify(this.state.dataSourceSideMenuData, null, 3)}`)
    // console.log(`this.dataSourceSideMenuData : ${JSON.stringify(this.dataSourceSideMenuData, null, 3)}`)
    console.log(`mySideMenu - renderCount : ${renderCount}`)
    renderCount++;
    return(
      <SideMenu
        isOpen={this.state.sideMenuVisible}
        // isOpen={this.sideMenuVisible}
        // onChange={isOpen => {
        //   console.log(`sideMenu - onChange - isOpen : ${isOpen.toString()}`)
        //   console.log(`sideMenu - onChange ${Math.random()}`)
        //
        //   // toggleSideMenu()
        // }}
        // onChange={isOpen => toggleSideMenu()}
        onChange={sideMenuVisible => this.setState({ sideMenuVisible })}
        // onChange={() => toggleSideMenu.bind(this)}
        // onChange={toggleSideMenu}
        // menu={(
        //   <View style={{
        //     flex: 1,
        //     backgroundColor: '#ededed',
        //     paddingTop: 50,
        //     // position: 'absolute',
        //     // bottom: 0
        //   }}>
        //     {/* <Text style={{ color: 'red' }}>
        //       {JSON.stringify(route.passProps.customerListOfChosenTemplate, null, 3)}
        //     </Text> */}
        //     <List>
        //       {route.passProps.customerListOfChosenTemplate.map((value, index) => <ListItem
        //         key={index}
        //         title={value.CustomerName}
        //         subtitle={value.templateTitle}
        //         onPress={() => navigator.push({
        //           component: route.passProps.nextRightButtonPageComponent,
        //           title: route.passProps.nextRightButtonPageTitle,
        //           passProps: {
        //             targetCustomerData: value
        //           }
        //         })}
        //       />)}
        //     </List>
        //     <Text>
        //       testCount : {this.state.testCount}
        //       {'\n'}
        //       sideMenuVisible : {this.state.sideMenuVisible.toString()}
        //     </Text>
        //   </View>
        // )}
        menu={<MySideMenuRender sideMenuData={route.passProps.customerListOfChosenTemplate} route={route} navigator={navigator} />}
        // // // menu={<MySideMenuRender sideMenuData={this.state.ds.cloneWithRows(route.passProps.customerListOfChosenTemplate)} route={route} navigator={navigator} />}
        // menu={<MySideMenuRender sideMenuData={this.state.dataSourceSideMenuData} route={route} navigator={navigator} />}
        // menu={<MySideMenuRender sideMenuData={this.dataSourceSideMenuData} route={route} navigator={navigator} />}

        >
          <route.passProps.nextRightButtonPageComponent
            route={{
              ...route,
              passProps: {
                ...route.passProps,
                fuck: 'shit',
                toggleSideMenu: toggleSideMenu.bind(this)
              }
            }}
            navigator={navigator}
            toggleSideMenu={toggleSideMenu.bind(this)}
            sideMenuVisible={this.state.sideMenuVisible}
          />
        {/* <route.passProps.nextRightButtonPageComponent route={route} navigator={navigator} toggleSideMenu={toggleSideMenu.bind(this)} sideMenuVisible={this.state.sideMenuVisible} /> */}
        {/* <route.passProps.nextRightButtonPageComponent route={route} navigator={navigator} toggleSideMenu={this.toggleSideMenu.bind(this)} sideMenuVisible={this.sideMenuVisible} /> */}
      </SideMenu>
    )
  }
}
