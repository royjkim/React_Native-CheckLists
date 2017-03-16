import types from '../actions/dataActions'
const initialState = {
  result: {
    templateList: [],
    instanceList: [],
    items: [],
    templateCategoryList: []
  }
}

// const ADD_TEMPLATE = 'addNewTemplate',
//       MODIFY_TEMPLATE = 'modifyExistingTemplate',
//       DELETE_TEMPLATE = 'deleteExistingTemplate',
//       ADD_INSTANCE = 'addInstance',
//       DELETE_INSTANCE = 'deleteInstance',
//       MODIFY_INSTANCE = 'modifyInstance',
//       ADD_ITEM = 'addItem',
//       MODIFY_ITEM = 'modifyItem',
//       DEL_ITEM = 'delItem',
//       ADD_TEMPLATE_CATEGORY = 'addTemplateCategory',
//       MODIFY_TEMPLATE_CATEGORY = 'modifyTemplateCategory',
//       DEL_TEMPLATE_CATEGORY = 'delTemplateCategory',

const addTemplate = (state, action) => ({
  ...state,
  templateList: [
    ...state.templateList,
    action.newData.id
  ]
})

const modifyTemplate = (state, action) => ({

})

const delTemplate = (state, action) => ({

})

const addInstance = (state, action) => ({
  ...state,
  instanceList: [
    ...state.instanceList,
    action.newData.id
  ]
})

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
    [types.DEL_TEMPLATE_CATEGORY]: delTemplateCategory
  }
  const handler = reducerMap[action.type]
  return (typeof handler == 'function' ? handler(state.result, action) : state)
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
