import React from 'react'
import {
  Navigator
} from 'react-native'

import {
  Button,
  Icon,
} from 'react-native-elements'

import styles from './styles'
import Reactotron from 'reactotron-react-native'

// <NavBar
//   routeStack={navigationState.routeStack}
//   navigationActions={navigationActions}
// />

// routeStack = [
//   {
//     passProps: {
//       leftButton: '',
//       rightButton: ''
//     },
//   title: ,
//   component: ,
//   sideMenuVisible: false
//   }
// ]

export default class NavBar extends React.Component {
  render() {
    // console.log(`NavBar - this.props : ${JSON.stringify(this.props, null, 2)}`)
    const { navigationState, navigationActions } = this.props
    const { routeStack, lastRoute } = navigationState
    console.log(`NavBar - routeStack : ${JSON.stringify(routeStack, null, 2)}`)
    console.log(`lastRoute : ${JSON.stringify(lastRoute, null, 2)}`)
    console.log(`lastRoute.component exists or not : ${lastRoute.component !== ''}`)
    // const { initialRoute } = this.props
    const renderScene = (route, navigator) => {
      console.log(`NavBar - renderScene - route : ${JSON.stringify(route, null, 2)}`)
      return <route.component route={route} navigator={navigator} routeStack={routeStack} navigationActions={navigationActions} />
    }
    const LeftButton = (route, navigator, index, navState) => (route.title !== lastRoute.passProps.leftButton.title ? <Icon
      name='chevron-left'
      size={30}
      containerStyle={{ marginTop: 7, marginLeft: 8 }}
      onPress={() => navigator.pop()}
      />
    : null )
    const RightButton = (route, navigator, index, navState) => {
      // Reactotron.log(`navbar - RightButton - route : ${JSON.stringify(route, null, 3)}`)

      const rightButtonMap = {
        menu: (
          <Icon
            name='menu'
            onPress={() => {
              alert('open side menu')
            }}
          />
        ),
        '': (
          <Button
            title='None'
            color='#9E9E9E'
            backgroundColor='white'
            onPress={() => alert('None')}
          />
        ),
        undefined: (
          <Button
            title='Undefined'
            color='#9E9E9E'
            backgroundColor='white'
            onPress={() => alert('undefined')}
          />
        ),
        Add: (
          <Button
            title={lastRoute.passProps.rightButton.title}
            backgroundColor='white'
            color='black'
            onPress={() => navigationActions.pushRoute(
              {
                passProps: {
                  leftButton: {
                    title: 'back',
                    component: ''
                  },
                  rightButton: {
                    title: '',
                    component: ''
                  }
                },
                title: lastRoute.passProps.rightButton.title,
                component: lastRoute.passProps.rightButton.component,
                sideMenuVisible: false
              }
            )}
            // onPress={() => navigator.push({
            //   passProps: {
            //     firstPageTitleMakeBackDisabled: '',
            //     nextRightButtonPageTitle: '',
            //     nextRightButtonPageComponent: ''
            //   },
            //   title: nextRightButtonPageTitle,
            //   component: nextRightButtonPageComponent
            // })}
          />
        )
      }
      return rightButtonMap[lastRoute.passProps.rightButton]
    }
    const Title = (route, navigator, index, navState) => <Button
      title={route.title}
      backgroundColor='white'
      color='#496DCB'
      textStyle={styles.textStyleNavBarTitle}
      onPress={() => navigator.popToTop()}
    />

    return(
      <Navigator
        initialRoute={lastRoute}
        // initialRouteStack={routeStack}
        renderScene={renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton,
              RightButton,
              Title
            }}
          />
        }
      />
    )
  }
}
