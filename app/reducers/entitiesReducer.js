import types from '../actions/dataActions'

const initialState = {
  entities: {
    templateList: [],
    instanceList: [],
    items: [],
    templateCategories: []
  }
}

const addTemplate = (state, action) => {
  return {
    ...state,
    templates: {
      ...state.templates,
      [action.lastId.templates + 1]: {
        ...action.newData,
        items: action.newData.items.map(value => value.itemId)
      }
    }
    // items: {
    //   ...state.items,
    //   ...temp_items
    // }
    // items: {
    //   ...state.items,
    //   [action.lastId.items + 1]: {
    //     ...action.newData.items
    //   }
    // },
    // itemsCustomized: {
    //   ...state.itemsCustomized,
    //   ...temp_itemsCustomized
    // }
  }
}

const addInstance = (state, action) => ({
  ...state,
  instances: {
    ...state.instances,
    [action.newData.instanceId]: {
      ...action.newData
    }
  },
  // itemsCustomized: {
  //   ...tempData_itemsCustomized
  // }
})

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

const delTemplate = (state, action) => ({

})

const deleteInstance = (state, action) => ({

})

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

// export function addItemsCustomized(lastId, newData, newAddedItemsCustomized) {
//   return {
//     type: types.ADD_ITEMS_CUSTOMIZED,
//     attr: 'itemsCustomized',
//     lastId: lastId.itemsCustomized,
//     newData,
//     newAddedItemsCustomized
//   }
// }

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
    // tempData_itemsCustomized[++action.lastId] = {
    //   ...state.items[value],
    //   instanceId: action.newData.instanceId,
    //   itemCustomizedId: action.lastId,
    //   status: false
    // };
    tempData_newAddedItemsCustomized[++lastId] = {
      // ...tempData_itemsCustomized[action.lastId]
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
      // instances: {
      //   ...state.instances,
      //   [action.newData.instanceId]: {
      //     ...state.instances[action.newData.instanceId],
      //     items: [
      //       ...state.instances[action.newData.instanceId].items,
      //       ...tempData_itemsCustomized.map(value => value.itemsCustomizedId)
      //     ]
      //   }
      // },
      instances: {
        ...tempData_instances
      },
      itemsCustomized: {
        ...state.itemsCustomized,
        ...tempData_newAddedItemsCustomized
        // ...tempData_itemsCustomized
      }
}
}

const modifyItemsCustomized = (state, action) => {
  let tempData_itemsCustomized = { ...state.itemsCustomized },
      // tempData_instancesOfTargetData = {},
      // targetDataInstanceId = action.targetInstanceId,
      deletedStatus = false,
      tempData_instancesOfTargetData = { ...state.instances[action.targetInstanceId] };

  for(let key in action.targetData) {
    if(action.targetData[key].desc == '') {
      delete tempData_itemsCustomized[key];
      // targetDataInstanceId = action.targetData[key].instanceId;
      // console.log('action.targetInstanceId : ', action.targetInstanceId);

      // console.log(`tempData_instancesOfTargetData : ${JSON.stringify(tempData_instancesOfTargetData, null, 1)}`)
      // console.log('tempData_instancesOfTargetData.items : ', tempData_instancesOfTargetData.items);
      console.log(`before - tempData_instancesOfTargetData : ${JSON.stringify(tempData_instancesOfTargetData, null, 1)}`)
      const targetIndexOfItemOfInstance = tempData_instancesOfTargetData.items.indexOf(parseInt(key));
      console.log(`the value want to find - key : ${key}, targetIndexOfItemOfInstance : ${targetIndexOfItemOfInstance}`);
      targetIndexOfItemOfInstance !== -1 && (tempData_instancesOfTargetData.items = [
        ...tempData_instancesOfTargetData.items.slice(0, targetIndexOfItemOfInstance),
        ...tempData_instancesOfTargetData.items.slice(targetIndexOfItemOfInstance + 1)
      ], deletedStatus = true);
      console.log(`after - tempData_instancesOfTargetData : ${JSON.stringify(tempData_instancesOfTargetData, null, 1)}`)
      console.log('tempData_instancesOfTargetData.items : ', tempData_instancesOfTargetData.items);
    } else {
      tempData_itemsCustomized[action.targetData[key].itemCustomizedId] = {
        ...action.targetData[key],
        status: state.itemsCustomized[action.targetData[key].itemCustomizedId].status
      };
    }


    // action.targetData[key].desc == '' ? (delete tempData_itemsCustomized[action.targetData[key].itemCustomizedId],
    //   ) : tempData_itemsCustomized[action.targetData[key].itemCustomizedId] = {
    //   ...action.targetData[key],
    //   status: state.itemsCustomized[action.targetData[key].itemCustomizedId].status
    // }
  };
  return deletedStatus ? {
    ...state,
    instances: {
      ...state.instances,
      [action.targetInstanceId]: {
        // ...state.instances[targetDataInstanceId],
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
  // return {
  //   ...state,
  //   itemsCustomized: {
  //     // ...state.itemsCustomized,
  //     ...tempData_itemsCustomized
  //     // ...action.targetData,
  //     // [action.targetData.itemCustomizedId]: {
  //     //   ...action.targetData,
  //     //   status: !action.targetData.status
  //     // }
  //   }
  // }
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
  // console.log('reducer - action.newData : ', action.newData);
  // (action.newData instanceof Array) ? const tempData_items = ((tempResult = {}) => {
  //   action.newData.map(value => tempResult[value.itemId] = value);
  //   return tempResult
  // })() : null

  let tempData_items;
      // tempData_itemsInTemplates;

  console.log('action.newData instanceof Array : ', action.newData instanceof Array);
  console.log('action.newData instanceof Object : ', action.newData instanceof Object);

  if(action.newData instanceof Array) {
    console.log('when instanceof Array is True');
    tempData_items = {};
    // tempData_itemsInTemplates = [];
    tempData_items = ((tempResult = {}) => {
      action.newData.map(value => {
        tempResult[value.itemId] = value;
        // tempData_itemsInTemplates.push(value.itemId);
      });
      return tempResult
    })();
  };

  let temp_items;
      // temp_itemsInTemplates;
  if(action.newData instanceof Object) {
    console.log('when instanceof Object is True');
    // temp_items = ((tempResult = {}) => {
    temp_items = {};
    // temp_itemsInTemplates = [];
      action.newData.items.map(value => {
        temp_items[value.itemId] = {
          ...value,
          template: action.newData.title
        };
        // temp_itemsInTemplates.push(value.itemid);
      });
    // })();
  }
  //   ...action.newData.map(value => value.itemId)

  // action.newData instanceof Object && (const temp_items = ((tempResult = {}) => {
  //   action.newData.items.map(value => {
  //     temp_items[value.itemId] = {
  //       ...value,
  //       template: action.newData.title
  //     }
  //   });
  // })(););
  const result_items = tempData_items || temp_items || {};
  // const result_itemsInTemplates = tempData_itemsInTemplates || temp_itemsInTemplates || [];
  // const tempData_itemsOftemplates = action.newData.map(value => value.itemId)
  return {
    ...state,
    items: {
      ...state.items,
      // [action.newData.itemId]: {
      //   ...action.newData
      // }
      // ...action.newData.map(value => [value.itemId]: value)
      // ...tempData_items
      ...result_items
    },
    // templates: {
    //   ...state.templates,
    //   [action.templateId]: {
    //     ...state.templates[action.newData.templateId],
    //     // items: [
    //     //   ...state.templates[action.templateId].items,
    //     //   ...action.newData.map(value => value.itemId)
    //     // ]
    //     items: state.templates[action.newData.templateId].items.concat(result_itemsInTemplates)
    //   }
    // }
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
    // tempData_items = {
    //   ...tempData_items,
    //   [key]: {
    //     ...tempData_items[key],
    //     desc: action.data[key]
    //   }
    // };
    // action.data[key] == '' ? delete tempData_items[key] : null
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
  // tempData_templates = {
  //   ...tempData_templates,
  //   [action.targetTemplateId]: {
  //     ...tempData_templates[action.targetTemplateId],
  //     items:
  //   }
  // }
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

})

const delTemplateCategory = (state, action) => ({

})

const normalizedDataInput = (state, action) => action.data.entities

export default function resultReducer(state = initialState, action) {
  const reducerMap = {
    [types.ADD_TEMPLATE]: addTemplate,
    [types.MODIFY_TEMPLATE]: modifyTemplate,
    [types.DELETE_TEMPLATE]: delTemplate,
    [types.ADD_INSTANCE]: addInstance,
    [types.DELETE_INSTANCE]: deleteInstance,
    [types.MODIFY_INSTANCE]: modifyInstance,
    [types.ADD_ITEMS_CUSTOMIZED]: addItemsCustomized,
    [types.ADD_ITEMS_CUSTOMIZED_WHEN_ADD_INSTNACE]: addItemsCustomizedWhenAddInstance,
    [types.MODIFY_ITEMS_CUSTOMIZED]: modifyItemsCustomized,
    [types.CHANGE_STATUS_OF_ITEMS_CUSTOMIZED]: changeStatusOfItemsCustomized,
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
