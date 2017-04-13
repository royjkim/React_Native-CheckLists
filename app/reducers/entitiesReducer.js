import types from '../actions/dataActions'
import { cloneDeep } from 'lodash';

const initialState = {
  entities: {
    templateList: [],
    instanceList: [],
    items: [],
    templateCategories: []
  }
};

const addTemplate = (state, action) => ({
  ...state,
  templates: {
    ...state.templates,
    [action.lastId.templates + 1]: {
      ...action.newData,
      items: action.newData.items.map(value => value.itemId),
      instances: []
    }
  }
})

const addInstance = (state, action) => ({
  ...state,
  instances: {
    ...state.instances,
    [action.newData.instanceId]: {
      ...action.newData
    }
  }
})

const addInstanceOnTemplate = (state, action) => {
  let tempData_templates = { ...state.templates[action.newData.templateId] };
  tempData_templates.instances.push(action.newData.instanceId);
  return {
    ...state,
    templates: {
      ...state.templates,
      [action.newData.templateId]: {
        ...tempData_templates
      }
    }
  }
}

const modifyTemplate = (state, action) => ({
  ...state,
  templates: {
    ...state.templates,
    [action.targetTemplateId]: {
      ...state.templates[action.targetTemplateId],
      title: action.data
    }
  }
})

const delTemplate = (state, action) => {
  let tempData_templates = { ...state.templates };
  delete tempData_templates[action.targetData.templateId];
  return {
    ...state,
    templates: {
      ...tempData_templates
    }
  }
}

const deleteInstance = (state, action) => {
  let tempData_instances = { ...state.instances },
      tempData_templates = { ...state.templates };
  delete tempData_instances[action.targetData.instanceId];
  const targetIndexOfInstanceOfTemplate = tempData_templates[action.targetData.templateId].instances.indexOf(parseInt(action.targetData.instanceId));
  targetIndexOfInstanceOfTemplate !== -1 && tempData_templates[action.targetData.templateId].instances.splice(targetIndexOfInstanceOfTemplate, 1);
  return {
    ...state,
    instances: {
      ...tempData_instances
    },
    templates: {
      ...tempData_templates
    }
  }
}

const delInstanceWhenDeleteTemplate = (state, action) => {
  let tempData_instances = { ...state.instances };
  action.targetData.instances.map(value => {
    tempData_instances.hasOwnProperty(value) && delete tempData_instances[value]
  })
  return {
    ...state,
    instances: {
      ...tempData_instances
    }
  }
}

const modifyInstance = (state, action) => ({
  ...state,
  instances: {
    ...state.instances,
    [action.targetInstanceId]: {
      ...state.instances[action.targetInstanceId],
      name: action.data
    }
  }
})

const addItemsCustomized = (state, action)  => {
  const chosenInstanceId = action.newData[0].instanceId;
  let tempData_itemsCustomized = {},
      tempData_instances = { ...state.instances },
      tempData_itemsArray_OfInstance = state.instances[chosenInstanceId].items;
  action.newData.map(value => {
    tempData_itemsCustomized[value.itemCustomizedId] = {
      ...value
    };
    tempData_itemsArray_OfInstance.push(value.itemCustomizedId);
  });
  tempData_instances[chosenInstanceId].items = tempData_itemsArray_OfInstance;
  return {
    ...state,
    instances: {
      ...tempData_instances
    },
    itemsCustomized: {
      ...state.itemsCustomized,
      ...tempData_itemsCustomized
    },
  }
};

const addItemsCustomizedWhenAddInstance = (state, action) => {
  // let tempData_itemsCustomized = { ...state.itemsCustomized },
  let tempData_newAddedItemsCustomized = {};
  let lastId = action.lastId;
  state.templates[action.newData.templateId].items.map(value => {
    tempData_newAddedItemsCustomized[++lastId] = {
      ...state.items[value],
      instanceId: action.newData.instanceId,
      itemCustomizedId: lastId,
      status: false
    };
    tempData_newAddedItemsCustomized.hasOwnProperty(lastId) && (delete tempData_newAddedItemsCustomized[lastId].template,
      delete tempData_newAddedItemsCustomized[lastId].templateId);
  })
  let tempData_instances = { ...state.instances };
  for(let key in tempData_newAddedItemsCustomized) {
    tempData_instances[action.newData.instanceId].items.push(tempData_newAddedItemsCustomized[key].itemCustomizedId)
  };
  return {
    ...state,
    instances: {
      ...tempData_instances
    },
    itemsCustomized: {
      ...state.itemsCustomized,
      ...tempData_newAddedItemsCustomized
    }
  }
}
const delItemsCustomized = (state, action) => {
  let tempData_itemsCustomized = { ...state.itemsCustomized };
  action.targetData.items.map(value => {
    delete tempData_itemsCustomized[value]
  });
  return {
    ...state,
    itemsCustomized: {
      ...tempData_itemsCustomized
    }
  }
}

const modifyItemsCustomized = (state, action) => {
  let tempData_itemsCustomized = { ...state.itemsCustomized },
      deletedStatus = false,
      tempData_instancesOfTargetData = { ...state.instances[action.targetInstanceId] };

  for(let key in action.targetData) {
    if(action.targetData[key].desc == '') {
      delete tempData_itemsCustomized[key];
      const targetIndexOfItemOfInstance = tempData_instancesOfTargetData.items.indexOf(parseInt(key));
      targetIndexOfItemOfInstance !== -1 && (tempData_instancesOfTargetData.items = [
        ...tempData_instancesOfTargetData.items.slice(0, targetIndexOfItemOfInstance),
        ...tempData_instancesOfTargetData.items.slice(targetIndexOfItemOfInstance + 1)
      ], deletedStatus = true);
    } else {
      tempData_itemsCustomized[action.targetData[key].itemCustomizedId] = {
        ...action.targetData[key],
        status: state.itemsCustomized[action.targetData[key].itemCustomizedId].status
      };
    }
  };
  return deletedStatus ? {
    ...state,
    instances: {
      ...state.instances,
      [action.targetInstanceId]: {
        ...tempData_instancesOfTargetData
      }
    },
    itemsCustomized: {
      ...tempData_itemsCustomized
    }
  } : {
    ...state,
    itemsCustomized: {
      ...tempData_itemsCustomized
    }
  }
}

const changeStatusOfItemsCustomized = (state, action) => ({
  ...state,
  itemsCustomized: {
    ...state.itemsCustomized,
    [action.targetData.itemCustomizedId]: {
      ...action.targetData,
      status: !action.targetData.status
    }
  }
})

const addItem = (state, action) => {
  let temp_items = {},
      tempData_templates = { ...state.templates[action.templateId] };
    // temp_itemsInTemplates = [];
    for(let key in action.newData) {
      temp_items[key] = {
        ...action.newData[key],
      };
      tempData_templates.items.push(parseInt(key));
    };
  return {
    ...state,
    items: {
      ...state.items,
      ...temp_items
    },
    templates: {
      ...state.templates,
      [action.templateId] : {
        ...tempData_templates
      }
    }
  }
}

const addItemWhenAddTemplate = (state, action) => {
  let tempData_items = {};
  action.newData.items.map(value => {
    tempData_items[value.itemId] = {
      ...value
    };
  });
  return {
    ...state,
    items: {
      ...state.items,
      ...tempData_items
    }
  }
}

const modifyItem = (state, action) => {
  let tempData_items = { ...state.items };
  for(let key in action.data) {
    tempData_items[key] = {
      ...tempData_items[key],
      desc: action.data[key]
    };
  };
  return {
    ...state,
    items: {
      ...tempData_items
    }
  }
}

const delItem = (state, action) => {
  let tempData_items = { ...state.items };
  delete tempData_items[action.targetItemId];
  let tempData_itemsOfTemplate = [ ...state.templates[action.targetTemplateId].items ];
  const targetIndexOfTemplateItems = tempData_itemsOfTemplate.findIndex(value => value == action.targetItemId);
  tempData_itemsOfTemplate = [
    ...tempData_itemsOfTemplate.slice(0, targetIndexOfTemplateItems),
    ...tempData_itemsOfTemplate.slice(targetIndexOfTemplateItems + 1)
  ]
  return {
    ...state,
    items: {
      ...tempData_items
    },
    templates: {
      ...state.templates,
      [action.targetTemplateId]: {
        ...state.templates[action.targetTemplateId],
        items: [
          ...tempData_itemsOfTemplate,
        ]
      }
    }
  }
}

const delItemWhenDeleteTemplate = (state, action) => {
  let tempData_items = { ...state.items };
  action.targetData.items.map(value => {
    tempData_items.hasOwnProperty(value) && delete tempData_items[value];
  })
  return {
    ...state,
    items: {
      ...tempData_items
    }
  }
}

const addTemplateCategory = (state, action) => ({
  ...state,
  templateCategories: {
    ...state.templateCategories,
    [action.newData.templateCategoriesId]: {
      id: action.newData.templateCategoriesId,
      ...action.newData
    }
  }
})

const modifyTemplateCategory = (state, action) => ({
  ...state,
})

const delTemplateCategory = (state, action) => ({
  ...state,
})

const normalizedDataInput = (state, action) => action.data.entities

export default function resultReducer(state = initialState, action) {
  const reducerMap = {
    [types.ADD_TEMPLATE]: addTemplate,
    [types.MODIFY_TEMPLATE]: modifyTemplate,
    [types.DELETE_TEMPLATE]: delTemplate,
    [types.ADD_INSTANCE]: addInstance,
    [types.ADD_INSTANCE_ON_TEMPLATE]: addInstanceOnTemplate,
    [types.DELETE_INSTANCE]: deleteInstance,
    [types.DELETE_INSTANCE_WHEN_DELETE_TEMPLATE]: delInstanceWhenDeleteTemplate,
    [types.MODIFY_INSTANCE]: modifyInstance,
    [types.ADD_ITEMS_CUSTOMIZED]: addItemsCustomized,
    [types.ADD_ITEMS_CUSTOMIZED_WHEN_ADD_INSTNACE]: addItemsCustomizedWhenAddInstance,
    [types.DEL_ITEMS_CUSTOMIZED]: delItemsCustomized,
    [types.MODIFY_ITEMS_CUSTOMIZED]: modifyItemsCustomized,
    [types.CHANGE_STATUS_OF_ITEMS_CUSTOMIZED]: changeStatusOfItemsCustomized,
    [types.ADD_ITEM]: addItem,
    [types.ADD_ITEM_WHEN_ADD_TEMPLATE]: addItemWhenAddTemplate,
    [types.MODIFY_ITEM]: modifyItem,
    [types.DEL_ITEM]: delItem,
    [types.DEL_ITEM_MULTI_WHEN_DEL_TEMPLATE]: delItemWhenDeleteTemplate,
    [types.ADD_TEMPLATE_CATEGORY]: addTemplateCategory,
    [types.MODIFY_TEMPLATE_CATEGORY]: modifyTemplateCategory,
    [types.DEL_TEMPLATE_CATEGORY]: delTemplateCategory,
    [types.INITIATE_NORMALIZED_DATA_INPUT]: normalizedDataInput
  }
  return reducerMap.hasOwnProperty(action.type) ? reducerMap[action.type](state, action) : state
}
