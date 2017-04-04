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
import TemplateAddContainer from '../templateAdd/templateAddContainer'
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
      selectedTab: 'home'
    }
    this.prevTab = 'home'
  }

  render() {
    const { state, navigatePopToTopRequest, navigatePrevent, triedNavigateWhenPrevented } = this.props
    const tabCountFn = attr => {
      // this.prevTab == attr ? state.navigatePopToTopRequest.home ? null : navigatePopToTopRequest(attr, true) : this.setState({ selectedTab: attr })

      // Below is for check current Tab is same with previous Tab or not.
      // If an user tried to navigate even though there was data changes, let redux know 'An user had tried to navigate.'.
      this.prevTab == attr ?
        state.navigatePrevent[attr] ?
          state.triedNavigateWhenPrevented[attr] ?
            null : triedNavigateWhenPrevented(attr, true)
              : state.navigatePopToTopRequest.home ?
                null : navigatePopToTopRequest(attr, true)
                  : this.setState({ selectedTab: attr })

      this.prevTab = attr
    }
    return(
      <Tabs>
        <Tab
          titleStyle={styles.tabTitleStyle}
          selectedTitleStyle={{ marginTop: 0, marginBottom: 6 }}
          selected={this.state.selectedTab == 'home'}
          title={this.state.selectedTab == 'home' ? 'Home' : null}
          renderIcon={() => <Icon
            name='home'
            />
          }
          onPress={() => tabCountFn('home') }
          >
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
                },
                parentTab: 'home'
              },
              title: 'Home',
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
          onPress={() => tabCountFn('templateList')}
          >
          <NavBar
            initialRoute={{
              passProps: {
                leftButton: {
                  title: '',
                  component: ''
                },
                rightButton: {
                  title: 'Add',
                  component: TemplateAddContainer
                },
                parentTab: 'templateList'
              },
              title: 'Template List',
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
          onPress={() => tabCountFn('itemList')}
          >
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
                },
                parentTab: 'itemList'
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
            onPress={() => tabCountFn('settings')}
          />}
          >
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
                },
                parentTab: 'settings'
              },
              title: 'Setting',
              component: SettingsContainer
            }}
          />
        </Tab>
      </Tabs>
    )
  }
}
