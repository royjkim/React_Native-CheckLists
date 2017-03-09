import React from 'react'
import {
  View,
  Text,
} from 'react-native'
import styles from '../components/styles'
import {
  Button
} from 'react-native-elements'

import Reactotron from 'reactotron-react-native'

class CheckList {
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
      checkList: [
        {name: 'Jack', category: 'GoingFishing'}
      ]
    }
  }

  render() {
    const createCheckList = async (name, category) => {
      let myCheckList = new CheckList(name, category)
      await this.setState({
        tempResult: myCheckList.getInfo()
      })
      Reactotron.log(`Between setState() - this.state.checkList : ${JSON.stringify(this.state.checkList, null, 3)}`)
      this.setState({
        checkList: this.state.checkList.concat(this.state.tempResult)
      })
      Reactotron.log(`After setState() - this.state.checkList : ${JSON.stringify(this.state.checkList, null, 3)}`)
    }
    const addTemp = () => {
      this.setState({
        // Don't use push. It makes unexpected results.
        // checkList: this.state.checkList.push({...this.state.tempResult})
        // checkList: this.state.checkList.concat({...this.state.tempResult})
        checkList: this.state.checkList.concat(this.state.tempResult)
      })
      Reactotron.log(`After setState() - this.state.checkList : ${JSON.stringify(this.state.checkList, null, 3)}`)
    }
    return(
      <View style={styles.bodyContainer}>
        <Text>
          Template Lists Component
        </Text>
        <Button
          title='createCheckList'
          onPress={() => createCheckList('Sam2', 'HomeClean2')}
        />
        {/* <Button
          title='addTemp()'
          onPress={() => addTemp()}
        /> */}
        {/* <Text>
          this.state.tempResult : {JSON.stringify(this.state.tempResult, null, 3)}
          {'\n'}
          this.state.checkList : {JSON.stringify(this.state.checkList, null, 3)}
        </Text> */}
        {this.state.checkList.map((value, index) => (
          <Text
            key={index}
            >
            name : {value.name}, category : {value.category}
          </Text>
        ))}
      </View>
    )
  }
}
