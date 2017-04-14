import React from 'react'
import {
  View,
  Text,
  Alert,
} from 'react-native'
import styles from '../components/styles';
import {
  Button,
  FormLabel,
} from 'react-native-elements';

const SettingsComponent = props => {
  const currentVersion = '0.1'
  const {
    savelocal,
    loadlocal,
    deleteAll,
    deleteLocalStorage,
  } = props;
  return (
    <View style={styles.bodyContainer}>
      <FormLabel>
        version : {currentVersion}
      </FormLabel>
      <FormLabel>
        Developer : roy
      </FormLabel>
      <View style={{ height: 5 }} />
      <Button
        icon={{ name: 'check' }}
        title='Save on local'
        backgroundColor='#6598F6'
        buttonStyle={styles.buttonStyle}
        onPress={() => savelocal()}
      />
      <Button
        icon={{ name: 'get-app' }}
        title='Load from local'
        backgroundColor='#008D14'
        buttonStyle={styles.buttonStyle}
        onPress={() => Alert.alert(
          'Warning',
          'Current data would be replaced with data from local storage.',
          [
            { text: 'Cancel' },
            { text: 'OK', onPress: () => loadlocal() }
          ]
        )}
      />
      <Button
        icon={{ name: 'delete' }}
        title='Delete current data'
        backgroundColor='#FF7F7C'
        buttonStyle={styles.buttonStyle}
        onPress={() => Alert.alert(
          'Warning',
          'Current data would be deleted. Deleting doesn\'t affect on saved data on local storage.',
          [
            { text: 'Cancel' },
            { text: 'OK', onPress: () => deleteAll()}
          ]
        )}
      />
      <Button
        icon={{ name: 'delete-forever' }}
        title='Delete Data on local Storage'
        backgroundColor='#FF7F7C'
        buttonStyle={styles.buttonStyle}
        onPress={() => Alert.alert(
          'Warning',
          'All data on local storage would be deleted. After deleted cann\'t be restored. Deleting doesn\'t affect current data.',
          [
            { text: 'Cancel' },
            { text: 'OK', onPress: () => deleteLocalStorage()}
          ]
        )}
      />
    </View>
  )
}

export default SettingsComponent
