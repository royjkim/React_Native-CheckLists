import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import Reactotron from 'reactotron-react-native'
import reducer from '../reducers/reducer'
import * as dataActionCreators from '../actions/dataActionCreators'

import HomeContainer from '../home/homeContainer'

const logger = createLogger()

export default function initializeStore() {
  const store = Reactotron.createStore(reducer, compose(applyMiddleware(thunk, logger)))
  store.dispatch(dataActionCreators.addNewTemplate(
    { title: 'GoingFishing', category: 'Hobby' }
  ))
  store.dispatch(dataActionCreators.addNewTemplate(
    { title: 'GoOut', category: 'NormalDay' }
  ))
  store.dispatch(dataActionCreators.addNewTemplate(
    { title: 'StayHome', category: 'Relax'}
  ))
  store.dispatch(dataActionCreators.addCustomer(
    { customerId: 1, customerName: 'Jack', templateTitle: 'GoingFishing' }
  ))
  store.dispatch(dataActionCreators.addCustomer(
    { customerId: 2, customerName: 'Jimmy', templateTitle: 'StayHome' }
  ))
  store.dispatch(dataActionCreators.addCustomer(
    { customerId: 1, customerName: 'Jack', templateTitle: 'StayHome' }
  ))
  return store

}

// routeStack = [
//   {
//     passProps: {
//       leftButton: {
//         title: '',
//         component: ,
//       },
//       rightButton: {
//         title: '',
//         component: ,
//       },
//     },
//   title: ,
//   component: ,
//   sideMenuVisible: false
//   }
// ],
// lastRoute : {
//     passProps: {
//       leftButton: '',
//       rightButton: ''
//     },
//   title: ,
//   component: ,
//   sideMenuVisible: false
//   }

// const initialState = {
//   templateList: [
//     { title: 'GoingFishing', category: 'Hobby' },
//     { title: 'GoOut', category: 'NormalDay' },
//     { title: 'StayHome', category: 'Relax'}
//   ],
//   customerList: [
//     { customerId: 1, customerName: 'Jack', templateTitle: 'GoingFishing'},
//     { customerId: 1, customerName: 'Jack', templateTitle: 'StayHome'},
//     { customerId: 2, customerName: 'Jimmy', templateTitle: 'StayHome'},
//     { customerId: 3, customerName: 'Mike', templateTitle: 'GoOut'},
//     { customerId: 4, customerName: 'Sam', templateTitle: 'GoOut'},
//   ],
//   itemsOnEachTemplate: [
//     { itemDesc: 'Wear life vest', template: 'GoingFishing', orderNum: 5 },
//     { itemDesc: 'Wathing TV', template: 'StayHome', orderNum: 1  },
//     { itemDesc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 },
//     { itemDesc: 'Close Door', template: 'GoOut', orderNum: 10 },
//     { itemDesc: 'Open Door', template: 'GoOut', orderNum: 8 },
//   ],
//   sideMenuVisible: false,
//   templateCategoryList: [
//     { title: 'rowing', icon: 'rowing' },
//     { title: 'call', icon: 'call' },
//   ]
// }
