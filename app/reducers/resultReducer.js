import types from '../actions/dataActions'

const addTemplate = (state, action) => ({
  ...state,
  templates: [
    ...state.templates,
    action.lastId + 1
  ],
  items: state.items.concat(action.newData.items.map(value => value.itemId))
})

const delTemplate = (state, action) => ({

})

const addInstance = (state, action) => ({
  ...state,
  instances: [
    ...state.instances,
    action.newData.instanceId
  ]
})

// const addInstanceThenAddOnResult = (state, action) => ({
//   ...state,
//   [action.attr]: state[action.attr].concat(action.newAddedItemsCustomized)
// })

const addItemsCustomized = (state, action) => ({
  ...state,
  itemsCustomized: state.itemsCustomized.concat(Object.values(action.newData).map(value => value.itemCustomizedId))
})

const addItemsCustomizedWhenAddInstance = (state, action) => {
  return {
    ...state,
    // itemsCustomized: [
    //   ...state.itemsCustomized,
    //   ...action.newAddedItemsCustomized
    // ],
    itemsCustomized: state.itemsCustomized.concat(action.newData.items)
    // itemsCustomized: [
    //   ...state.itemsCustomized,
    //   ...action.newData.items,
    // ]
  }
}

const deleteInstance = (state, action) => ({

})

const addItem = (state, action) => {
  // Below need to be modified, to
  // const itemId =  action.newData.map(value => value.itemId)

  let tempData_items = [];

  action.newData instanceof Array && (tempData_items = action.newData.map(value => value.itemId));
  action.newData instanceof Object && (tempData_items = action.newData.items.map(value => value.itemId));

  return {
    ...state,
    // items: [
    //   ...state.items,
    //   // action.newData.itemId
    //   ...action.newData.map(value => value.itemId)
    // ]
    items: state.items.concat(tempData_items)
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
    // [types.ADD_INSTANCE_THEN_ADD_ON_RESULT]: addInstanceThenAddOnResult,
    [types.ADD_ITEMS_CUSTOMIZED]: addItemsCustomized,
    [types.ADD_ITEMS_CUSTOMIZED_WHEN_ADD_INSTNACE]: addItemsCustomizedWhenAddInstance,
    [types.DELETE_INSTANCE]: deleteInstance,
    [types.ADD_ITEM]: addItem,
    [types.DEL_ITEM]: delItem,
    [types.ADD_TEMPLATE_CATEGORY]: addTemplateCategory,
    [types.DEL_TEMPLATE_CATEGORY]: delTemplateCategory,
    [types.INITIATE_NORMALIZED_DATA_INPUT]: normalizedDataInput
  }
  return reducerMap.hasOwnProperty(action.type) ? reducerMap[action.type](state, action) : state
}
