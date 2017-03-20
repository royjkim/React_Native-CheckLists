import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import Reactotron from 'reactotron-react-native'
import reducer from '../reducers/reducer'
import * as dataActionCreators from '../actions/dataActionCreators'

import HomeContainer from '../home/homeContainer'
import normalizeStore from './normalizeStore'

const logger = createLogger()

// const initialState = {
//   templates: [
//     { id: 1,
//       title: 'GoingFishing',
//       category: 'Hobby',
//       items: [
//         // { id: 1, desc: 'Wear life vest', orderNum: 5 },
//         { id: 3, desc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 },
//         { id: 5, desc: 'Open Door', template: 'BeforeGoOutHome', orderNum: 8 }
//       ]
//     },
//     { id: 2,
//       title: 'BeforeGoOutHome',
//       category: 'NormalDay',
//       items: [
//         { id: 2, desc: 'Wathing TV', template: 'StayHome', orderNum: 1  },
//         { id: 4, desc: 'Close Door', template: 'BeforeGoOutHome', orderNum: 10 }
//       ]
//     },
//     { id: 3,
//       title: 'StayHome',
//       category: 'Relax',
//       items: [
//         { id: 5, desc: 'Open Door', template: 'BeforeGoOutHome', orderNum: 8 },
//         { id: 3, desc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 },
//       ]
//     }
//   ],
//   instances: [
//     { id: 1,
//       name: 'Jack',
//       template: 'GoingFishing',
//       items: [
//         { id: 1, desc: 'Wear life vest', orderNum: 5, status: false },
//         { id: 2, desc: 'Wathing TV', orderNum: 1, status: true  },
//         { id: 3, desc: 'Get on the boat', orderNum: 1, status: true },
//       ]
//     },
//   ],
//   items: [
//     { id: 1, desc: 'Wear life vest', template: 'GoingFishing', orderNum: 5 },
//     { id: 2, desc: 'Wathing TV', template: 'StayHome', orderNum: 1  },
//     { id: 3, desc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 },
//     { id: 4, desc: 'Close Door', template: 'BeforeGoOutHome', orderNum: 10 },
//     { id: 5, desc: 'Open Door', template: 'BeforeGoOutHome', orderNum: 8 },
//   ],
//   templateCategories: [
//     { id: 1, title: 'Hobby' },
//     { id: 2, title: 'NormalDay' },
//     { id: 3, title: 'Relax' }
//   ]
// }

export default function initializeStore() {
  const store = Reactotron.createStore(reducer, compose(applyMiddleware(thunk, logger)))
  let initialData = {
    templates: [],
    instances: [],
    items: [],
    templateCategories: []
  }
  initialData = normalizeStore.addOriginalTemplate(initialData,
    {
      id: 1,
      title: 'GoingFishing',
      category: 'Hobby',
      items: [
        { id: 3, desc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 },
        { id: 5, desc: 'Open Door', template: 'BeforeGoOutHome', orderNum: 8 }
      ]
    }
  )
  initialData = normalizeStore.addOriginalTemplate(initialData,
    { id: 2,
      title: 'BeforeGoOutHome',
      category: 'NormalDay',
      items: [
        { id: 2, desc: 'Wathing TV', template: 'StayHome', orderNum: 1  },
        { id: 4, desc: 'Close Door', template: 'BeforeGoOutHome', orderNum: 10 }
      ]
    },
  )
  initialData = normalizeStore.addOriginalTemplate(initialData,
    { id: 3,
      title: 'StayHome',
      category: 'Relax',
      items: [
        { id: 5, desc: 'Open Door', template: 'BeforeGoOutHome', orderNum: 8 },
        { id: 3, desc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 },
      ]
    }
  )
  initialData = normalizeStore.addOriginalInstance(initialData,
    {
      id: 1,
      name: 'Jack',
      template: 'GoingFishing',
      items: [
        { id: 1, desc: 'Wear life vest', orderNum: 5, status: false },
        { id: 2, desc: 'Wathing TV', orderNum: 1, status: true  },
        { id: 3, desc: 'Get on the boat', orderNum: 1, status: true },
      ]
    }
  )

  initialData = normalizeStore.addOriginalInstance(initialData,
    {
      id: 2,
      name: 'Jack',
      template: 'StayHome',
      items: [
        { id: 4, desc: 'Close Door', orderNum: 10, status: false },
        { id: 5, desc: 'Open Door', orderNum: 8, status: false },
        { id: 2, desc: 'Wathing TV', orderNum: 1, status: true  }
      ]
    }
  )

  initialData = normalizeStore.addOriginalInstance(initialData,
    {
      id: 2,
      name: 'Mike',
      template: 'BeforeGoOutHome',
      items: [
        { id: 4, desc: 'Close Door', orderNum: 10, status: false },
        { id: 5, desc: 'Open Door', orderNum: 8, status: false }
      ]
    }
  )

  initialData = normalizeStore.addItem(initialData,
    { id: 1, desc: 'Wear life vest', template: 'GoingFishing', orderNum: 5 }
  )

  initialData = normalizeStore.addItem(initialData,
    { id: 2, desc: 'Wathing TV', template: 'StayHome', orderNum: 1  }
  )

  initialData = normalizeStore.addItem(initialData,
    { id: 3, desc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 }
  )

  initialData = normalizeStore.addItem(initialData,
    { id: 4, desc: 'Close Door', template: 'BeforeGoOutHome', orderNum: 10 }
  )

  initialData = normalizeStore.addItem(initialData,
    { id: 5, desc: 'Open Door', template: 'BeforeGoOutHome', orderNum: 8 }
  )

  initialData = normalizeStore.addCategory(initialData,
    { id: 1, title: 'Hobby' }
  )

  initialData = normalizeStore.addCategory(initialData,
    { id: 2, title: 'NormalDay' }
  )

  initialData = normalizeStore.addCategory(initialData,
    { id: 3, title: 'Relax' }
  )
  // setTimeout(() => store.dispatch(my_normalize()), 4000)

  // console.log(`Before normalize - initialData : ${JSON.stringify(initialData, null, 1)}`)
  initialData = normalizeStore.my_normalize(initialData)
  // console.log(`After normalize - initialData : ${JSON.stringify(initialData, null, 1)}`)

  store.dispatch(dataActionCreators.normalizedDataInput(initialData))
  // console.log(`store.getState() : ${JSON.stringify(store.getState(), null, 1)}`)
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
//     { id: 1, title: 'GoingFishing', category: 'Hobby' },
//     { id: 2, title: 'BeforeGoOutHome', category: 'NormalDay' },
//     { id: 3, title: 'StayHome', category: 'Relax'}
//   ], -> need to be made by selector.
//   templates: [
//     { id: 1,
//       title: 'GoingFishing',
//       category: 'Hobby',
//       items: [
//         { id: 1, desc: 'Wear life vest', orderNum: 5 },
//       ]
//     },
//   ],
//   instanceList: [
//     { id: 1, name: 'Jack', template: 'GoingFishing'},
//     { id: 1, name: 'Jack', template: 'StayHome'},
//     { id: 2, name: 'Jimmy', template: 'StayHome'},
//     { id: 3, name: 'Mike', template: 'BeforeGoOutHome'},
//     { id: 4, name: 'Sam', template: 'BeforeGoOutHome'},
//   ], -> need to be made by selector.
//   instances: [
//     { id: 1,
//       name: 'Jack',
//       template: 'GoingFishing',
//       items: [
//         { id: 1, desc: 'Wear life vest', orderNum: 5, status: false },
//         { id: 2, desc: 'Wathing TV', orderNum: 1, status: true  },
//         { id: 3, desc: 'Get on the boat', orderNum: 1, status: true },
//       ]
//     },
//   ],
//   items: [
//     { id: 1, desc: 'Wear life vest', template: 'GoingFishing', orderNum: 5 },
//     { id: 2, desc: 'Wathing TV', template: 'StayHome', orderNum: 1  },
//     { id: 3, desc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 },
//     { id: 4, desc: 'Close Door', template: 'BeforeGoOutHome', orderNum: 10 },
//     { id: 5, desc: 'Open Door', template: 'BeforeGoOutHome', orderNum: 8 },
//   ],
//   templateCategories: [
//     { id: 1, title: 'Hobby' },
//     { id: 2, title: 'NormalDay' },
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
