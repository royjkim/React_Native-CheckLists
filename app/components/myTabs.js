import React from 'react'
import {
  View,
  Text,
} from 'react-native'

import {
  Tabs,
  Tab,
  Icon
} from 'react-native-elements'

import HomeContainer from '../home/homeContainer'
import TemplateListsContainer from '../templateLists/templateListsContainer'
import SettingsContainer from '../settings/settingsContainer'
import styles from './styles'

export default class MyTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'home'
    }
  }

  render() {
    return(
      <Tabs>
        <Tab
          titleStyle={{ fontWeight: 'bold', fontSize: 10 }}
          selectedTitleStyle={{ marginTop: 0, marginBottom: 6 }}
          selected={this.state.selectedTab == 'home'}
          title={this.state.selectedTab == 'home' ? 'Home' : null}
          renderIcon={() => <Icon
            name='home'
            />}
          onPress={() => this.setState({ selectedTab: 'home' })}
          >
          <HomeContainer />
        </Tab>
        <Tab
          selected={this.state.selectedTab == 'templateList'}
          title={this.state.selectedTab == 'templateList' ? 'Template' : null}
          titleStyle={styles.tabTitleStyle}
          renderIcon={() => <Icon
            name='list'
          />}
          onPress={() => this.setState({ selectedTab: 'templateList' })}
          // Below is for double click makes navigator.popToTop().
          // But this 'myTabs.js' is not a child of 'Navigator' page.
          // onPress={() => (this.state.selectedTab == 'templateList' ? navigator.popToTop() : this.setState({ selectedTab: 'templateList' }))}
          >
          <TemplateListsContainer />
        </Tab>
        <Tab
          selected={this.state.selectedTab == 'settings'}
          title={this.state.selectedTab == 'settings' ? 'Settings' : null}
          titleStyle={styles.tabTitleStyle}
          renderIcon={() => <Icon
            name='settings'
            onPress={() => this.setState({ selectedTab: 'settings'})}
          />}
          >
          <SettingsContainer />
        </Tab>
      </Tabs>
    )
  }
}
