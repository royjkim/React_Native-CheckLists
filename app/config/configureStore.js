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
  store.dispatch(dataActionCreators.addOriginalTemplate(
    { id: 1, title: 'GoingFishing', category: 'Hobby' }
  ))
  store.dispatch(dataActionCreators.addOriginalTemplate(
    { id: 2, title: 'BeforeGoOutHome', category: 'NormalDay' }
  ))
  store.dispatch(dataActionCreators.addOriginalTemplate(
    { id: 3, title: 'StayHome', category: 'Relax'}
  ))
  store.dispatch(dataActionCreators.addOriginalInstance(
    { id: 1, name: 'Jack', template: 'GoingFishing'}
  ))
  store.dispatch(dataActionCreators.addOriginalInstance(
    { id: 1, name: 'Jack', template: 'StayHome'}
  ))
  store.dispatch(dataActionCreators.addOriginalInstance(
    { id: 2, name: 'Jimmy', template: 'StayHome'}
  ))
  store.dispatch(dataActionCreators.addOriginalInstance(
    { id: 3, name: 'Mike', template: 'BeforeGoOutHome'}
  ))
  store.dispatch(dataActionCreators.my_normalize())
  // setTimeout(() => store.dispatch(my_normalize()), 4000)
  return store

  // const initialState = {
  //   templateList: [
  //     { id: 1, title: 'GoingFishing', category: 'Hobby' },
  //     { id: 2, title: 'BeforeGoOutHome', category: 'NormalDay' },
  //     { id: 3, title: 'StayHome', category: 'Relax'}
  //   ],
  //   instanceList: [
  //     { id: 1, name: 'Jack', template: 'GoingFishing'},
  //     { id: 1, name: 'Jack', template: 'StayHome'},
  //     { id: 2, name: 'Jimmy', template: 'StayHome'},
  //     { id: 3, name: 'Mike', template: 'BeforeGoOutHome'},
  //     { id: 4, name: 'Sam', template: 'BeforeGoOutHome'},
  //   ],
  //   items: [
  //     { id: 1, desc: 'Wear life vest', template: 'GoingFishing', orderNum: 5 },
  //     { id: 2, desc: 'Wathing TV', template: 'StayHome', orderNum: 1  },
  //     { id: 3, desc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 },
  //     { id: 4, desc: 'Close Door', template: 'BeforeGoOutHome', orderNum: 10 },
  //     { id: 5, desc: 'Open Door', template: 'BeforeGoOutHome', orderNum: 8 },
  //   ],
  //   sideMenuVisible: false,
  //   templateCategoryList: [
  //     { title: 'rowing', icon: 'rowing' },
  //     { id: 1, title: 'Hobby' },
  //     { id: 2, title: 'NormalDat' },
  //     { id: 3, title: 'Relax' }
  //   ]
  // }

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
//     { id: 1, title: 'GoingFishing', category: 'Hobby' },
//     { id: 2, title: 'BeforeGoOutHome', category: 'NormalDay' },
//     { id: 3, title: 'StayHome', category: 'Relax'}
//   ],
//   instanceList: [
//     { id: 1, name: 'Jack', template: 'GoingFishing'},
//     { id: 1, name: 'Jack', template: 'StayHome'},
//     { id: 2, name: 'Jimmy', template: 'StayHome'},
//     { id: 3, name: 'Mike', template: 'BeforeGoOutHome'},
//     { id: 4, name: 'Sam', template: 'BeforeGoOutHome'},
//   ],
//   items: [
//     { id: 1, desc: 'Wear life vest', template: 'GoingFishing', orderNum: 5 },
//     { id: 2, desc: 'Wathing TV', template: 'StayHome', orderNum: 1  },
//     { id: 3, desc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 },
//     { id: 4, desc: 'Close Door', template: 'BeforeGoOutHome', orderNum: 10 },
//     { id: 5, desc: 'Open Door', template: 'BeforeGoOutHome', orderNum: 8 },
//   ],
//   sideMenuVisible: false,
//   templateCategoryList: [
//     { title: 'rowing', icon: 'rowing' },
//     { id: 1, title: 'Hobby' },
//     { id: 2, title: 'NormalDat' },
//     { id: 3, title: 'Relax' }
//   ]
// }


// result_templateList : {
    //  "1": {
    //   "id": 1,
    //   "title": "GoingFishing",
    //   "category": "Hobby"
    //  },
    //  "2": {
    //   "id": 2,
    //   "title": "BeforeGoOutHome",
    //   "category": "NormalDay"
    //  },
    //  "3": {
    //   "id": 3,
    //   "title": "StayHome",
    //   "category": "Relax"
    //  }
    // }

    // result_instanceList : {
    //  "1": {
    //   "id": 1,
    //   "name": "Jack",
    //   "template": "GoingFishing"
    //  },
    //  "2": {
    //   "id": 2,
    //   "name": "Jack",
    //   "template": "StayHome"
    //  },
    //  "3": {
    //   "id": 3,
    //   "name": "Jimmy",
    //   "template": "StayHome"
    //  },
    //  "4": {
    //   "id": 4,
    //   "name": "Mike",
    //   "template": "BeforeGoOutHome"
    //  },
    //  "5": {
    //   "id": 5,
    //   "name": "Sam",
    //   "template": "BeforeGoOutHome"
    //  }
    // }

    // result_items : {
    //  "1": {
    //   "id": 1,
    //   "desc": "Wear life vest",
    //   "template": "GoingFishing",
    //   "orderNum": 5
    //  },
    //  "2": {
    //   "id": 2,
    //   "desc": "Wathing TV",
    //   "template": "StayHome",
    //   "orderNum": 1
    //  },
    //  "3": {
    //   "id": 3,
    //   "desc": "Get on the boat",
    //   "template": "GoingFishing",
    //   "orderNum": 1
    //  },
    //  "4": {
    //   "id": 4,
    //   "desc": "Close Door",
    //   "template": "BeforeGoOutHome",
    //   "orderNum": 10
    //  },
    //  "5": {
    //   "id": 5,
    //   "desc": "Open Door",
    //   "template": "BeforeGoOutHome",
    //   "orderNum": 8
    //  }
    // }

    // result_templateCategoryList : {
    //  "1": {
    //   "id": 1,
    //   "title": "Hobby"
    //  },
    //  "2": {
    //   "id": 2,
    //   "title": "NormalDay"
    //  },
    //  "3": {
    //   "id": 3,
    //   "title": "Relax"
    //  }
    // }

    // this.normalizedData : {
    //   "entities": {
    //     "templateList": {
    //       "1": {
    //         "id": 1,
    //         "title": "GoingFishing",
    //         "category": "Hobby"
    //       },
    //       "2": {
    //         "id": 2,
    //         "title": "BeforeGoOutHome",
    //         "category": "NormalDay"
    //       },
    //       "3": {
    //         "id": 3,
    //         "title": "StayHome",
    //         "category": "Relax"
    //       }
    //     },
    //     "instanceList": {
    //       "1": {
    //         "id": 1,
    //         "name": "Jack",
    //         "template": "GoingFishing"
    //       },
    //       "2": {
    //         "id": 2,
    //         "name": "Jack",
    //         "template": "StayHome"
    //       },
    //       "3": {
    //         "id": 3,
    //         "name": "Jimmy",
    //         "template": "StayHome"
    //       },
    //       "4": {
    //         "id": 4,
    //         "name": "Mike",
    //         "template": "BeforeGoOutHome"
    //       },
    //       "5": {
    //         "id": 5,
    //         "name": "Sam",
    //         "template": "BeforeGoOutHome"
    //       }
    //     },
    //     "items": {
    //       "1": {
    //         "id": 1,
    //         "desc": "Wear life vest",
    //         "template": "GoingFishing",
    //         "orderNum": 5
    //       },
    //       "2": {
    //         "id": 2,
    //         "desc": "Wathing TV",
    //         "template": "StayHome",
    //         "orderNum": 1
    //       },
    //       "3": {
    //         "id": 3,
    //         "desc": "Get on the boat",
    //         "template": "GoingFishing",
    //         "orderNum": 1
    //       },
    //       "4": {
    //         "id": 4,
    //         "desc": "Close Door",
    //         "template": "BeforeGoOutHome",
    //         "orderNum": 10
    //       },
    //       "5": {
    //         "id": 5,
    //         "desc": "Open Door",
    //         "template": "BeforeGoOutHome",
    //         "orderNum": 8
    //       }
    //     },
    //     "templateCategoryList": {
    //       "1": {
    //         "id": 1,
    //         "title": "Hobby"
    //       },
    //       "2": {
    //         "id": 2,
    //         "title": "NormalDay"
    //       },
    //       "3": {
    //         "id": 3,
    //         "title": "Relax"
    //       }
    //     }
    //   },
    //   "result": {
    //     "templateList": [
    //       1,
    //       2,
    //       3
    //     ],
    //     "instanceList": [
    //       1,
    //       2,
    //       3,
    //       4,
    //       5
    //     ],
    //     "items": [
    //       1,
    //       2,
    //       3,
    //       4,
    //       5
    //     ],
    //     "templateCategoryList": [
    //       1,
    //       2,
    //       3
    //     ]
    //   }
    // }
