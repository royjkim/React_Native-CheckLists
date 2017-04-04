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
  let temp_items = {};
      // temp_itemsCustomized = {},
      // prevLastIdItems = action.lastId.items;
      // prevLastIdItemsCustomized = action.lastId.itemsCustomized;
  // console.log(`action.newData.items : `, action.newData.items);
  action.newData.items.map(value => {
    temp_items[value.itemId] = {
      ...value,
      template: action.newData.title
    }
  //   // temp_itemsCustomized[++prevLastIdItemsCustomized] = {
  //   //   ...value,
  //   //   instanceId: null,
  //   //   itemCustomizedId: prevLastIdItemsCustomized,
  //   //   status: false
  //   // }
  })
  return {
    ...state,
    templates: {
      ...state.templates,
      [action.lastId.templates + 1]: {
        ...action.newData,
        items: action.newData.items.map(value => value.itemId)
        // items: [
        //   ...action.newData.items.map(value => value.itemId)
        // ]
      }
    },
    items: {
      ...state.items,
      ...temp_items
    }
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
    [action.newData.id]: { ...action.newData }
  }
})

const modifyTemplate = (state, action) => ({

})

const delTemplate = (state, action) => ({

})

// const addInstance = (state, action) => ({
//   ...state,
//   instanceList: {
//     ...state.instanceList,
//     [action.newData.id]: { ...action.newData }
//   }
// })

// this.normalizedData : {
//   "entities": {
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

const deleteInstance = (state, action) => ({

})

const modifyInstance = (state, action) => ({

})

const modifyItemsCustomized = (state, action) => ({
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
  const tempData_items = ((tempResult = {}) => {
    action.newData.map(value => tempResult[value.itemId] = value)
    return tempResult
  })()
  // const tempData_itemsOftemplates = action.newData.map(value => value.itemId)
  return {
    ...state,
    items: {
      ...state.items,
      // [action.newData.itemId]: {
      //   ...action.newData
      // }
      // ...action.newData.map(value => [value.itemId]: value)
      ...tempData_items
    },
    templates: {
      ...state.templates,
      [action.templateId]: {
        ...state.templates[action.templateId],
        items: [
          ...state.templates[action.templateId].items,
          ...action.newData.map(value => value.itemId)
        ]
      }
    }
  }
}

const modifyItem = (state, action) => {
  let tempData_items = { ...state.items };
  for(let key in action.data) {
    tempData_items = {
      ...tempData_items,
      [key]: {
        ...tempData_items[key],
        desc: action.data[key]
      }
    };
    // action.data[key] == '' ? delete tempData_items[key] : null
  }
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
    [action.lastId + 1]: {
      id: action.lastId + 1,
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
    [types.MODIFY_ITEMS_CUSTOMIZED]: modifyItemsCustomized,
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
