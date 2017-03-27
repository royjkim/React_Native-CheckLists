import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import Reactotron from 'reactotron-react-native'
import reducer from '../reducers/reducer'
import * as dataActionCreators from '../actions/dataActionCreators'

import HomeContainer from '../home/homeContainer'
import normalizeStore from './normalizeStore'

const logger = createLogger()

export default function initializeStore() {
  const store = Reactotron.createStore(reducer, compose(applyMiddleware(thunk, logger)))
  let initialData = {
    templates: [],
    items: [],
    instances: [],
    itemsCustomized: [],
    templateCategories: []
  }
  initialData = normalizeStore.addOriginalTemplate(initialData,
    {
      templateId: 1,
      title: 'GoingFishing',
      category: 'Hobby',
      items: [
        { itemId: 3, desc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 },
        { itemId: 5, desc: 'Open Door', template: 'BeforeGoOutHome', orderNum: 8 }
      ]
    },
    {
      templateId: 2,
      title: 'BeforeGoOutHome',
      category: 'NormalDay',
      items: [
        { itemId: 2, desc: 'Watching TV', template: 'StayHome', orderNum: 1  },
        { itemId: 4, desc: 'Close Door', template: 'BeforeGoOutHome', orderNum: 10 }
      ]
    },
    {
      templateId: 3,
      title: 'StayHome',
      category: 'Relax',
      items: [
        { itemId: 5, desc: 'Open Door', template: 'BeforeGoOutHome', orderNum: 8 },
        { itemId: 3, desc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 },
      ]
    }
  )

  initialData = normalizeStore.addOriginalInstance(initialData,
    {
      instanceId: 1,
      name: 'Jack',
      // template: 'GoingFishing',
      // templateId: 1,
      template: { templateId: 1, additionalInfo: 'addable' },
      items: [
        { itemCustomizedId: 1, desc: 'Get on the boat' },
        { itemCustomizedId: 2, desc: 'Wear life vest' },
        { itemCustomizedId: 3, desc: 'Watching TV'  }
      ]
    },
    {
      instanceId: 2,
      name: 'Jack',
      // template: 'StayHome',
      // templateId: 3,
      template: { templateId: 3, additionalInfo: 'addable' },
      items: [
        { itemCustomizedId: 4, desc: 'Close Door' },
        { itemCustomizedId: 5, desc: 'Open Door' },
        { itemCustomizedId: 6, desc: 'Watching TV'  }
      ]
    },
    {
      instanceId: 3,
      name: 'Mike',
      // template: 'BeforeGoOutHome',
      // templateId: 2,
      template: { templateId: 2, additionalInfo: 'addable' },
      items: [
        { itemCustomizedId: 7, desc: 'Close Door' },
        { itemCustomizedId: 8, desc: 'Open Door' }
      ]
    },
    {
      instanceId: 4,
      name: 'Mike',
      // template: 'StayHome',
      // templateId: 3,
      template: { templateId: 3, additionalInfo: 'addable' },
      items: [
        { itemCustomizedId: 9, desc: 'Close Door' },
        { itemCustomizedId: 10, desc: 'Watching TV'  },
        { itemCustomizedId: 11, desc: 'Open Door' }
      ]
    }
  )

  initialData = normalizeStore.addItem(initialData,
    // { itemId: 1, desc: 'Wear life vest', template: 'GoingFishing', orderNum: 5 },
    { itemId: 1, desc: 'Wear life vest', templateId: 1, orderNum: 5 },
    { itemId: 2, desc: 'Watching TV', templateId: 3, orderNum: 1  },
    { itemId: 3, desc: 'Get on the boat', templateId: 1, orderNum: 1 },
    { itemId: 4, desc: 'Close Door', templateId: 2, orderNum: 10 },
    { itemId: 5, desc: 'Open Door', templateId: 2, orderNum: 8 }
  )

  initialData = normalizeStore.addCategory(initialData,
    { id: 1, title: 'Hobby' },
    { id: 2, title: 'NormalDay' },
    { id: 3, title: 'Relax' }
  )

  initialData = normalizeStore.addItemsCustomized(initialData,
    { itemCustomizedId: 1, itemId: 3, instanceId: 1, desc: 'Get on the boat', orderNum: 3, status: false },
    { itemCustomizedId: 2, itemId: 1, instanceId: 1, desc: 'Wear life vest', orderNum: 2, status: false },
    { itemCustomizedId: 3, itemId: 2, instanceId: 1, desc: 'Watching TV', orderNum: 1, status: false },
    { itemCustomizedId: 4, itemId: 4, instanceId: 2, desc: 'Close Door', orderNum: 10, status: false },
    { itemCustomizedId: 5, itemId: 5, instanceId: 2, desc: 'Open Door', orderNum: 8, status: true },
    { itemCustomizedId: 6, itemId: 2, instanceId: 2, desc: 'Watching TV', orderNum: 1, status: false },
    { itemCustomizedId: 7, itemId: 4, instanceId: 3, desc: 'Close Door', orderNum: 4, status: true },
    { itemCustomizedId: 8, itemId: 5, instanceId: 3, desc: 'Open Door', orderNum: 3, status: false },
    { itemCustomizedId: 9, itemId: 4, instanceId: 4, desc: 'Close Door', orderNum: 3, status: true },
    { itemCustomizedId: 10, itemId: 2, instanceId: 4, desc: 'Watching TV', orderNum: 1, status: true },
    { itemCustomizedId: 11, itemId: 5, instanceId: 4, desc: 'Open Door', orderNum: 2, status: false }
  )

  // for(let i = 1; i < 5000 ; i++) {
  //   initialData = normalizeStore.addItemsCustomized(initialData,
  //     { itemCustomizedId: i+11, itemId: 3, instanceId: 1, desc: 'force input', orderNum: 3, status: false },
  //   )
  // }

  // setTimeout(() => store.dispatch(my_normalize()), 4000)

  // console.log('Before normalize - initialData : ', initialData)
  initialData = normalizeStore.my_normalize(initialData)
  // console.log(`After normalize - initialData : ', ${JSON.stringify(initialData, null, 1)}`)
  console.log('After normalize - initialData : ', initialData)

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

// this.data = {
//   templates: [
//     { id: 1,
//       title: 'GoingFishing',
//       category: 'Hobby',
//       items: [
//         { itemId: 3, desc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 },
//         { itemId: 5, desc: 'Open Door', template: 'BeforeGoOutHome', orderNum: 8 }
//       ]
//     },
//     { id: 2,
//       title: 'BeforeGoOutHome',
//       category: 'NormalDay',
//       items: [
//         { itemId: 2, desc: 'Watching TV', template: 'StayHome', orderNum: 1  },
//         { itemId: 4, desc: 'Close Door', template: 'BeforeGoOutHome', orderNum: 10 }
//       ]
//     },
//     { id: 3,
//       title: 'StayHome',
//       category: 'Relax',
//       items: [
//         { itemId: 5, desc: 'Open Door', template: 'BeforeGoOutHome', orderNum: 8 },
//         { itemId: 3, desc: 'Get on the boat', template: 'GoingFishing', orderNum: 1 },
//       ]
//     }
//   ],
  // items: [
  //   { itemCustomizedId: 1, itemId: 3, instanceId: 1, desc: 'Get on the boat', orderNum: 3, status: false },
  //   { itemCustomizedId: 2, itemId: 1, instanceId: 1, desc: 'Wear life vest', orderNum: 2, status: false },
  //   { itemCustomizedId: 3, itemId: 2, instanceId: 1, desc: 'Watching TV', orderNum: 1, status: false },
  //   { itemCustomizedId: 4, itemId: 4, instanceId: 2, desc: 'Close Door', orderNum: 10, status: false },
  //   { itemCustomizedId: 5, itemId: 5, instanceId: 2, desc: 'Open Door', orderNum: 8, status: true },
  //   { itemCustomizedId: 6, itemId: 2, instanceId: 2, desc: 'Watching TV', orderNum: 1, status: false },
  //   { itemCustomizedId: 7, itemId: 4, instanceId: 3, desc: 'Close Door', orderNum: 4, status: true },
  //   { itemCustomizedId: 8, itemId: 5, instanceId: 3, desc: 'Open Door', orderNum: 3, status: false },
  //   { itemCustomizedId: 9, itemId: 4, instanceId: 4, desc: 'Close Door', orderNum: 3, status: true },
  //   { itemCustomizedId: 10, itemId: 2, instanceId: 4, desc: 'Watching TV', orderNum: 1, status: true },
  //   { itemCustomizedId: 11, itemId: 5, instanceId: 4, desc: 'Open Door', orderNum: 2, status: false }
  // ],
  // instances: [
  //   {
  //     id: 1,
  //     name: 'Jack',
  //     template: 'GoingFishing',
  //     items: [
  //       { itemCustomizedId: 1, desc: 'Get on the boat' },
  //       { itemCustomizedId: 2, desc: 'Wear life vest' },
  //       { itemCustomizedId: 3, desc: 'Watching TV'  }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     name: 'Jack',
  //     template: 'StayHome',
  //     items: [
  //       { itemCustomizedId: 4, desc: 'Close Door' },
  //       { itemCustomizedId: 5, desc: 'Open Door' },
  //       { itemCustomizedId: 6, desc: 'Watching TV'  }
  //     ]
  //   }
  // ],
//   itemsCustomized: [
//     { id: 1, itemId: 3, instanceId: 1, desc: 'Get on the boat', orderNum: 3, status: false },
//     { id: 2, itemId: 1, instanceId: 1, desc: 'Wear life vest', orderNum: 2, status: false },
//     { id: 3, itemId: 2, instanceId: 1, desc: 'Watching TV', orderNum: 1, status: false },
//     { id: 4, itemId: 4, instanceId: 2, desc: 'Close Door', orderNum: 10, status: false },
//     { id: 5, itemId: 5, instanceId: 2, desc: 'Open Door', orderNum: 8, status: true },
//     { id: 6, itemId: 2, instanceId: 2, desc: 'Watching TV', orderNum: 1, status: false }
//   ],
//   templateCategories: [
//     { id: 1, title: 'Hobby' },
//     { id: 2, title: 'NormalDay' },
//     { id: 3, title: 'Relax' }
//   ]
// }



// After normalize - initialData : {
//  "entities": {
//   "items": {
//    "1": {
//     "itemId": 1,
//     "desc": "Wear life vest",
//     "template": "GoingFishing",
//     "orderNum": 5
//    },
//    "2": {
//     "itemId": 2,
//     "desc": "Watching TV",
//     "template": "StayHome",
//     "orderNum": 1
//    },
//    "3": {
//     "itemId": 3,
//     "desc": "Get on the boat",
//     "template": "GoingFishing",
//     "orderNum": 1
//    },
//    "4": {
//     "itemId": 4,
//     "desc": "Close Door",
//     "template": "BeforeGoOutHome",
//     "orderNum": 10
//    },
//    "5": {
//     "itemId": 5,
//     "desc": "Open Door",
//     "template": "BeforeGoOutHome",
//     "orderNum": 8
//    }
//   },
//   "templates": {
//    "1": {
//     "id": 1,
//     "title": "GoingFishing",
//     "category": "Hobby",
//     "items": [
//      3,
//      5
//     ]
//    },
//    "2": {
//     "id": 2,
//     "title": "BeforeGoOutHome",
//     "category": "NormalDay",
//     "items": [
//      2,
//      4
//     ]
//    },
//    "3": {
//     "id": 3,
//     "title": "StayHome",
//     "category": "Relax",
//     "items": [
//      5,
//      3
//     ]
//    }
//   },
//   "itemsCustomized": {
//    "1": {
//     "itemCustomizedId": 1,
//     "desc": "Get on the boat",
//     "itemId": 3,
//     "instanceId": 1,
//     "orderNum": 3,
//     "status": false
//    },
//    "2": {
//     "itemCustomizedId": 2,
//     "desc": "Wear life vest",
//     "itemId": 1,
//     "instanceId": 1,
//     "orderNum": 2,
//     "status": false
//    },
//    "3": {
//     "itemCustomizedId": 3,
//     "desc": "Watching TV",
//     "itemId": 2,
//     "instanceId": 1,
//     "orderNum": 1,
//     "status": false
//    },
//    "4": {
//     "itemCustomizedId": 4,
//     "desc": "Close Door",
//     "itemId": 4,
//     "instanceId": 2,
//     "orderNum": 10,
//     "status": false
//    },
//    "5": {
//     "itemCustomizedId": 5,
//     "desc": "Open Door",
//     "itemId": 5,
//     "instanceId": 2,
//     "orderNum": 8,
//     "status": true
//    },
//    "6": {
//     "itemCustomizedId": 6,
//     "desc": "Watching TV",
//     "itemId": 2,
//     "instanceId": 2,
//     "orderNum": 1,
//     "status": false
//    },
//    "7": {
//     "itemCustomizedId": 7,
//     "desc": "Close Door",
//     "itemId": 4,
//     "instanceId": 3,
//     "orderNum": 4,
//     "status": true
//    },
//    "8": {
//     "itemCustomizedId": 8,
//     "desc": "Open Door",
//     "itemId": 5,
//     "instanceId": 3,
//     "orderNum": 3,
//     "status": false
//    },
//    "9": {
//     "itemCustomizedId": 9,
//     "desc": "Close Door",
//     "itemId": 4,
//     "instanceId": 4,
//     "orderNum": 3,
//     "status": true
//    },
//    "10": {
//     "itemCustomizedId": 10,
//     "desc": "Watching TV",
//     "itemId": 2,
//     "instanceId": 4,
//     "orderNum": 1,
//     "status": true
//    },
//    "11": {
//     "itemCustomizedId": 11,
//     "desc": "Open Door",
//     "itemId": 5,
//     "instanceId": 4,
//     "orderNum": 2,
//     "status": false
//    }
//   },
//   "instances": {
//    "1": {
//     "id": 1,
//     "name": "Jack",
//     "template": "GoingFishing",
//     "items": [
//      1,
//      2,
//      3
//     ]
//    },
//    "2": {
//     "id": 2,
//     "name": "Jack",
//     "template": "StayHome",
//     "items": [
//      4,
//      5,
//      6
//     ]
//    },
//    "3": {
//     "id": 3,
//     "name": "Mike",
//     "template": "BeforeGoOutHome",
//     "items": [
//      7,
//      8
//     ]
//    },
//    "4": {
//     "id": 4,
//     "name": "Mike",
//     "template": "StayHome",
//     "items": [
//      9,
//      10,
//      11
//     ]
//    }
//   },
//   "templateCategories": {
//    "1": {
//     "id": 1,
//     "title": "Hobby"
//    },
//    "2": {
//     "id": 2,
//     "title": "NormalDay"
//    },
//    "3": {
//     "id": 3,
//     "title": "Relax"
//    }
//   }
//  },
//  "result": {
//   "templates": [
//    1,
//    2,
//    3
//   ],
//   "items": [
//    1,
//    2,
//    3,
//    4,
//    5
//   ],
//   "instances": [
//    1,
//    2,
//    3,
//    4
//   ],
//   "itemsCustomized": [
//    1,
//    2,
//    3,
//    4,
//    5,
//    6,
//    7,
//    8,
//    9,
//    10,
//    11
//   ],
//   "templateCategories": [
//    1,
//    2,
//    3
//   ]
//  }
// }
