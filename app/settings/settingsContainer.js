import React from 'react'
import NavBar from '../components/navBar/navBar'
import SettingsComponent from './settingsComponent'

export default class SettingsContainer extends React.Component {
  render() {
    return(
      <NavBar
        initialRoute={{ title: 'Settings', component: SettingsComponent }}
        firstPageTitleMakeBackDisabled='Settings'
      />
    )
  }
}

// import { connect } from 'react-redux'

// initialRoute, firstPageTitleMakeBackDisabled, nextRightButtonPageComponent, nextRightButtonPageTitle
