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
} from 'react-native-elements'

import ListDetailsComponent from './listDetails/listDetailsComponent'
import MySideMenu from '../components/mySideMenu'

import Reactotron from 'reactotron-react-native'

class customersList {
  constructor(name, category) {
    this.name = name
    this.category = category
  }
  getInfo() {
    Reactotron.log(`name : ${this.name}, category : ${this.category}`)
    return { name: this.name, category: this.category }
  }
}

export default class TemplateListsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tempResult: '',
      templateList: [
        { title: 'GoingFishing1', category: 'Hobby' },
        { title: 'GoOut', category: 'NormalDay' }
      ],
      customersList: [
        { CustomerName: 'Jack1', templateTitle: 'GoingFishing1'},
        { CustomerName: 'Jack2', templateTitle: 'GoingFishing1'},
        { CustomerName: 'Jack3', templateTitle: 'GoingFishing1'},
        { CustomerName: 'Mike', templateTitle: 'GoOut'},
        { CustomerName: 'Sam', templateTitle: 'GoOut'},
      ],
      // ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      dataSourceTemplateList: ''
    }
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  componentWillMount() {
    this.setState({
      dataSourceTemplateList: this.ds.cloneWithRows(this.state.templateList)
    })
  }

  render() {
    const { navigator } = this.props
    const createcustomersList = async (name, category) => {
      let mycustomersList = new customersList(name, category)
      await this.setState({
        tempResult: mycustomersList.getInfo()
      })
      Reactotron.log(`Between setState() - this.state.customersList : ${JSON.stringify(this.state.customersList, null, 3)}`)
      this.setState({
        customersList: this.state.customersList.concat(this.state.tempResult)
      })
      Reactotron.log(`After setState() - this.state.customersList : ${JSON.stringify(this.state.customersList, null, 3)}`)
    }
    const addTemp = () => {
      this.setState({
        // Don't use push. It makes unexpected results.
        // customersList: this.state.customersList.push({...this.state.tempResult})
        // customersList: this.state.customersList.concat({...this.state.tempResult})
        customersList: this.state.customersList.concat(this.state.tempResult)
      })
      Reactotron.log(`After setState() - this.state.customersList : ${JSON.stringify(this.state.customersList, null, 3)}`)
    }
    const renderRow = (rowData, sectionID) => <ListItem
      key={sectionID}
      title={rowData.title}
      subtitle={rowData.category}
      onPress={() => navigator.push({
        passProps: {
          customerListOfChosenTemplate: this.state.customersList.filter(data => data.templateTitle == rowData.title),
          // nextRightButtonPageComponent: MySideMenu,
          // nextRightButtonPageTitle: 'MySideMenu',
          nextRightButtonPageComponent: ListDetailsComponent,
          nextRightButtonPageTitle: 'ListDetailsComponent'
        },
        // title: 'MySideMenu',
        title: 'ListDetailsComponent',
        component: MySideMenu,
      })
      }
    />
    return(
      <View style={styles.bodyContainer}>
        <Text>
          Template Lists Component
        </Text>
        <List>
          <ListView
            dataSource={this.state.dataSourceTemplateList}
            renderRow={renderRow}
            enableEmptySections={true}
          />
        </List>
        <Button
          title='createcustomersList'
          onPress={() => createcustomersList('Sam2', 'HomeClean2')}
        />
        {/* <Button
          title='addTemp()'
          onPress={() => addTemp()}
        /> */}
        {/* <Text>
          this.state.tempResult : {JSON.stringify(this.state.tempResult, null, 3)}
          {'\n'}
          this.state.customersList : {JSON.stringify(this.state.customersList, null, 3)}
        </Text> */}
        {this.state.templateList.map((value, index) => (
          <Text
            key={index}
            >
            title : {value.title}, category : {value.category}
          </Text>
        ))}
      </View>
    )
  }
}
