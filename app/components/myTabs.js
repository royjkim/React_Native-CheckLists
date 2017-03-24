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
import TemplateAdd from '../templateLists/templateAdd'
import TemplateListsContainer from '../templateLists/templateListsContainer'
// import InstanceListsAllContainer from '../instanceListsAll/instanceListsAllContainer'
import ItemListsAllContainer from '../itemListsAll/itemListsAllContainer'
import SettingsContainer from '../settings/settingsContainer'
import NavBar from '../container/navBarContainer'
import styles from './styles'

export default class MyTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'Home'
    }
  }

  render() {
    // const { navigationState } = this.props
    // const { state, actions } = this.props
    return(
      <Tabs>
        <Tab
          titleStyle={styles.tabTitleStyle}
          selectedTitleStyle={{ marginTop: 0, marginBottom: 6 }}
          selected={this.state.selectedTab == 'Home'}
          title={this.state.selectedTab == 'Home' ? 'Home' : null}
          renderIcon={() => <Icon
            name='home'
            />}
          onPress={() => this.setState({ selectedTab: 'Home' })}
          >
          {/* <HomeContainer state={state} actions={actions} /> */}
          <NavBar
            initialRoute={{
              passProps: {
                leftButton: { title: '', component: '' },
                rightButton: { title: '', component: '' }
              },
              title: 'Home',
              sideMenuVisible: false,
              component: HomeContainer
            }}
          />
        </Tab>
        <Tab
          selected={this.state.selectedTab == 'templateList'}
          title={this.state.selectedTab == 'templateList' ? 'Templates' : null}
          titleStyle={styles.tabTitleStyle}
          renderIcon={() => <Icon
            name='list'
          />}
          onPress={() => this.setState({ selectedTab: 'templateList' })}
          // Below is for double click makes navigator.popToTop().
          // But this 'myTabs.js' is not a child of 'Navigator' page.
          // onPress={() => (this.state.selectedTab == 'templateList' ? navigator.popToTop() : this.setState({ selectedTab: 'templateList' }))}
          >
          {/* <TemplateListsContainer state={state} actions={actions} /> */}
          <NavBar
            initialRoute={{
              passProps: {
                leftButton: { title: '', component: '' },
                rightButton: { title: 'Add', component: TemplateAdd }
              },
              title: 'Template List',
              sideMenuVisible: false,
              component: TemplateListsContainer
            }}
          />
        </Tab>
        <Tab
          selected={this.state.selectedTab == 'itemList'}
          title={this.state.selectedTab == 'itemList' ? 'Items' : null}
          titleStyle={styles.tabTitleStyle}
          renderIcon={() => <Icon
            name='list'
          />}
          onPress={() => this.setState({ selectedTab: 'itemList' })}
          // Below is for double click makes navigator.popToTop().
          // But this 'myTabs.js' is not a child of 'Navigator' page.
          // onPress={() => (this.state.selectedTab == 'templateList' ? navigator.popToTop() : this.setState({ selectedTab: 'templateList' }))}
          >
          {/* <TemplateListsContainer state={state} actions={actions} /> */}
          <NavBar
            initialRoute={{
              passProps: {
                leftButton: {
                  title: '',
                  component: ''
                },
                rightButton: {
                  title: '',
                  component: ''
                }
              },
              title: 'Item List',
              component: ItemListsAllContainer
            }}
          />
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
          {/* <SettingsContainer state={state} actions={actions} /> */}
          <NavBar
            initialRoute={{
              passProps: {
                leftButton: { title: '', component: '' },
                rightButton: { title: '', component: '' }
              },
              title: 'Setting',
              sideMenuVisible: false,
              component: SettingsContainer
            }}
          />
        </Tab>
      </Tabs>
    )
  }
}
