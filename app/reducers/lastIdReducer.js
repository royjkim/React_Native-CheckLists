import types from '../actions/dataActions'

const findLastId = (state, action) => ({
  instances: action.result.instances.slice(-1)[0],
  items: action.result.items.slice(-1)[0],
  itemsCustomized: action.result.itemsCustomized.slice(-1)[0],
  templateCategories: action.result.templateCategories.slice(-1)[0],
  templates: action.result.templates.slice(-1)[0]
})

const lastIdPlus = (state, action) => {
  const lengthMapper = {
    itemsCustomized: action.newData.items.length
  };
  const resultMapper = lengthMapper.hasOwnProperty(action.attr) ? lengthMapper[action.attr] : action.newData.length ? action.newData.length : 1;
  return {
    ...state,
    // [action.attr]: action.lastId[action.attr] + (action.newData.length ? action.newData.length : 1)
    [action.attr]: action.lastId[action.attr] + parseInt(resultMapper)
  }
}

const lastIdPlusMulti = (state, action) => {
  const lengthMapper = {
    itemsCustomized: action.newData.items.length,
    items: action.newData.items.length
  };
  const resultMapper = lengthMapper.hasOwnProperty(action.attr) ? lengthMapper[action.attr] : action.newData.length ? action.newData.length : 1;
  return {
    ...state,
    // [action.attr]: action.lastId[action.attr] + (action.newData.length ? action.newData.length : 1)
    [action.attr]: action.lastId[action.attr] + parseInt(resultMapper)
  }
}

const lastIdPlusMultiObject = (state, action) => {
  const sortedItem = Object.values(action.newData).sort((data1, data2) => data2.itemId - data1.itemId);
  console.log('lastIdReducer - sortedItem : ', sortedItem);
  const lastItemId = Object.values(action.newData).sort((data1, data2) => data2.itemId - data1.itemId)[0].itemId;
  console.log('lastIdReducer - lastItemId : ', lastItemId);
  return {
    ...state,
    [action.attr]: parseInt(lastItemId)
  }
};

const lastIdPlusOneByOne = (state, action) => ({
  ...state,
  [action.attr]: action.lastId[action.attr] + 1
})

export default function lastIdReducer(state, action) {
  const reducerMapper = {
    [types.FIND_LAST_ID]: findLastId,
    [types.LAST_ID_PLUS]: lastIdPlus,
    [types.LAST_ID_PLUS_MULTI]: lastIdPlusMulti,
    [types.LAST_ID_PLUS_MULTI_OBJECT]: lastIdPlusMultiObject,
    [types.LAST_ID_PLUS_ONE_BY_ONE]: lastIdPlusOneByOne,
  }
  return reducerMapper.hasOwnProperty(action.type) ? reducerMapper[action.type](state, action) : state
}
