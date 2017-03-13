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

export default class MySideMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sideMenuVisible: false,
    }
  }


  render() {
    const { route, navigator, sideMenuData } = this.props
    // const toggleSideMenu = () => this.setState({
    //   sideMenuVisible: !this.state.sideMenuVisible
    // })
    const toggleSideMenu = () => {
      this.setState({
        sideMenuVisible: !this.state.sideMenuVisible,
      })
    }
    return(
      <SideMenu
        isOpen={this.state.sideMenuVisible}
        onChange={sideMenuVisible => this.setState({ sideMenuVisible })}
        menu={<MySideMenuRender sideMenuData={route.passProps.customerListOfChosenTemplate} route={route} navigator={navigator} />}
        >
          <route.passProps.nextRightButtonPageComponent
            route={{
              ...route,
              passProps: {
                ...route.passProps,
                firstPageTitleMakeBackDisabled: '',
                nextRightButtonPageTitle: '',
                nextRightButtonPageComponent: '',

                // below doesn't work
                // probably toggle Visbile value should be global variable of state.
                // toggleSideMenu: toggleSideMenu.bind(this)
              },
            }}
            navigator={navigator}
            toggleSideMenu={toggleSideMenu.bind(this)}
            sideMenuVisible={this.state.sideMenuVisible}
          />
      </SideMenu>
    )
  }
}
