import types from '../actions/dataActions'

const addTemplate = (state, action) => ({
  ...state,
  templates: [
    ...state.templates,
    action.lastId + 1
  ],
  items: state.items.concat(action.newData.items.map(value => value.itemId))
})

const delTemplate = (state, action) => {
  let tempData_templates = [ ...state.templates ];
  const targetIndexOfTemplates = tempData_templates.indexOf(parseInt(action.targetData.templateId));
  targetIndexOfTemplates !== -1 && tempData_templates.splice(targetIndexOfTemplates, 1);
  return {
    ...state,
    templates: [
      ...tempData_templates
    ]
  }
}

const addInstance = (state, action) => ({
  ...state,
  instances: [
    ...state.instances,
    action.newData.instanceId
  ]
})

const deleteInstance = (state, action) => {
  let tempData_instances = [ ...state.instances ];
  const targetIndexOfInstance = tempData_instances.indexOf(action.targetData.instanceId);
  targetIndexOfInstance !== -1 && (tempData_instances = [
    ...tempData_instances.slice(0, targetIndexOfInstance),
    ...tempData_instances.slice(targetIndexOfInstance + 1)
  ]);
  return targetIndexOfInstance !== -1 ? {
    ...state,
    instances: [
      ...tempData_instances
    ]
  } : state
}

const delInstanceWhenDeleteTemplate = (state, action) => {
  let tempData_instances = [ ...state.instances ];
  action.targetData.instances.map(value => {
    const targetIndexOfInstances = tempData_instances.indexOf(value);
    targetIndexOfInstances !== -1 && tempData_instances.splice(targetIndexOfInstances, 1);
  })
  return {
    ...state,
    instances: [
      ...tempData_instances
    ]
  }
}

const modifyItemsCustomized = (state, action) => {
  let tempData_itemsCustomized = [ ...state.itemsCustomized ],
      toBeDeletedItemsCustomized = [];
  for(let key in action.targetData) {
    if(action.targetData[key].desc == '') {
      toBeDeletedItemsCustomized.push(action.targetData[key].itemCustomizedId);
        const deleteTargetIndex = tempData_itemsCustomized.indexOf(action.targetData[key].itemCustomizedId);
        tempData_itemsCustomized = [
          ...tempData_itemsCustomized.slice(0, deleteTargetIndex),
          ...tempData_itemsCustomized.slice(deleteTargetIndex + 1)
        ];
    };
  }
  return toBeDeletedItemsCustomized.length > 0 ? {
    ...state,
    itemsCustomized: [
      ...tempData_itemsCustomized
    ]
  } : state;
  // return {
  //   ...state,
  //
  // }
}

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

const delItemsCustomized = (state, action) => {
  let tempData_itemsCustomized = [ ...state.itemsCustomized ];
  action.targetData.items.map(value => {
    const targetIndexOfItemsCustomized = tempData_itemsCustomized.indexOf(value);
    // targetIndexOfItemsCustomized !== -1 && (tempData_itemsCustomized = [
    //   ...tempData_itemsCustomized.slice(0, targetIndexOfItemsCustomized),
    //   ...tempData_itemsCustomized.slice(targetIndexOfItemsCustomized + 1)
    // ]);
    targetIndexOfItemsCustomized !== -1 && tempData_itemsCustomized.splice(targetIndexOfItemsCustomized, 1);
  })
  return {
    ...state,
    itemsCustomized: [
      ...tempData_itemsCustomized
    ]
  }
}

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

const delItemWhenDeleteTemplate = (state, action) => {
  let tempData_items = [ ...state.items ];
  action.targetData.items.map(value => {
    const targetIndexOfItems = tempData_items.indexOf(parseInt(value));
    targetIndexOfItems !== -1 && tempData_items.splice(targetIndexOfItems, 1);
  })
  return {
    ...state,
    items: [
      ...tempData_items
    ]
  }
}

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
    [types.DELETE_INSTANCE_WHEN_DELETE_TEMPLATE]: delInstanceWhenDeleteTemplate,
    [types.MODIFY_ITEMS_CUSTOMIZED]: modifyItemsCustomized,
    [types.ADD_ITEMS_CUSTOMIZED]: addItemsCustomized,
    [types.ADD_ITEMS_CUSTOMIZED_WHEN_ADD_INSTNACE]: addItemsCustomizedWhenAddInstance,
    [types.DEL_ITEMS_CUSTOMIZED]: delItemsCustomized,
    [types.ADD_ITEM]: addItem,
    [types.DEL_ITEM]: delItem,
    [types.DEL_ITEM_MULTI_WHEN_DEL_TEMPLATE]: delItemWhenDeleteTemplate,
    [types.ADD_TEMPLATE_CATEGORY]: addTemplateCategory,
    [types.DEL_TEMPLATE_CATEGORY]: delTemplateCategory,
    [types.INITIATE_NORMALIZED_DATA_INPUT]: normalizedDataInput
  }
  return reducerMap.hasOwnProperty(action.type) ? reducerMap[action.type](state, action) : state
}
