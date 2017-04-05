import types from '../actions/dataActions'

const addTemplate = (state, action) => ({
  ...state,
  templates: [
    ...state.templates,
    action.lastId + 1
  ],
  items: state.items.concat(action.newData.items.filter(value => value.itemId))
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

const delItem = (state, action) => ({
  ...state,
  [action.attr]: [
    ...state.items.slice(0, action.targetItemId),
    ...state.items.slice(action.targetItemId + 1)
  ]
})

const addTemplateCategory = (state, action) => ({
  ...state,
  templateCategories: state.templateCategories.concat(action.lastId + 1)
})

const delTemplateCategory = (state, action) => ({

})

const normalizedDataInput = (state, action) => action.data.result

export default function resultReducer(state, action) {
  const reducerMap = {
    [types.ADD_TEMPLATE]: addTemplate,
    [types.DELETE_TEMPLATE]: delTemplate,
    [types.ADD_INSTANCE]: addInstance,
    [types.DELETE_INSTANCE]: deleteInstance,
    [types.ADD_ITEM]: addItem,
    [types.DEL_ITEM]: delItem,
    [types.ADD_TEMPLATE_CATEGORY]: addTemplateCategory,
    [types.DEL_TEMPLATE_CATEGORY]: delTemplateCategory,
    [types.INITIATE_NORMALIZED_DATA_INPUT]: normalizedDataInput
  }
  return reducerMap.hasOwnProperty(action.type) ? reducerMap[action.type](state, action) : state
}
