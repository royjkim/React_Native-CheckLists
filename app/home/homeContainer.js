import React from 'react'
import {

} from 'react-native'
import NavBar from '../components/navBar/navBar'
import HomeComponent from './homeComponent'

export default class HomeContainer extends React.Component {
  render() {
    return(
      <NavBar
        initialRoute={{title: 'Home', component: HomeComponent}}
        firstPageTitleMakeBackDisabled='Home'
      />
    )
  }
}
// initialRoute, firstPageTitleMakeBackDisabled, nextRightButtonPageComponent, nextRightButtonPageTitle
