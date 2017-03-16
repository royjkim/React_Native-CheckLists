import types from '../actions/dataActions'

import { schema, normalize } from 'normalizr'

const initialState = {
  templateList: [],
  instanceList: [],
  items: [],
  templateCategoryList: []
}

//       MY_NORMALIZE = 'my_normalize',
//       ORIGINAL_DATA_ADD_TEMPLATE = 'addOriginalTemplate',
//       ORIGINAL_DATA_ADD_INSTANCE = 'addOriginalInstance';

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


// const addNewTemplate = (state, action) => ({
//   ...state,
//   templateList: [
//     ...state.templateList,
//     action.newData
//   ]
// })
//
// const addInstance = (state, action) => ({
//   ...state,
//   instanceList: [
//     ...state.instanceList,
//     action.newData
//   ]
// })
//       MY_NORMALIZE = 'my_normalize',
//       ORIGINAL_DATA_ADD_TEMPLATE = 'addOriginalTemplate',
//       ORIGINAL_DATA_ADD_INSTANCE = 'addOriginalInstance';

const addOriginalTemplate = (state, action) => ({
  ...state,
  templateList: [
    ...state.templateList,
    action.newData
  ]
})

const addOriginalInstance = (state, action) => ({
  ...state,
  instanceList: [
    ...state.instanceList,
    action.newData
  ]
})

const my_normalize = (state, action) => {
  const templateListSchema = new schema.Entity('templateList'),
        instanceListSchema = new schema.Entity('instanceList'),
        itemsSchema = new schema.Entity('items'),
        templateCategoryListSchema = new schema.Entity('templateCategoryList');
  const mySchema = {
    templateList: [ templateListSchema ],
    instanceList: [ instanceListSchema ],
    items: [ itemsSchema ],
    templateCategoryList: [ templateCategoryListSchema ]
  }
  const normalizedData = normalize(state, mySchema)
  console.log(`actionCreators - normalizedData : ${JSON.stringify(normalizedData, null, 1)}`)
  return {
    ...normalizedData
  }
}

export default function originaldataReducer(state = initialState, action) {
  const reducerMap = {
    [types.MY_NORMALIZE]: my_normalize,
    [types.ORIGINAL_DATA_ADD_TEMPLATE]: addOriginalTemplate,
    [types.ORIGINAL_DATA_ADD_INSTANCE]: addOriginalInstance
  }
  const handler = reducerMap[action.type]
  return (typeof handler == 'function' ? handler(state, action) : state)
}
