import React from 'react'
import {
  View,
  Text
} from 'react-native'
import styles from '../components/styles'

import {
  Button,
} from 'react-native-elements'

import TemplateListAdd from '../templateLists/templateListAdd'

export default class HomeComponent extends React.Component {

  render() {
    const { route, navigator } = this.props
    return(
      <View style={styles.bodyContainer}>
        <Text>
          Counts of List(Template) : 00 (ListView w/ map())
        </Text>
        <Button
          icon={{ name: 'note-add' }}
          title='Add Template'
          // onPress={() => alert(`needed props to move Tab.add`)}
          onPress={() => navigator.push({ title: 'Add', component: TemplateListAdd }) }
        />
      </View>
    )
  }
}
