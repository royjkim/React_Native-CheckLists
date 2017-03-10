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
    // const { initialRoute, firstPageTitleMakeBackDisabled } = this.props
    console.log(`this.props : ${JSON.stringify(this.props, null, 3)}`)
    const { initialRoute } = this.props
    // const { firstPageTitleMakeBackDisabled } = this.props.route.passProps
    // const { nextRightButtonPageComponent, nextRightButtonPageTitle } = this.props
    // const { firstPageTitleMakeBackDisabled, nextRightButtonPageComponent, nextRightButtonPageTitle } = 'a'
    // let { firstPageTitleMakeBackDisabled, nextRightButtonPageComponent, nextRightButtonPageTitle } = this.props.route.passProps
    const renderScene = (route, navigator) => <route.component route={route} navigator={navigator} />
    const LeftButton = (route, navigator, index, navState) => {
      if(route.title !== route.passProps.firstPageTitleMakeBackDisabled) {
        return <Icon
          name='chevron-left'
          size={30}
          containerStyle={{ marginTop: 7, marginLeft: 8 }}
          onPress={() => navigator.pop()}
          />
      } else {
        return null
      }
    }
    // const LeftButton = (route, navigator, index, navState) => (route.title !== firstPageTitleMakeBackDisabled ? <Icon
    //   name='chevron-left'
    //   size={30}
    //   containerStyle={{ marginTop: 7, marginLeft: 8 }}
    //   onPress={() => navigator.pop()}
    //   />
    // : null )
    const RightButton = (route, navigator, index, navState) => {
      // console.log(`navState : ${JSON.stringify(navState, null, 3)}`)
      console.log(`navbar - RightButton - route : ${JSON.stringify(route, null, 3)}`)
      console.log(`navState : ${JSON.stringify(navState, null, 3)}`)
      // console.log(`navState.routeStack[0] : ${JSON.stringify(navState.routeStack[0], null, 3)}`)
      // console.log(`navState.routeStack[1] : ${JSON.stringify(navState.routeStack[1], null, 3)}`)
      // console.log(`navState.routeStack[1].passProps : ${JSON.stringify(navState.routeStack[1].passProps, null, 3)}`)
      // console.log(`navState.routeStack[navState.routeStack.length - 1].passProps.nextRenderComponentTitle : ${JSON.stringify(navState.routeStack[navState.routeStack.length - 1]), null, 3}`)
      // console.log(`navState.routeStack[navState.routeStack.length - 1].passProps.nextRenderComponentTitle : ${String(navState.routeStack[navState.routeStack.length - 1])}`)
      // let temp = { ...navState.routeStack.slice(-1) }
      // let temp = { ...navState.routeStack.slice(-1)[0].passProps }
      // console.log(`temp : ${JSON.stringify(temp, null, 3)}`)
      // console.log(`temp.nextRenderComponentTitle : ${JSON.stringify(temp.nextRenderComponentTitle, null, 3)}`)

      // console.log(`navState.routeStack[navState.routeStack.length - 1].title : ${navState.routeStack[navState.routeStack.length - 1].title == 'MySideMenu'}`)
      // const lastDataOfRouteStackpassProps = (navState.routeStack.slice(-1)[0].passProps !== 'undefined' ? { ...navState.routeStack.slice(-1)[0].passProps } : '')
      // console.log(`lastDataOfRouteStackpassProps.nextRenderComponentTitle : ${lastDataOfRouteStackpassProps.nextRenderComponentTitle == 'ListDetailsComponent'}`)

      // navState.routeStack.map((value, index) => {
      //   console.log(`navState.routeStack, index : ${index}, value : ${JSON.stringify(value, null, 3)}`)
      // })
      // console.log(`before - nextRightButtonPageTitle : ${nextRightButtonPageTitle}`)

      // console.log(`nextRightButtonPageTitle : ${nextRightButtonPageTitle}`)
      // console.log(`navState.routeStack[navState.routeStack.length - 1].title : ${navState.routeStack[navState.routeStack.length - 1].title}`)

      // if(nextRightButtonPageTitle == navState.routeStack[navState.routeStack.length - 1].title) {
      //   alert('nothing')
      //   nextRightButtonPageComponent, nextRightButtonPageTitle = 'nothing'
      // }
      // console.log(`After - nextRightButtonPageTitle : ${nextRightButtonPageTitle}`)
      const { nextRightButtonPageComponent, nextRightButtonPageTitle } = route.passProps

      switch(nextRightButtonPageTitle) {
        case 'ListDetailsComponent':
          return <Icon
            name='menu'
            onPress={() => {
              alert('open side menu')
              console.log(`toggleSideMenu exists or not ${route.passProps.toggleSideMenu !== ''}`)
              // console.log(`route.passProps.toggleSideMenu : ${String(route.passProps.toggleSideMenu)}`)
              console.log(`route.passProps : ${JSON.stringify(route.passProps, null, 3)}`)

              // route.passProps.toggleSideMenu()
            }}
          />
          break
        case '':
          return <Button
            title='None'
            color='#9E9E9E'
            backgroundColor='white'
            onPress={() => alert('None')}
          />
        default:
          return <Button
              title={nextRightButtonPageTitle}
              backgroundColor='white'
              color='black'
              onPress={() => navigator.push({ title: nextRightButtonPageTitle, component: nextRightButtonPageComponent })}
            />
          break
      }

      // if(nextRightButtonPageComponent && nextRightButtonPageTitle) {
      //   lastRightButtonComponent = nextRightButtonPageComponent
      //   // console.log(`nextRightButtonPageComponent : ${nextRightButtonPageComponent}, nextRightButtonPageTitle : ${nextRightButtonPageTitle}`)
      //   return <Button
      //       title={nextRightButtonPageTitle}
      //       backgroundColor='white'
      //       color='black'
      //       onPress={() => navigator.push({ title: nextRightButtonPageTitle, component: nextRightButtonPageComponent })}
      //     />
      // // } else if (navState.routeStack[navState.routeStack.length - 1].title == 'MySideMenu' && navState.routeStack[navState.routeStack.length - 1].passProps.nextRenderComponentTitle == 'ListDetailsComponent') {
      // } else if (nextRightButtonPageTitle == 'ListDetailsComponent') {
      //   alert('MySideMenu')
      //   return <Icon
      //     name='menu'
      //     onPress={() => alert('open side menu')}
      //   />
      // } else {
      //   return <Button
      //       title='None'
      //       color='#9E9E9E'
      //       backgroundColor='white'
      //       onPress={() => alert('None')}
      //     />
      // }
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
