import types from '../actions/dataActions'
// const initialState = {
//   result: {
//     templates: [],
//     instances: [],
//     items: [],
//     templateCategories: []
//   }
// }

const addTemplate = (state, action) => ({
  ...state,
  templates: [
    ...state.templates,
    action.lastId + 1
  ],
  // items: [
  //   ...state.items,
  //   ...action.newData.items.filter(value => value.itemId)
  // ]
  items: state.items.concat(action.newData.items.filter(value => value.itemId))
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

const addItem = (state, action) => {
  // Below need to be modified, to
  // const itemId =  action.newData.map(value => value.itemId)
  return {
    ...state,
    items: [
      ...state.items,
      // action.newData.itemId
      ...action.newData.map(value => value.itemId)
    ]
  }
}

const modifyItem = (state, action) => ({

})

const delItem = (state, action) => ({

})

const addTemplateCategory = (state, action) => ({
  ...state,
  templateCategories: state.templateCategories.concat(action.lastId + 1)
})

const modifyTemplateCategory = (state, action) => ({

})

const delTemplateCategory = (state, action) => ({

})

const normalizedDataInput = (state, action) => action.data.result

export default function resultReducer(state, action) {
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
  return reducerMap.hasOwnProperty(action.type) ? reducerMap[action.type](state, action) : state
}
