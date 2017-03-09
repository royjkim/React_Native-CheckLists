import React from 'react'
import {
  Navigator
} from 'react-native'

import {
  Button,
  Icon,
} from 'react-native-elements'

import styles from '../styles'
import Reactotron from 'reactotron-react-native'

export default class NavBar extends React.Component {
  render() {
    const { initialRoute, firstPageTitleMakeBackDisabled } = this.props
    let { nextRightButtonPageComponent, nextRightButtonPageTitle } = this.props
    const renderScene = (route, navigator) => <route.component route={route} navigator={navigator} />
    const LeftButton = (route, navigator, index, navState) => (route.title !== firstPageTitleMakeBackDisabled ? <Icon
      name='chevron-left'
      size={30}
      containerStyle={{ marginTop: 7, marginLeft: 8 }}
      onPress={() => navigator.pop()}
      />
    : null )
    const RightButton = (route, navigator, index, navState) => {
      // Reactotron.log(`navState : ${JSON.stringify(navState, null, 3)}`)
      // Reactotron.log(`before - nextRightButtonPageTitle : ${nextRightButtonPageTitle}`)
      if(nextRightButtonPageTitle == navState.routeStack[navState.routeStack.length - 1].title) {
        nextRightButtonPageComponent, nextRightButtonPageTitle = null
      }
      // Reactotron.log(`After - nextRightButtonPageTitle : ${nextRightButtonPageTitle}`)
      if(nextRightButtonPageComponent && nextRightButtonPageTitle) {
        lastRightButtonComponent = nextRightButtonPageComponent
        return <Button
            title={nextRightButtonPageTitle}
            backgroundColor='white'
            color='black'
            onPress={() => navigator.push({ title: nextRightButtonPageTitle, component: nextRightButtonPageComponent })}
          />
      } else {
        return <Button
            title='None'
            color='#9E9E9E'
            backgroundColor='white'
            onPress={() => alert('None')}
          />
      }
    }
    // const RightButton = (route, navigator, index, navState) => (nextRightButtonPageComponent && nextRightButtonPageTitle ? <Button
    //     title={nextRightButtonPageTitle}
    //     backgroundColor='white'
    //     color='black'
    //     onPress={() => navigator.push({ title: nextRightButtonPageTitle, component: nextRightButtonPageComponent })}
    //   /> : <Button
    //     title='None'
    //     color='#9E9E9E'
    //     backgroundColor='white'
    //     onPress={() => alert('None')}
    //   />)
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
