import types from '../actions/dataActions'

const findLastId = (state, action) => ({
  instances: action.result.instances.slice(-1)[0],
  items: action.result.items.slice(-1)[0],
  itemsCustomized: action.result.itemsCustomized.slice(-1)[0],
  templateCategories: action.result.templateCategories.slice(-1)[0],
  templates: action.result.templates.slice(-1)[0]
})

const lastIdPlus = (state, action) => {
  console.log('lastIdReducer - action.newData : ', action.newData)
  return {
    ...state,
    [action.attr]: action.lastId + action.newData.length
  }
}

const lastIdPlusAddTemplate = (state, action) => ({
  ...state,
  templates: action.lastId.templates + 1,
  items: action.lastId.items + action.newData.items.length
  // itemsCustomized: action.lastId.itemsCustomized + action.newData.items.length
})

export default function lastIdReducer(state, action) {
  const reducerMapper = {
    [types.FIND_LAST_ID]: findLastId,
    // [types.LAST_ID_PLUS]: lastIdPlus
    [types.ADD_TEMPLATE_CATEGORY]: lastIdPlus,
    [types.ADD_TEMPLATE]: lastIdPlusAddTemplate,
    [types.ADD_ITEM]: lastIdPlus
  }
  return reducerMapper.hasOwnProperty(action.type) ? reducerMapper[action.type](state, action) : state
}

// LAST_ID_PLUS_INSTANCES = 'lastIdPlusInstances',
// LAST_ID_PLUS_ITEMS = 'lastIdPlusItems',
// LAST_ID_PLUS_ITEMS_CUSTOMIZED = 'lastIdPlusItemsCustomized',
// LAST_ID_PLUS_TEMPLATE_CATEGORIES = 'lastIdPlusTemplateCategories',
// LAST_ID_PLUS_TEMPLATES = 'lastIdPlusTemplates';
