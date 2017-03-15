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

import ListDetailsContainer from './listDetails/listDetailsContainer'
import MySideMenu from '../components/mySideMenu'

import Reactotron from 'reactotron-react-native'

export default class TemplateListsComponent extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   tempResult: '',
    //   templateList: [
    //     { title: 'GoingFishing1', category: 'Hobby' },
    //     { title: 'GoOut', category: 'NormalDay' }
    //   ],
    //   customersList: [
    //     { CustomerName: 'Jack1', templateTitle: 'GoingFishing1'},
    //     { CustomerName: 'Jack2', templateTitle: 'GoingFishing1'},
    //     { CustomerName: 'Jack3', templateTitle: 'GoingFishing1'},
    //     { CustomerName: 'Mike', templateTitle: 'GoOut'},
    //     { CustomerName: 'Sam', templateTitle: 'GoOut'},
    //   ],
    //   // ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    //   dataSourceTemplateList: ''
    // }
    // this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  // componentWillMount() {
  //   this.setState({
  //     dataSourceTemplateList: this.ds.cloneWithRows(this.state.templateList)
  //   })
  // }

  render() {
    const { route, navigator, dataState } = this.props
    const renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.title}
      subtitle={rowData.category}
      badge={{
        value: (typeof dataState.badgeValueOfTemplateList[rowData.title] !== 'number' ? 0 : dataState.badgeValueOfTemplateList[rowData.title]),
        badgeTextStyle: { color: 'white'},
        badgeContainerStyle: { marginTop: 5 }
      }}
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
            },
            chosenTemplate: rowData.title
          },
          title: `Customer List of ${rowData.Title}`,
          component: ListDetailsContainer,
        }
      )}
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
      </View>
    )
  }
}
