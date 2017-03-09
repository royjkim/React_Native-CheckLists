import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // pure Navigator Component already have 'marginTop: 20'
    // marginTop: 20
  },
  bodyContainer: {
    flex: 1,
    marginTop: 64
  },
  bodyContainerOnSideMenu: {
    flex: 1,
    marginTop: 64,
    backgroundColor: 'white'
  },
  textStyleNavBarTitle: {
    fontWeight: '500',
    fontSize: 18
  },
  tabTitleStyle: {
    fontWeight: 'bold',
    fontSize: 10
  },
})

export default styles
