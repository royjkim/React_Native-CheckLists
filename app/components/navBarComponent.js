import React from 'react'
import {
  Navigator,
  Text,
} from 'react-native'
import styles from '../components/styles'
import {
  Button,
  Icon,
} from 'react-native-elements'

import TemplateAddContainer from '../templateAdd/templateAddContainer'

export default class NavBar extends React.Component {
  render() {
    const { state, triedNavigateWhenPrevented } = this.props
    const renderScene = (route, navigator) => {
      if(route.component) {
        return <route.component route={route} navigator={navigator} />
      } else {
        alert('route.component is null')
        return null
      }
    }
    const LeftButton = (route, navigator, index, navState) => {
      // console.log(`navBarContainer - LeftButton - navState : `, navState)
      // console.log(`navBarContainer - LeftButton - route : ${JSON.stringify(route, null, 2)}`)
      // console.log(`navBarContainer - LeftButton - route : `, route)
      if(route.passProps.leftButton.title !== '') {
        return <Icon
          name='chevron-left'
          size={30}
          containerStyle={{ marginTop: 7, marginLeft: 8 }}
          onPress={() => {
            const __navigatorRouteID = navState.routeStack[navState.presentedIndex].__navigatorRouteID
            state.navigatePrevent[navState.routeStack[navState.presentedIndex].__navigatorRouteID] && !state.triedNavigateWhenPrevented[route.title] ? triedNavigateWhenPrevented(navState.routeStack[navState.presentedIndex].__navigatorRouteID, true) : navigator.pop()
          }}
        />
      } else {
        return (
          <Button
            title='None'
            color='#9E9E9E'
            backgroundColor='white'
            onPress={() => alert('None')}
          />
        )
      }
    }
    const RightButton = (route, navigator, index, navState) => {
      // console.log(`navBarContainer - RightButton - navState : ${JSON.stringify(navState, null, 2)}`)
      if(route.passProps.rightButton.title == '') {
        return (
          <Button
            title='None'
            color='#9E9E9E'
            backgroundColor='white'
            onPress={() => alert('None')}
          />
        )
      } else {
        return (
          <Button
            title={route.passProps.rightButton.title}
            backgroundColor='white'
            color='black'
            onPress={() => navigator.push(
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
                title: 'Template Add',
                component: TemplateAddContainer,
              }
            )}
          />
        )
      }
    }
    const Title = (route, navigator, index, navState) => <Button
      title={route.title}
      backgroundColor='white'
      color='#496DCB'
      textStyle={styles.textStyleNavBarTitle}
      onPress={() => navigator.popToTop()}
    />
    return (
      <Navigator
        initialRoute={state.initialRoute}
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
