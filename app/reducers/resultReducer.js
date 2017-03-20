import types from '../actions/dataActions'
const initialState = {
  result: {
    templates: [],
    instances: [],
    items: [],
    templateCategories: []
  }
}

const addTemplate = (state, action) => ({
  ...state,
  templates: [
    ...state.templates,
    action.newData.id
  ]
})

const modifyTemplate = (state, action) => ({

})

const delTemplate = (state, action) => ({

})

const addInstance = (state, action) => ({
  ...state,
  instances: [
    ...state.instances,
    action.newData.id
  ]
})

const deleteInstance = (state, action) => ({

})

const modifyInstance = (state, action) => ({

})

const addItem = (state, action) => ({

})

const modifyItem = (state, action) => ({

})

const delItem = (state, action) => ({

})

const addTemplateCategory = (state, action) => ({

})

const modifyTemplateCategory = (state, action) => ({

})

const delTemplateCategory = (state, action) => ({

})

const normalizedDataInput = (state, action) => action.data.result

export default function resultReducer(state = initialState, action) {
  const reducerMap = {
    [types.ADD_TEMPLATE]: addTemplate,
    [types.MODIFY_TEMPLATE]: modifyTemplate,
    [types.DELETE_TEMPLATE]: delTemplate,
    [types.ADD_INSTANCE]: addInstance,
    [types.DELETE_INSTANCE]: deleteInstance,
    [types.MODIFY_INSTANCE]: modifyInstance,
    [types.ADD_ITEM]: addItem,
    [types.MODIFY_ITEM]: modifyItem,
    [types.DEL_ITEM]: delItem,
    [types.ADD_TEMPLATE_CATEGORY]: addTemplateCategory,
    [types.MODIFY_TEMPLATE_CATEGORY]: modifyTemplateCategory,
    [types.DEL_TEMPLATE_CATEGORY]: delTemplateCategory,
    [types.INITIATE_NORMALIZED_DATA_INPUT]: normalizedDataInput
  }
  const handler = reducerMap[action.type]
  // return (typeof handler == 'function' ? handler(state.result, action) : state)
  return (reducerMap.hasOwnProperty(action.type) ? handler(state, action) : state)
}

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
