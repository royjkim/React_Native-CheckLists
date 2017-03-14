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

export default class NavBar extends React.Component {
  render() {
    const { initialRoute } = this.props
    const renderScene = (route, navigator) => <route.component route={route} navigator={navigator} />
    const LeftButton = (route, navigator, index, navState) => (route.title !== route.passProps.firstPageTitleMakeBackDisabled ? <Icon
      name='chevron-left'
      size={30}
      containerStyle={{ marginTop: 7, marginLeft: 8 }}
      onPress={() => navigator.pop()}
      />
    : null )
    const RightButton = (route, navigator, index, navState) => {
      // Reactotron.log(`navbar - RightButton - route : ${JSON.stringify(route, null, 3)}`)
      const { nextRightButtonPageComponent, nextRightButtonPageTitle } = route.passProps

      const rightButtonMap = {
        ListDetailsComponent: (
          <Icon
            name='menu'
            onPress={() => {
              alert('open side menu')
            }}
          />
        ),
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
        'undefined': (
          <Button
            title='Undefined'
            color='#9E9E9E'
            backgroundColor='white'
            onPress={() => alert('undefined')}
          />
        ),
        Home: (
          <Button
            title={nextRightButtonPageTitle}
            backgroundColor='white'
            color='black'
            onPress={() => navigator.push({
              passProps: {
                firstPageTitleMakeBackDisabled: '',
                nextRightButtonPageTitle: '',
                nextRightButtonPageComponent: ''
              },
              title: nextRightButtonPageTitle,
              component: nextRightButtonPageComponent
            })}
          />
        ),
        'Template Lists': (
          <Button
            title={nextRightButtonPageTitle}
            backgroundColor='white'
            color='black'
            onPress={() => navigator.push({
              title: nextRightButtonPageTitle,
              component: nextRightButtonPageComponent
            })}
          />
        ),
        'Add': (
          <Button
            title={nextRightButtonPageTitle}
            backgroundColor='white'
            color='black'
            onPress={() => navigator.push({
              passProps: {
                firstPageTitleMakeBackDisabled: '',
                nextRightButtonPageTitle: '',
                nextRightButtonPageComponent: ''
              },
              title: nextRightButtonPageTitle,
              component: nextRightButtonPageComponent
            })}
          />
        )
      }
      return rightButtonMap[nextRightButtonPageTitle]
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
        initialRoute={initialRoute}
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
