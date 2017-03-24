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

import TemplateAdd from '../templateLists/templateAdd'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class NavBar extends React.Component {
  render() {
    const { initialRoute } = this.props
    const renderScene = (route, navigator) => {
      if(route.component) {
        return <route.component route={route} navigator={navigator} />
      } else {
        alert('route.component is null')
        return null
      }
    }
    const LeftButton = (route, navigator, index, navState) => {
      // console.log(`navBarContainer - LeftButton - navState : ${JSON.stringify(navState, null, 2)}`)
      // console.log(`navBarContainer - LeftButton - route : ${JSON.stringify(route, null, 2)}`)
      if(route.passProps.leftButton.title !== '') {
        return <Icon
          name='chevron-left'
          size={30}
          containerStyle={{ marginTop: 7, marginLeft: 8 }}
          onPress={() => navigator.pop()}
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
                component: TemplateAdd,
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
        initialRoute={initialRoute}
        // initialRoute={lastRoute}
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

const mapStateToProps = (state, ownProps) => ({
  initialRoute: ownProps.initialRoute
})

export default connect(mapStateToProps)(NavBar)
