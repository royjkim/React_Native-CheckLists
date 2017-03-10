import React from 'react'
import {
  View,
  Text,
} from 'react-native'
import styles from './styles'

import {
  SideMenu,
  List,
  ListItem,
  Button,
} from 'react-native-elements'

import Reactotron from 'reactotron-react-native'
import Home from '../components/home'
import CustomNavigator from './customNavigator'

export default class MySideMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sideMenuVisible: false,
      dataList: [
        { name: 'Jane1', subtitle: 'Sam Subtitle', url : 'https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_640.png' },
        { name: 'Sam1', subtitle: 'Sam Subtitle', url : 'https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819_640.png' },
        { name: 'Jane2', subtitle: 'Sam Subtitle', url : 'https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_640.png' },
        { name: 'Sam2', subtitle: 'Sam Subtitle', url : 'https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819_640.png' },
      ]
    }
  }
  render() {
    const MenuComponent = (
      <View
        style={{ flex: 1, backgroundColor: '#ededed', marginTop: 20, paddingTop: 50 }}
        >
        <List
          containerStyle={{ marginBottom: 20 }}
          >
          {this.state.dataList.map((value, index) => (
            <ListItem
              key={index}
              roundAvatar
              avatar={value.url}
              title={value.name}
              subtitle={value.subtitle}
              onPress={() => Reactotron.log(`Pressed, name : ${value['name']}`)}
            />
          ))}
        </List>
        <Text>
          this.state.sideMenuVisible : {this.state.sideMenuVisible.toString()}
        </Text>
      </View>
    )
    const toggleSideMenu = () => this.setState({ sideMenuVisible: !this.state.sideMenuVisible })
    return(
      // <View style={styles.bodyContainer}>
        <SideMenu
          isOpen={this.state.sideMenuVisible}
          // isOpen={false}
          menu={MenuComponent}
          // onChange={isOpen => alert(`${isOpen.toString()}`)}
          onChange={sideMenuVisible => this.setState({ sideMenuVisible })}
          // Reactotron.log(`isOpen : ${isOpen.toString()}`)
        >
          {/* <Home toggleSideMenu={toggleSideMenu.bind(this)} visibleValue={this.state.sideMenuVisible} /> */}
          <CustomNavigator toggleSideMenu={toggleSideMenu.bind(this)} />
        </SideMenu>

        // {/* <Button
        //   title='Show or Not'
        //   onPress={() => this.setState({ sideMenuVisible: !this.state.sideMenuVisible })}
        // /> */}
      // </View>
    )
  }
}
