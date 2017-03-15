import React from 'react'
import {
  View,
  Text,
  ListView,
} from 'react-native'
import styles from '../components/styles'

import {
  Button,
  List,
  ListItem,
  FormLabel,
} from 'react-native-elements'

import TemplateAdd from '../templateLists/templateAdd'

import Reactotron from 'reactotron-react-native'

export default class HomeComponent extends React.Component {

  render() {
    const { route, navigator, dataState } = this.props
    // const { route, navigator, dataState, navigationState, navigationActions } = this.props
    // console.log(`HomeComponent - this.props : ${JSON.stringify(this.props, null, 2)}`)
    // HomeComponent - this.props - key : route, value : [object Object]
    // HomeComponent - this.props - key : navigator, value : [object Object]
    // HomeComponent - this.props - key : navigationState, value : [object Object]
    // HomeComponent - this.props - key : dataState, value : [object Object]
    // HomeComponent - this.props - key : navigationActions, value : [object Object]
    // for(let key in this.props) {
    //   console.log(`HomeComponent - this.props - key : ${key}, value : ${this.props[key]}`)
    // }
    // console.log(`HomeComponent - this.props.route : ${JSON.stringify(this.props.route, null, 2)}`)
    // console.log(`HomeComponent - dataState.badgeValueOfTemplateList : ${JSON.stringify(dataState.badgeValueOfTemplateList, null, 2)}`)
    // console.log(`HomeComponent - this.props.navigationState : ${JSON.stringify(this.props.navigationState, null, 2)}`)
    // console.log(`HomeComponent - this.props.dataState : ${JSON.stringify(this.props.dataState, null, 2)}`)

    // const { route, navigator, navigationState, navigationActions } = this.props
    // const { route, navigator } = this.props
    // const { state, actions } = route.passProps
    // Reactotron.log(`HomeComponent - this.props.state : ${JSON.stringify(state, null, 3)}`)
    const renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.title}
      subtitle={rowData.category}
      badge={{
        value: (typeof dataState.badgeValueOfTemplateList[rowData.title] !== 'number' ? 0 : dataState.badgeValueOfTemplateList[rowData.title]),
        badgeTextStyle: { color: 'white' },
        badgeContainerStyle: { marginTop: 5 }
      }}
      hideChevron
    />
    return(
      <View style={styles.bodyContainer}>
        <FormLabel>
          Check List Template : {dataState.templateList.length}
        </FormLabel>
        <List>
          <ListView
            dataSource={dataState.dataSourceTemplateList}
            renderRow={renderRow}
            enableEmptySections={true}
          />
        </List>
        <View style={{ height: 5 }} />
        <Button
          icon={{ name: 'note-add' }}
          title='Add Template'
          // onPress={() => alert(`needed props to move Tab.add`)}
          onPress={() => {
            navigator.push({
              passProps: {
                leftButton: {
                  title: 'Back',
                  component: '',
                },
                rightButton: {
                  title: '',
                  component: '',
                },
              },
              title: 'Template Add',
              component: TemplateAdd,
              sideMenuVisible: false
            })
            // navigator.push({
            //   passProps: {
            //     firstPageTitleMakeBackDisabled: '',
            //     nextRightButtonPageTitle: '',
            //     nextRightButtonPageComponent: ''
            //   },
            //   title: 'Add',
            //   component: templateAdd
            // })
          }}
        />
      </View>
    )
  }
}

// passProps: {
//   firstPageTitleMakeBackDisabled: 'Template Lists',
//   nextRightButtonPageTitle: 'Add',
//   nextRightButtonPageComponent: { templateAdd }
// },
// title: 'Template Lists',
// component: TemplateListsComponent,
