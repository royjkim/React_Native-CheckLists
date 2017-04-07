import types from './dataActions'

// Below is for after adding new template(including items), check if the uniqueId is overlapped or not.
const checkIdOverlapOrNot = (attr, lastId, newData, requestAction) => {

  const requestActionMapper = {
    addTemplate: (attr, lastId, newData) => newData.templateId > lastId[attr] ? newData : newData = {
      ...newData,
      templateId: newData.templateId + 1
    },
    addItem: (attr, lastId, newData) => newData[attr][0].itemId > lastId[attr] ? newData : newData[attr].map((value, index) => value.itemId = lastId[attr] + 1 + index),
    addTemplateCategory: (attr, lastId, newData) => {
      newData.id = lastId[attr] + 1
      return newData
    }
  };

  return requestActionMapper.hasOwnProperty(requestAction) ? requestActionMapper[requestAction](attr, lastId, newData) : newData
}

const internal_addTemplate = (lastId, newData) => ({
  type: types.ADD_TEMPLATE,
  lastId,
  lastIndex: lastId.templates - 1 < 0 ? 0 : lastId.templates - 1,
  newData
})

export function addTemplate(lastId, newData) {
  // return {
  //   type: types.ADD_TEMPLATE,
  //   attr: 'templates',
  //   lastId,
  //   lastIndex: lastId.templates - 1 < 0 ? 0 : lastId.templates - 1,
  //   newData
  // }
  newData = checkIdOverlapOrNot('templates', lastId, newData, 'addTemplate');
  return dispatch => {
    dispatch(internal_addTemplate(lastId, newData));
    // dispatch(lastIdPlus('templates', lastId, newData));
    // dispatch(lastIdPlusMulti('templates', lastId, newData));
    dispatch(lastIdPlusOneByOne('templates', lastId, newData));
    dispatch(addItem(lastId, newData));
  }
}

export function modifyTemplate(targetTemplateId, data) {
  return {
    type: types.MODIFY_TEMPLATE,
    targetTemplateId,
    data
  }
}

function internalDeleTemplate() {

}

export function delTemplate() {
  return {
    type: types.DELETE_TEMPLATE
  }
}

const internalAddInstance = (lastId, newData) => ({
  type: types.ADD_INSTANCE,
  attr: 'instances',
  lastId,
  newData
  // newData: {
  //   ...newData,
  //   templateId: newData.template
  // }
})

export function addInstance(lastId, newData) {
  // return {
  //   type: types.ADD_INSTANCE,
  //   attr: 'instances',
  //   lastId,
  //   newData,
  //   templateId: newData.template
  // }

  newData.templateId = newData.template;
  return (dispatch, getState) => {
    dispatch(internalAddInstance(lastId, newData));


    dispatch(addItemsCustomized(lastId, newData, true));
    const prevState = getState(),
          newAddedItemsCustomized = prevState.normalizeReducer.entities.instances[newData.instanceId].items;
    dispatch(addInstanceThenAddOnResult(lastId, newData, newAddedItemsCustomized));
    dispatch(lastIdPlus('instances', lastId, newData));
    dispatch(lastIdPlus('itemsCustomized', lastId, newData));
  }
};

const internal_addItemsCustomized = (lastId, newData) => ({
  type: types.ADD_ITEMS_CUSTOMIZED,
  attr: 'itemsCustomized',
  lastId: lastId.itemsCustomized,
  newData
  // newAddedItemsCustomized
})

export function addItemsCustomized(lastId, newData, preventBoolean) {
  return dispatch => {
    dispatch(internal_addItemsCustomized(lastId, newData));
    preventBoolean || dispatch(lastIdPlus('itemsCustomized', lastId, newData));
  }
  // return {
  //   type: types.ADD_ITEMS_CUSTOMIZED,
  //   attr: 'itemsCustomized',
  //   lastId: lastId.itemsCustomized,
  //   newData: {
  //     ...newData,
  //     templateId: newData.template
  //   },
  //   newAddedItemsCustomized
  // }
}

const addInstanceThenAddOnResult = (lastId, newData, newAddedItemsCustomized) => ({
  type: types.ADD_INSTANCE_THEN_ADD_ON_RESULT,
  attr: 'itemsCustomized',
  lastId,
  newData,
  newAddedItemsCustomized
})

function internal_delInstance() {

}

export function delInstance() {
  return {
    type: types.DELETE_INSTANCE
  }
}

function internal_modifyInstance() {

}

export function modifyInstance(targetInstanceId, data) {
  return {
    type: types.MODIFY_INSTANCE,
    targetInstanceId,
    data
  }
}

export function modifyItemsCustomized(targetData) {
  return {
    type: types.MODIFY_ITEMS_CUSTOMIZED,
    targetData
  }
}

const internal_addItem = (lastId, newData) => ({
  type: types.ADD_ITEM,
  newData,
  lastId,
  // templateId: newData[0].templateId
  templateId: newData instanceof Array ? newData[0].templateId : newData.templateId
})

export function addItem(lastId, newData) {
  // return {
  //   type: types.ADD_ITEM,
  //   newData,
  //   attr: 'items',
  //   lastId,
  //   templateId: newData[0].templateId
  // }
  newData = checkIdOverlapOrNot('items', lastId, newData, 'addItem');
  return dispatch => {
    dispatch(internal_addItem(lastId, newData));
    // dispatch(lastIdPlus('items', lastId, newData));
    dispatch(lastIdPlusMulti('items', lastId, newData));
  }
}

function internal_modifyItem(data) {
  return {
    type: types.MODIFY_ITEM,
    data,
  }
}

export function modifyItem(data, templateId) {
  console.log('actionCreators - parameter - data : ', data);
  console.log('actionCreators - parameter - templateId : ', templateId);
  delete data.length;
  return dispatch => {
    for(let key in data) {
      data[key] == '' && (delete data[key], dispatch(delItem(parseInt(key), parseInt(templateId))), console.log(`del request - key : ${key}, templateId : ${templateId}`))
    }
    dispatch(internal_modifyItem(data));
  }
}

export function delItem(targetItemId, targetTemplateId) {
  return {
    type: types.DEL_ITEM,
    attr: 'items',
    targetItemId,
    targetTemplateId
  }
}

const internal_addTemplateCategory = (lastId, newData) => ({
  type: types.ADD_TEMPLATE_CATEGORY,
  lastId,
  // lastIndex: lastId.templateCategories - 1 < 0 ? 0 : lastId.templateCategories - 1,
  newData
})

export function addTemplateCategory(lastId, newData) {
  newData = checkIdOverlapOrNot('templateCategories', lastId, newData, 'addTemplateCategory');
  return dispatch => {
    dispatch(internal_addTemplateCategory(lastId, newData));
    // dispatch(addItem(lastId, newData));
    // dispatch(lastIdPlus('templateCategories', lastId, newData));
    dispatch(lastIdPlusOneByOne('templateCategories', lastId, newData));
  }
  // return {
  //   type: types.ADD_TEMPLATE_CATEGORY,
  //   attr: 'templateCategories',
  //   lastId,
  //   lastIndex: lastId - 1 < 0 ? 0 : lastId - 1,
  //   newData,
  // }
}

export function normalizedDataInput(data) {
  return {
    type: types.INITIATE_NORMALIZED_DATA_INPUT,
    data
  }
}

export function searchBarText(searchText, attr) {
  return {
    type: types.SEARCHBAR_TEXT,
    attr,
    searchText
  }
}

export function chooseCategory(chosenCategory) {
  return {
    type: types.CHOOSE_CATEGORY,
    chosenCategory
  }
}

export function navigatePopToTopRequest(targetTab, statusBoolean) {
  return {
    type: types.NAVIGATE_POP_TO_TOP_REQUEST,
    targetTab,
    status: statusBoolean
  }
}

export function findLastId(result) {
  return {
    type: types.FIND_LAST_ID,
    result
  }
}

const lastIdPlus = (attr, lastId, newData) => ({
  type: types.LAST_ID_PLUS,
  attr,
  lastId,
  newData
})

const lastIdPlusMulti = (attr, lastId, newData) => ({
  type: types.LAST_ID_PLUS_MULTI,
  attr,
  lastId,
  newData
})

const lastIdPlusOneByOne = (attr, lastId, newData) => ({
  type: types.LAST_ID_PLUS_ONE_BY_ONE,
  attr,
  lastId,
  newData
})

export function navigatePrevent(__navigatorRouteID, statusBoolean) {
  return {
    type: types.NAVIGATE_PREVENT,
    __navigatorRouteID,
    status: statusBoolean
  }
}

export function triedNavigateWhenPrevented(__navigatorRouteID, statusBoolean) {
  return {
    type: types.TRIED_NAVIGATE_WHEN_PREVENTED,
    __navigatorRouteID,
    status: statusBoolean
  }
}
